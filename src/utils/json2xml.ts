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
    tagValueProcessor: (tagValue: string | any) => string;
    attrValueProcessor: (attrValue: string | any) => string;

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
    tagValueProcessor: function (a: any): string { return '' + a; },
    attrValueProcessor: function (a: any): string { return '' + a; },
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

    textofTextValNodeWithEmptyCheck: (val: string, key: string, attrStr: string, level: number) => string;
    textofObjectNodeWithEmptyCheck: (val: string, key: string, attrStr: string, level: number) => string;

    indentate: (n: number) => string;
    tagEndChar: string = '>\n';
    newLine: string = '\n';

    constructor(options?: J2xOptionsOptional) {
        this.options = buildOptions(options || {}, defaultOptions, props);
        if (this.options.ignoreAttributes || this.options.attrNodeName) {
            this.attrPrefixLen = 0;
            this.isAttribute = () => false;
        } else {
            this.attrPrefixLen = this.options.attributeNamePrefix.length;
            this.isAttribute = isAttribute;
        }

        this.isCDATA = this.options.cdataTagName ? isCDATA : () => false;

        this.replaceCDATAstr = _replaceCDATAstr;
        this.replaceCDATAarr = _replaceCDATAarr;

        if (this.options.format) {
            this.indentate = indentate;
            this.tagEndChar = '>\n';
            this.newLine = '\n';
        } else {
            this.indentate = () => '';
            this.tagEndChar = '>';
            this.newLine = '';
        }

        this.textofTextValNodeWithEmptyCheck = this.options.supressEmptyNode ? _textofTextNodeWithEmptyCheck : this.textofTextValNode;
        this.textofObjectNodeWithEmptyCheck = this.options.supressEmptyNode ? _textofObjNodeWithEmptyCheck : this.textofObjectNode;
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
            console.log('j2x', keyVal, '\nval:\n', val);

            if (typeof keyVal === 'undefined') {
                // supress undefined node
            }
            else if (keyVal === null) {
                val += `${this.indentate(level)}<${key}/${this.tagEndChar}`;
            }
            else if (keyVal instanceof Date) {
                val += this.textofTextValNodeWithEmptyCheck(keyVal as any, key, '', level);
            }
            else if (typeof keyVal !== 'object') {
                //premitive type
                const attr = this.isAttribute(key);
                if (attr) {
                    attrStr += ` ${attr}="${this.options.attrValueProcessor(keyVal)}"`;
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
                            val += this.options.tagValueProcessor(keyVal);
                        }
                    } else {
                        val += this.textofTextValNodeWithEmptyCheck(keyVal, key, '', level);
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
                            val += this.textofTextValNodeWithEmptyCheck(item, key, '', level);
                        }
                    }
                }
            } else {
                //nested node
                if (this.options.attrNodeName && key === this.options.attrNodeName) {
                    const Ks = Object.keys(keyVal);
                    const L = Ks.length;
                    for (let j = 0; j < L; j++) {
                        const attrName = Ks[j];
                        attrStr += ` ${attrName}="${this.options.attrValueProcessor(keyVal[attrName])}"`;
                    }
                } else {
                    val += this.processTextOrObjNode(keyVal, key, level);
                }
            }
        }
        return { attrStr: attrStr, val: val };
    };

    processTextOrObjNode(this: J2xParser, object: any, key: string, level: number): string {
        const result = this.j2x(object, level + 1);
        if (object[this.options.textNodeName] !== undefined && Object.keys(object).length === 1) {
            return this.textofTextValNodeWithEmptyCheck(result.val, key, result.attrStr, level);
        } else {
            return this.textofObjectNodeWithEmptyCheck(result.val, key, result.attrStr, level);
        }
    }

    textofObjectNode(this: J2xParser, val: string, key: string, attrStr: string, level: number): string {
        if (attrStr && val.indexOf('<') === -1) {
            return `${this.indentate(level)}<${key}${attrStr}>${val /*+this.newLine+this.indentate(level)*/}</${key}${this.tagEndChar}`;
        } else {
            return `${this.indentate(level)}<${key}${attrStr}${this.tagEndChar}${val /*+ this.newLine*/}${this.indentate(level)}</${key}${this.tagEndChar}`;
        }
    }

    textofTextValNode(this: J2xParser, val: string, key: string, attrStr: string, level: number): string {
        return `${this.indentate(level)}<${key}${attrStr}>${this.options.tagValueProcessor(val)}</${key}${this.tagEndChar}`;
    }

} //class J2xParser

// Empty guards

function _textofObjNodeWithEmptyCheck(this: J2xParser, val: string, key: string, attrStr: string, level: number): string {
    if (val !== '') {
        return this.textofObjectNode(val, key, attrStr, level);
    } else {
        return `${this.indentate(level)}<${key}${attrStr}/${this.tagEndChar}`; //+ this.newLine
    }
}

function _textofTextNodeWithEmptyCheck(this: J2xParser, val: string, key: string, attrStr: string, level: number): string {
    if (val !== '') {
        return this.textofTextValNode(val, key, attrStr, level);
    } else {
        return `${this.indentate(level)}<${key}${attrStr}/${this.tagEndChar}`;
    }
}

// replace CDATA

function _replaceCDATAstr(this: J2xParser, str: string, cdata: string): string {
    str = this.options.tagValueProcessor(str);
    if (this.options.cdataPositionChar === '' || str === '') {
        return `${str}<![CDATA[${cdata}]]${this.tagEndChar}`;
    } else {
        return str.replace(this.options.cdataPositionChar, `<![CDATA[${cdata}]]${this.tagEndChar}`);
    }
}

function _replaceCDATAarr(this: J2xParser, str: string, cdata: any): string {
    str = this.options.tagValueProcessor(str);
    if (this.options.cdataPositionChar === '' || str === '') {
        return `${str}<![CDATA[${cdata.join(']]><![CDATA[')}]]${this.tagEndChar}`;
    } else {
        for (let v in cdata) {
            str = str.replace(this.options.cdataPositionChar, `<![CDATA[${cdata[v]}]]>`);
        }
        return str + this.newLine;
    }
}

// Misc

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

function indentate(this: J2xParser, level: number): string {
    return this.options.indentBy.repeat(level);
}

//formatting
//indentation
//\n after each closing or self closing tag
