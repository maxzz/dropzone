type J2xOptions = {
    attributeNamePrefix: string;
    attrNodeName: false | string;
    textNodeName: string;
    ignoreAttributes: boolean;
    cdataTagName: string;
    cdataPositionChar: string;
    format: boolean;
    indentBy: string;
    supressEmptyNode: boolean;
    tagValueProcessor: (tagValue: string) => string;
    attrValueProcessor: (attrValue: string) => string;

    rootNodeName?: string;
};
type J2xOptionsOptional = Partial<J2xOptions>;

function buildOptions(options: J2xOptionsOptional, defaultOptions: J2xOptions, props: (keyof J2xOptions)[]): J2xOptions {
    if (!options) {
        return defaultOptions; //if there are not options
    }

    //parse Empty Node as self closing node
    let newOptions: J2xOptionsOptional = {};
    for (let i = 0; i < props.length; i++) {
        const key = props[i];
        (newOptions as any)[key] = options[key] !== undefined ? options[key] : defaultOptions[key];
    }
    return newOptions as J2xOptions;
};

const defaultOptions: J2xOptions = {
    attributeNamePrefix: '@_',
    attrNodeName: false,
    textNodeName: '#text',
    ignoreAttributes: true,
    cdataTagName: '',
    cdataPositionChar: '\\c',
    format: false,
    indentBy: '  ',
    supressEmptyNode: false,
    tagValueProcessor: function (a: string) { return a; },
    attrValueProcessor: function (a: string) { return a; },
};

const props: (keyof J2xOptions)[] = [
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

export class J2xParser {
    options: J2xOptions;
    attrPrefixLen: number;
    isAttribute: (name: string) => boolean | string;
    isCDATA: (s: string) => boolean;
    replaceCDATAstr: (str: string, cdata: any) => string;
    replaceCDATAarr: (str: string, cdata: any) => string;
    processTextOrObjNode: (object: unknown, key: string, level: number) => unknown;

    buildTextNode: (val: string, key: string, attrStr: string, level: number) => string;
    buildObjNode: (val: string, key: string, attrStr: string, level: number) => string;

    buildTextValNode: (val: string, key: string, attrStr: string, level: number) => string;
    buildObjectNode: (val: string, key: string, attrStr: string, level: number) => string;

    indentate: (n: number) => string;
    tagEndChar: string = '>\n';
    newLine: string = '\n';

    constructor(options?: J2xOptionsOptional) {
        this.options = buildOptions(options = {}, defaultOptions, props);
        if (this.options.ignoreAttributes || this.options.attrNodeName) {
            this.attrPrefixLen = 0;
            this.isAttribute = (/*a*/) =>false;
        } else {
            this.attrPrefixLen = this.options.attributeNamePrefix.length;
            this.isAttribute = isAttribute;
        }

        this.isCDATA = this.options.cdataTagName ? isCDATA : (/*a*/) => false;

        this.replaceCDATAstr = _replaceCDATAstr;
        this.replaceCDATAarr = _replaceCDATAarr;

        this.processTextOrObjNode = _processTextOrObjNode;

        if (this.options.format) {
            this.indentate = indentate;
            this.tagEndChar = '>\n';
            this.newLine = '\n';
        } else {
            this.indentate = () => '';
            this.tagEndChar = '>';
            this.newLine = '';
        }

        this.buildTextNode = this.options.supressEmptyNode ? _buildTextNodeAsEmpty : _buildTextValNode;
        this.buildObjNode =  this.options.supressEmptyNode ? _buildObjNodeAsEmpty : _buildObjectNode;
        this.buildTextValNode = _buildTextValNode;
        this.buildObjectNode = _buildObjectNode;
    }

    parse(jObj: any) {
        if (Array.isArray(jObj) && this.options.rootNodeName && this.options.rootNodeName.length > 1) {
            jObj = {
                [this.options.rootNodeName]: jObj
            };
        }
        return this.j2x(jObj, 0).val;
    }

    j2x(jObj: any, level: number) {
        let attrStr = '';
        let val = '';
        for (let key in jObj) {
            const keyVal = jObj[key];
            if (typeof keyVal === 'undefined') {
                // supress undefined node
            }
            else if (keyVal === null) {
                val += `${this.indentate(level)}<${key}/${this.tagEndChar}`;
            }
            else if (keyVal instanceof Date) {
                val += this.buildTextNode(keyVal as any, key, '', level);
            }
            else if (typeof keyVal !== 'object') {
                //premitive type
                const attr = this.isAttribute(key);
                if (attr) {
                    attrStr += ` ${attr}="${this.options.attrValueProcessor('' + keyVal)}"`;
                }
                else if (this.isCDATA(key)) {
                    if (jObj[this.options.textNodeName]) {
                        val += this.replaceCDATAstr(jObj[this.options.textNodeName], keyVal);
                    } else {
                        val += this.replaceCDATAstr('', keyVal);
                    }
                } else {
                    //tag value
                    if (key === this.options.textNodeName) {
                        if (jObj[this.options.cdataTagName]) { //tm: this will not work
                            //value will added while processing cdata
                        } else {
                            val += this.options.tagValueProcessor('' + keyVal);
                        }
                    } else {
                        val += this.buildTextNode(keyVal, key, '', level);
                    }
                }
            }
            else if (Array.isArray(keyVal)) {
                //repeated nodes
                if (this.isCDATA(key)) {
                    val += this.indentate(level);
                    if (jObj[this.options.textNodeName]) {
                        val += this.replaceCDATAarr(jObj[this.options.textNodeName], keyVal);
                    } else {
                        val += this.replaceCDATAarr('', keyVal);
                    }
                } else {
                    //nested nodes
                    const arrLen = keyVal.length;
                    for (let j = 0; j < arrLen; j++) {
                        const item = keyVal[j];
                        if (typeof item === 'undefined') {
                            // supress undefined node
                        } else if (item === null) {
                            val += `${this.indentate(level)}<${key}/${this.tagEndChar}`;
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
                    const Ks = Object.keys(keyVal);
                    const L = Ks.length;
                    for (let j = 0; j < L; j++) {
                        attrStr += ` ${Ks[j]}="${this.options.attrValueProcessor('' + keyVal[Ks[j]])}"`;
                    }
                } else {
                    val += this.processTextOrObjNode(keyVal, key, level);
                }
            }
        }
        return { attrStr: attrStr, val: val };
    };

} //class J2xParser

function _processTextOrObjNode(this: J2xParser, object: any, key: string, level: number): string {
    const result = this.j2x(object, level + 1);
    if (object[this.options.textNodeName] !== undefined && Object.keys(object).length === 1) {
        return this.buildTextNode(result.val, key, result.attrStr, level);
    } else {
        return this.buildObjNode(result.val, key, result.attrStr, level);
    }
}

function _replaceCDATAstr(this: J2xParser, str: string, cdata: string): string {
    str = this.options.tagValueProcessor('' + str);
    if (this.options.cdataPositionChar === '' || str === '') {
        return `${str}<![CDATA[${cdata}]]${this.tagEndChar}`;
    } else {
        return str.replace(this.options.cdataPositionChar, `<![CDATA[${cdata}]]${this.tagEndChar}`);
    }
}

function _replaceCDATAarr(this: J2xParser, str: string, cdata: any): string {
    str = this.options.tagValueProcessor('' + str);
    if (this.options.cdataPositionChar === '' || str === '') {
        return `${str}<![CDATA[${cdata.join(']]><![CDATA[')}]]${this.tagEndChar}`;
    } else {
        for (let v in cdata) {
            str = str.replace(this.options.cdataPositionChar, `<![CDATA[${cdata[v]}]]>`);
        }
        return str + this.newLine;
    }
}

function _buildObjectNode(this: J2xParser, val: string, key: string, attrStr: string, level: number): string {
    if (attrStr && val.indexOf('<') === -1) {
        return `${this.indentate(level)}<${key}${attrStr}>${val /*+this.newLine+this.indentate(level)*/}</${key}${this.tagEndChar}`;
    } else {
        return `${this.indentate(level)}<${key}${attrStr}${this.tagEndChar}${val /*+ this.newLine*/}${this.indentate(level)}</${key}${this.tagEndChar}`;
    }
}

function _buildObjNodeAsEmpty(this: J2xParser, val: string, key: string, attrStr: string, level: number): string {
    if (val !== '') {
        return this.buildObjectNode(val, key, attrStr, level);
    } else {
        return `${this.indentate(level)}<${key}${attrStr}/${this.tagEndChar}`; //+ this.newLine
    }
}

function _buildTextValNode(this: J2xParser, val: string, key: string, attrStr: string, level: number): string {
    return `${this.indentate(level)}<${key}${attrStr}>${this.options.tagValueProcessor(val)}</${key}${this.tagEndChar}`;
}

function _buildTextNodeAsEmpty(this: J2xParser, val: string, key: string, attrStr: string, level: number): string {
    if (val !== '') {
        return this.buildTextValNode(val, key, attrStr, level);
    } else {
        return `${this.indentate(level)}<${key}${attrStr}/${this.tagEndChar}`;
    }
}

function indentate(this: J2xParser, level: number): string {
    return this.options.indentBy.repeat(level);
}

function isAttribute(this: J2xParser, name: string /*, options*/): string | false {
    if (name.startsWith(this.options.attributeNamePrefix)) {
        return name.substr(this.attrPrefixLen);
    } else {
        return false;
    }
}

function isCDATA(this: J2xParser, name: string): boolean {
    return name === this.options.cdataTagName;
}

//formatting
//indentation
//\n after each closing or self closing tag
