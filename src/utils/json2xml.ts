type J2xOptions = {
    attributeNamePrefix: string;
    attrNodeName: false | string;
    textNodeName: string;
    ignoreAttributes: boolean;
    cdataTagName: false | string;
    cdataPositionChar: string;
    format: boolean;
    indentBy: string;
    supressEmptyNode: boolean;
    tagValueProcessor: (tagValue: string) => string;
    attrValueProcessor: (attrValue: string) => string;
};
type J2xOptionsOptional = Partial<J2xOptions>;

function buildOptions(options: J2xOptionsOptional, defaultOptions: J2xOptionsOptional, props: any) {
    //parse Empty Node as self closing node
    let newOptions = {};
    if (!options) {
        return defaultOptions; //if there are not options
    }

    for (let i = 0; i < props.length; i++) {
        if (options[props[i]] !== undefined) {
            newOptions[props[i]] = options[props[i]];
        } else {
            newOptions[props[i]] = defaultOptions[props[i]];
        }
    }
    return newOptions;
};

const defaultOptions = {
    attributeNamePrefix: '@_',
    attrNodeName: false,
    textNodeName: '#text',
    ignoreAttributes: true,
    cdataTagName: false,
    cdataPositionChar: '\\c',
    format: false,
    indentBy: '  ',
    supressEmptyNode: false,
    tagValueProcessor: function (a: string) { return a; },
    attrValueProcessor: function (a: string) { return a; },
};

const props = [
    'attributeNamePrefix',
    'attrNodeName',
    'textNodeName',
    'ignoreAttributes',
    'cdataTagName',
    'cdataPositionChar',
    'format',
    'indentBy',
    'supressEmptyNode',
    'tagValueProcessor',
    'attrValueProcessor',
    'rootNodeName', //when array as root
];

export function Parser(options: J2xOptionsOptional) {

    this.options = buildOptions(options, defaultOptions, props);
    if (this.options.ignoreAttributes || this.options.attrNodeName) {
        this.isAttribute = function (/*a*/) {
            return false;
        };
    } else {
        this.attrPrefixLen = this.options.attributeNamePrefix.length;
        this.isAttribute = isAttribute;
    }
    if (this.options.cdataTagName) {
        this.isCDATA = isCDATA;
    } else {
        this.isCDATA = function (/*a*/) {
            return false;
        };
    }

    this.replaceCDATAstr = replaceCDATAstr;
    this.replaceCDATAarr = replaceCDATAarr;

    this.processTextOrObjNode = processTextOrObjNode;

    if (this.options.format) {
        this.indentate = indentate;
        this.tagEndChar = '>\n';
        this.newLine = '\n';
    } else {
        this.indentate = function () {
            return '';
        };
        this.tagEndChar = '>';
        this.newLine = '';
    }

    if (this.options.supressEmptyNode) {
        this.buildTextNode = buildEmptyTextNode;
        this.buildObjNode = buildEmptyObjNode;
    } else {
        this.buildTextNode = buildTextValNode;
        this.buildObjNode = buildObjectNode;
    }

    this.buildTextValNode = buildTextValNode;
    this.buildObjectNode = buildObjectNode;
}

Parser.prototype.parse = function (jObj) {
    if (Array.isArray(jObj) && this.options.rootNodeName && this.options.rootNodeName.length > 1) {
        jObj = {
            [this.options.rootNodeName]: jObj
        };
    }
    return this.j2x(jObj, 0).val;
};

Parser.prototype.j2x = function (jObj, level: number) {
    let attrStr = '';
    let val = '';
    for (let key in jObj) {
        if (typeof jObj[key] === 'undefined') {
            // supress undefined node
        } else if (jObj[key] === null) {
            val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
        } else if (jObj[key] instanceof Date) {
            val += this.buildTextNode(jObj[key], key, '', level);
        } else if (typeof jObj[key] !== 'object') {
            //premitive type
            const attr = this.isAttribute(key);
            if (attr) {
                attrStr += ' ' + attr + '="' + this.options.attrValueProcessor('' + jObj[key]) + '"';
            } else if (this.isCDATA(key)) {
                if (jObj[this.options.textNodeName]) {
                    val += this.replaceCDATAstr(jObj[this.options.textNodeName], jObj[key]);
                } else {
                    val += this.replaceCDATAstr('', jObj[key]);
                }
            } else {
                //tag value
                if (key === this.options.textNodeName) {
                    if (jObj[this.options.cdataTagName]) {
                        //value will added while processing cdata
                    } else {
                        val += this.options.tagValueProcessor('' + jObj[key]);
                    }
                } else {
                    val += this.buildTextNode(jObj[key], key, '', level);
                }
            }
        } else if (Array.isArray(jObj[key])) {
            //repeated nodes
            if (this.isCDATA(key)) {
                val += this.indentate(level);
                if (jObj[this.options.textNodeName]) {
                    val += this.replaceCDATAarr(jObj[this.options.textNodeName], jObj[key]);
                } else {
                    val += this.replaceCDATAarr('', jObj[key]);
                }
            } else {
                //nested nodes
                const arrLen = jObj[key].length;
                for (let j = 0; j < arrLen; j++) {
                    const item = jObj[key][j];
                    if (typeof item === 'undefined') {
                        // supress undefined node
                    } else if (item === null) {
                        val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
                    } else if (typeof item === 'object') {
                        val += this.processTextOrObjNode(item, key, level);
                    } else {
                        val += this.buildTextNode(item, key, '', level);
                    }
                }
            }
        } else {
            //nested node
            if (this.options.attrNodeName && key === this.options.attrNodeName) {
                const Ks = Object.keys(jObj[key]);
                const L = Ks.length;
                for (let j = 0; j < L; j++) {
                    attrStr += ' ' + Ks[j] + '="' + this.options.attrValueProcessor('' + jObj[key][Ks[j]]) + '"';
                }
            } else {
                val += this.processTextOrObjNode(jObj[key], key, level);
            }
        }
    }
    return { attrStr: attrStr, val: val };
};

function processTextOrObjNode(object, key, level) {
    const result = this.j2x(object, level + 1);
    if (object[this.options.textNodeName] !== undefined && Object.keys(object).length === 1) {
        return this.buildTextNode(result.val, key, result.attrStr, level);
    } else {
        return this.buildObjNode(result.val, key, result.attrStr, level);
    }
}

function replaceCDATAstr(str, cdata) {
    str = this.options.tagValueProcessor('' + str);
    if (this.options.cdataPositionChar === '' || str === '') {
        return str + '<![CDATA[' + cdata + ']]' + this.tagEndChar;
    } else {
        return str.replace(this.options.cdataPositionChar, '<![CDATA[' + cdata + ']]' + this.tagEndChar);
    }
}

function replaceCDATAarr(str, cdata) {
    str = this.options.tagValueProcessor('' + str);
    if (this.options.cdataPositionChar === '' || str === '') {
        return str + '<![CDATA[' + cdata.join(']]><![CDATA[') + ']]' + this.tagEndChar;
    } else {
        for (let v in cdata) {
            str = str.replace(this.options.cdataPositionChar, '<![CDATA[' + cdata[v] + ']]>');
        }
        return str + this.newLine;
    }
}

function buildObjectNode(val, key, attrStr, level) {
    if (attrStr && val.indexOf('<') === -1) {
        return `${this.indentate(level)}<${key}${attrStr}>${val /*+this.newLine+this.indentate(level)*/}</${key}${this.tagEndChar}`;
    } else {
        return `${this.indentate(level)}<${key}${attrStr}${this.tagEndChar}${val /*+ this.newLine*/}${this.indentate(level)}</${key}${this.tagEndChar}`;
    }
}

function buildEmptyObjNode(val, key, attrStr, level) {
    if (val !== '') {
        return this.buildObjectNode(val, key, attrStr, level);
    } else {
        return this.indentate(level) + '<' + key + attrStr + '/' + this.tagEndChar;
        //+ this.newLine
    }
}

function buildTextValNode(val, key, attrStr, level) {
    return (
        `${this.indentate(level)}<${key}${attrStr}>${this.options.tagValueProcessor(val)}</${key}${this.tagEndChar}`
    );
}

function buildEmptyTextNode(val, key, attrStr, level) {
    if (val !== '') {
        return this.buildTextValNode(val, key, attrStr, level);
    } else {
        return this.indentate(level) + '<' + key + attrStr + '/' + this.tagEndChar;
    }
}

function indentate(level) {
    return this.options.indentBy.repeat(level);
}

function isAttribute(name /*, options*/) {
    if (name.startsWith(this.options.attributeNamePrefix)) {
        return name.substr(this.attrPrefixLen);
    } else {
        return false;
    }
}

function isCDATA(name) {
    return name === this.options.cdataTagName;
}

//formatting
//indentation
//\n after each closing or self closing tag

