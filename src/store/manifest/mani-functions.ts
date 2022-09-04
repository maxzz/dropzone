import { Catalog, Mani, Meta, MPath } from './mani';
import { FieldTyp, ValueAs, ValueLife } from './mani-types';
import { FieldCatalog } from './field-catalog';
import { removeQuery, urlDomain } from './url';

export namespace TimeUtils {

    function fileTimeToDate(fileTime?: number | string): Date {
        /**
         * fileTimeToDate()
         * Convert a Windows FILETIME to a Javascript Date
         * @param {number} fileTime - the number of 100ns
         * intervals since January 1, 1601 (UTC)
         * @returns {Date}
         **/
        if (typeof fileTime === 'string') {
            fileTime = fileTime ? Number('0x' + fileTime.split(' ').join('')) : 0; // dwHighDateTime + ' ' + dwLowDateTime 
        }
        return !!fileTime ? new Date(fileTime / 10000 - 11644473600000) : new Date;
    }
    
    function filetimeFromDate(date: Date): number {
        return date.getTime() * 1e4 + 116444736000000000;
    }
    
    export function dpTimeToShow(fileTime?: number | string): string {
        if (fileTime) {
            const d = fileTimeToDate(fileTime).toLocaleString();
            const m = /^(\d\d??)\/(\d\d??)\/(\d\d\d\d), (\d\d??):(\d\d??):(\d\d?)([\s\S]*$)/.exec(d);
            m && [1, 2, 4, 5, 6].forEach((idx) => m[idx] = zeros(m[idx], 2));
            return m ? `${m[1]}.${m[2]}.${m[3]} ${m[4]}:${m[5]}:${m[6]} ${m[7]}` : d;
        }
        return '';
    }
    
    function zeros(v: string | number, total: number): string {
        // Returns v prefixed with '0's with length <= total or v as is.
        v = v ? '' + v : '';
        return v.length < total ? '0000000000'.slice(0, total - v.length) + v : v;
    }
    
} //namespace TimeUtils

export namespace Transform { // encode/decode functions

    export function removeEscapeChars(s: string, escapeChar: string): string {
        // 0. '\1\\ab\2\.3' --> '1\ab2.3' with escapeChar: '\' i.e. remove non duplicated.
        return s; // TODO: //C:\Y\git\pm\Include\atl\atl_strings.h::removeEscapeChars()
    }

    function swapKeyValPairs<T extends object>(obj: T) {
        return Object.fromEntries(Object.entries(obj).map(([key, val]) => [val, key]));
    }

    // C++

    const forwardCpp = {
        "^up;": "^",
        "^at;": "@",
        "^dot;": ".",
        "^2dot;": ":",
        "^escape;": '\x1b',
        "%0d": "\r",
        "%0a": "\n",
    };
    const reverseCpp = swapKeyValPairs(forwardCpp);
    const reForwardCpp = /(\^up;|\^at;|\^dot;|\^2dot;|\^escape;|%0d|%0a)/g; // regex.lastIndex specifies the index at which to start the next match, not for replace all.
    const reReverseCpp = /[\^@\.:\x1b\r\n]/g;

    export function cppRestore(s: string): string { // C:\Y\c\dp\pm\Components\Include\atl\atl_strings.h::cpp_restore()
        return s ? s.replace(reForwardCpp, (m) => forwardCpp[m as keyof typeof forwardCpp]) : '';
    }

    export function cppEscape(s: string): string {
        return s ? s.replace(reReverseCpp, (m) => reverseCpp[m]) : '';
    }

    export function colonEscape(s: string): string { // this is used for matching url options
        return s ? s.replace(/:/g, '^2dot;') : '';
    }

    // XML

    const forwardXml = {
        "&lt;": "<",
        "&gt;": ">",
        "&amp;": "&",
        "&quot;": "\"",
        "&apos;": "\'",
        "%0d": "\r",
        "%0a": "\n",
    };
    const reverseXml = swapKeyValPairs(forwardXml);
    const reForwardXml = /(&lt;|&gt;|&amp;|&quot;|&apos;|%0d|%0a)/g;
    const reReverseXml = /[<>&"'\r\n]/g;

    export function xmlRestore(s: string): string { //C:\Y\c\dp\pm\Components\Include\atl\atl_strings.h::xml_remove()
        return s ? s.replace(reForwardXml, (m) => forwardXml[m as keyof typeof forwardXml]) : '';
    }

    export function xmlEscape(s: string): string {
        return s ? s.replace(reReverseXml, (m) => reverseXml[m]) : '';
    }

    // Persent encoding

    export function persentRemove(s: string): string {
        // decodeURI will fail on: &lt;input name=&quot;Sign in name&quot; tabindex=&quot;1&quot; id=&quot;signInName&quot; type=&quot;email&quot; placeholder=&quot;Email Address&quot; pattern=&quot;^[a-zA-Z0-9.!#$%&amp;amp;’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$&quot; value=&quot;&quot;&gt;
        try {
            return decodeURI(s); //TODO: decodeURI does not do all % encodings //TODO: decodeURI will not work on URL params
        } catch (error) {
            return s;
        }
    }

} //namespace Transform

export namespace TransformValue {

    export function valueLife4Mani(field: Mani.Field): ValueLife {
        const { askalways, onetvalue, value } = field;
        const vl: ValueLife = {
            valueAs:
                (!onetvalue && !askalways)
                    ? ValueAs.askReuse
                    : (!onetvalue && askalways)
                        ? ValueAs.askConfirm
                        : ValueAs.askAlways, // legal:(onetvalue && askalways) and illegal:(onetvalue && !askalways)
            ...(field.password && { isPsw: true }),
            //...(field.type !== 'edit' && field.type !== 'combo' && { isBtn: true }),
            fType: fieldTyp4Str(field),
        };
        if (value) {
            vl.isRef = value?.[0] === '@';
            vl.value = value?.replace(/^@/, '');
            vl.isRef = vl.isRef && !!vl.value && vl.value[0] !== '@'; // case for '@@'
        }
        return vl;
    }

    export function valueLife2Mani(vl: ValueLife, field: Mani.Field): void {
        const { valueAs: va } = vl;
        va === ValueAs.askReuse
            ? (field.onetvalue = undefined, field.askalways = undefined)
            : va === ValueAs.askConfirm
                ? (field.onetvalue = undefined, field.askalways = true)
                : (field.onetvalue = true, field.askalways = true);
        vl.value && (field.value = `${vl.isRef ? (vl.value[0] === '@' ? '@@' : '@') : ''}${vl.value}`);
    }

    //TODO: skip recording of '=== undefined' values
} //namespace TransformValue

// FieldTyp convert

function fieldTyp4Str(field: Mani.Field): FieldTyp {
    let rv = FieldTyp[field.type] || FieldTyp.und;
    return rv === FieldTyp.edit && field.password ? FieldTyp.psw : rv;
}

// Manifest specific functions

function getPool(form: Mani.Form): string[] {
    return form && form.detection && form.detection.names_ext ? form.detection.names_ext.split(':') : [];
}

function getPoolName(pool: string[], index: string): string {
    if (!index) {
        return '';
    }
    let n: number = index !== '' ? parseInt(`0x${index}`, 16) : -1;
    if (n < pool.length && n >= 0) {
        return Transform.removeEscapeChars(pool[n], '\\');
    }
    return '????????????';
}

export namespace FieldPath {
    function p4a(pool: string[], s: string): MPath.p4a {
        let ss = s.split('.');
        let rv: MPath.p4a = {
            rnumber: 0,
            roleString: getPoolName(pool, ss[1]),
            className: Transform.cppRestore(getPoolName(pool, ss[2])),
            name: Transform.cppRestore(getPoolName(pool, ss[3]))
        };
        return rv;
    }

    function sid(pool: string[], v: string): MPath.sid {
        let sid = {} as any;
        v.split('.').forEach((_, index) => {
            let s = Transform.cppRestore(getPoolName(pool, _));
            switch (index) {
                case 0: sid.version = s; break;
                case 1: sid.generatedId = s; break;
                case 2: sid.formName = s; break;
                case 3: sid.formAttrs = s; break;
                case 4: sid.outerHtml = s; break;
                default: sid[index] = s;
            }
        });
        return sid;
    }

    export namespace loc {
        export function unPool(pool: string[], v: string): string[] {
            return (v.split('|').map(idx => getPoolName(pool, idx)));
        }

        function str2loc(v: string): MPath.loc {
            let [x, y, x2, y2] = v.split(' ').map(str => +str);
            return { x, y, w: x2 - x, h: y2 - y };
        }

        function loc2str(loc: MPath.loc): string {
            return `${loc.x} ${loc.y} ${loc.x + loc.w} ${loc.y + loc.h}`;
        }

        export namespace utils {
            export function rectsBoundaries(rects: MPath.loc[]): Meta.Bounds {
                let x1 = Number.MAX_SAFE_INTEGER;
                let y1 = Number.MAX_SAFE_INTEGER;
                let x2 = 0;
                let y2 = 0;
                rects.forEach(({ x, y, w, h }) => {
                    if (x1 > x) {
                        x1 = x;
                    }
                    if (y1 > y) {
                        y1 = y;
                    }
                    if (x2 < x + w) {
                        x2 = x + w;
                    }
                    if (y2 < y + h) {
                        y2 = y + h;
                    }
                });
                return { x1, y1, x2, y2 };
            }

            export function buildPreviewData(fields: Meta.Field[]): Meta.View {
                let uniqueLocs = new Set<string>();

                fields.forEach((field) => { //console.log(`field.path.loc: ${field.path.loc}`);
                    const fieldLocs = (field.path.loc || '').split('|');
                    fieldLocs.forEach(loc => uniqueLocs.add(loc));
                    field.ridx = fieldLocs[fieldLocs.length - 1] as any; // temp store string as number
                });

                let rects = Array.from(uniqueLocs).map(str2loc).filter(loc => loc.w || loc.h);
                let bounds = rectsBoundaries(rects);

                const rectStrs = rects.map(loc2str);
                fields.forEach((field) => {
                    field.ridx = rectStrs.findIndex((locStr) => locStr === field.ridx as any); // restore str to number
                    rects[field.ridx] && (rects[field.ridx].f = 1);
                });

                return { rects, bounds, };
            }
        } //namespace utils
    } //namespace loc

    function getChunks(path: string): [Meta.Chunk, string][] {
        // [p4a]0.0.1.|0.2.1.[loc]b|c[sid]14.15.16..17 -> ['p4a', '0.0.1.|0.2.1.'], ['loc', 'b|c'], ['sid', '14.15.16..17']
        return path.split('[').filter(Boolean).map((val: string) => val.split(']') as [Meta.Chunk, string]);;
    }

    export function fieldPathItems(pool: string[], path: string): Meta.Path {
        const rv: Meta.Path = {};
        const chunks: [Meta.Chunk, string][] = getChunks(path);

        chunks.forEach(([chunkName, chunkValue]) => {
            switch (chunkName) {
                case 'p4a':
                case 'p4': {
                    rv.p4a = chunkValue.split('|').map(_ => p4a(pool, _));
                    break;
                }
                case 'loc': {
                    rv.loc = loc.unPool(pool, chunkValue).join('|');
                    break;
                }
                case 'sid': {
                    rv.sid = sid(pool, chunkValue);
                    break;
                }
                case 'did2': {
                    rv.did2 = chunkValue;
                    break;
                }
                case 'sn': {
                    rv.sn = {
                        total: 0,
                        current: 0,
                        parts: [],
                    };
                    let ss = chunkValue.split(';');
                    if (ss.length) {
                        let first = ss[0].split('.'); // '3.0.the-rest'
                        if (first.length > 2) {
                            rv.sn.total = +first[0];
                            rv.sn.current = +first[1];
                            ss[0] = first[2];
                        }
                        rv.sn.parts = ss.filter(Boolean);
                    }
                    break;
                }
                default: {
                    console.log('??????path??????');
                }
            }
        });

        return rv;
    }
} //namespace FieldPath

namespace Bailouts {
    function noSIDs(meta: Meta.Form) { // web, not script, use it, no sid, and not button; scuonlinebanking.com clogin #89340
        return !!meta.disp.domain && !meta.disp.isScript &&
            !!meta.fields.find((field: Meta.Field) => field.mani.useit && !field.path.sid && field.mani.type !== 'button');
    }

    export function getBailouts(meta: Meta.Form): string[] | undefined {
        const rv: string[] = [];
        if (meta.disp.isIe && !meta.disp.domain) {
            rv.push("IE website form without site domain");
        }
        if (meta.disp.isIe && meta.disp.isScript) {
            rv.push("Manual mode manifest built for IE");
        };
        if (noSIDs(meta)) {
            rv.push("There are fields in the form without an ID. Check path that does not have SID."); // short: The form has fields with no ID
        }
        return rv.length ? rv : undefined;
    }
} //namespace Bailouts

export function buildManiMetaForms(mani: Mani.Manifest | undefined): Meta.Form[] {
    const isManual = (fields: Meta.Field[]): boolean => {
        return !!fields.length && fields.some(({ path }: { path: Meta.Path; }) => path.sn);
    };
    const isIeServer = (form: Mani.Form): boolean => {
        return !!form.detection?.names_ext?.match(/Internet Explorer_Server/);
    };
    const isIeProcess = (form: Mani.Form): boolean => {
        return !!form.detection?.processname?.match(/(iexplore|msedge|microsoftedgecp)\.exe"?$/i);
    };
    const createMetaForm = (form: Mani.Form, idx: number): Meta.Form => {
        const pool: string[] = getPool(form) || [];
        const fields: Meta.Field[] = (form.fields || []).map((field: Mani.Field, idx: number) => ({
            mani: field,
            ftyp: fieldTyp4Str(field),
            life: TransformValue.valueLife4Mani(field),
            path: FieldPath.fieldPathItems(pool, field.path_ext || ''),
            pidx: idx,
            ridx: 0,
        }));
        const domain = urlDomain(removeQuery(form.detection?.web_ourl));
        const isScript = isManual(fields);
        const isIe = isIeServer(form) || isIeProcess(form);
        const meta: Meta.Form = {
            mani: form,
            type: idx,
            disp: {
                domain,
                isScript,
                noFields: !fields.length,
                isIe,
            },
            pool: pool,
            view: FieldPath.loc.utils.buildPreviewData(fields),
            fields,
            rother: [],
        };
        const bailOuts = Bailouts.getBailouts(meta);
        if (bailOuts) {
            meta.disp.bailOut = bailOuts;
        }
        return meta;
    };
    const forms: Meta.Form[] = !mani || !mani.forms || !mani.forms.length ? [] : mani.forms.map(createMetaForm);
    [0, 1].forEach((type: number) => { // build xlinks
        if (forms[type]) {
            forms[type].rother = forms[type === 0 ? 1 : 0]?.fields.map((field) => field.ridx) || [];
        }
    });
    return forms;
}

// Field catalog transformation

export function buildCatalogMeta(fcat?: Catalog.Root | undefined): FieldCatalog {
    const items = fcat?.names.map((item, idx) => ({ ...item, index: idx })) || [];
    return {
        items,
    };
}

// TODO: bailOut: add more checks and explanation why there are issues on each check.
