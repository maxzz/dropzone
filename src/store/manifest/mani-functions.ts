import { removeQuery, urlDomain } from './url';

export function fileTimeToDate(fileTime: number | string): Date {
    /**
     * fileTimeToDate()
     * Convert a Windows FILETIME to a Javascript Date
     * @param {number} fileTime - the number of 100ns
     * intervals since January 1, 1601 (UTC)
     * @returns {Date}
     **/
    if (typeof fileTime === 'string') {
        fileTime = Number('0x' + fileTime.split(' ').join('')); // dwHighDateTime + ' ' + dwLowDateTime 
    }
    return new Date(fileTime / 10000 - 11644473600000);
}

export function filetimeFromDate(date: Date): number {
    return date.getTime() * 1e4 + 116444736000000000;
}

function removeEscapeChars(s: string, escapeChar: string): string {
    // 0. '\1\\ab\2\.3' --> '1\ab2.3' with escapeChar: '\' i.e. remove non duplicated.
    return s; // TODO: //C:\Y\git\pm\Include\atl\atl_strings.h::removeEscapeChars()
}

export function restoreCpp(s: string): string {
    if (!s) {
        return '';
    }
    const html = [
        [/\^up;/g, "^"],
        [/\^at;/g, "@"],
        [/\^dot;/g, "."],
        [/\^2dot;/g, ":"],
        [/\^escape;/g, '' + 0x1b],

        [/%0d/gi, "\r"],
        [/%0a/g, "\n"],
    ];
    html.forEach(_ => {
        s = s.replace(_[0], _[1] as string);
    });
    return s; // TODO: //C:\Y\git\pm\Include\atl\atl_strings.h::cpp_restore()
}

export function restoreXml(s: string): string { //G: 'html escape characters': markup sensitive in certain contexts
    if (!s) {
        return '';
    }
    const html = [
        [/&lt;/g, "<"],
        [/&gt;/g, ">"],
        [/&amp;/g, "&"],
        [/&quot;/g, "\""],
        [/&apos;/g, "\'"],

        [/%0d/gi, "\r"],
        [/%0a/g, "\n"],
    ];
    html.forEach(_ => {
        s = s.replace(_[0], _[1] as string);
    });
    return s; // TODO: //C:\Y\git\pm\Include\atl\atl_strings.h::xml_remove()
}

function getPool(form: Mani.Form): string[] {
    return form && form.detection && form.detection.names_ext ? form.detection.names_ext.split(':') : [];
}

function getPoolName(pool: string[], index: string): string {
    if (!index) {
        return '';
    }
    let n: number = index !== '' ? parseInt(`0x${index}`, 16) : -1;
    if (n < pool.length && n >= 0) {
        return removeEscapeChars(pool[n], '\\');
    }
    return '????????????';
}

export namespace FieldPath {
    function p4a(pool: string[], s: string): MPath.p4a {
        let ss = s.split('.');
        let rv: MPath.p4a = {
            rnumber: 0,
            roleString: getPoolName(pool, ss[1]),
            className: restoreCpp(getPoolName(pool, ss[2])),
            name: restoreCpp(getPoolName(pool, ss[3]))
        };
        return rv;
    }

    function sid(pool: string[], v: string): MPath.sid {
        let sid = {} as any;
        v.split('.').forEach((_, index) => {
            let s = restoreCpp(getPoolName(pool, _));
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

namespace bailouts {
    function noSIDs(meta: Meta.Form) { // scuonlinebanking.com clogin #89340
        return !!meta.fields.find((field: Meta.Field) => field.mani.useit && !field.path.sid && !field.path.sn);
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
            rv.push("There are fields in the form without an ID. Check path that does no have SID."); // short: The form has fields with no ID
        }
        return rv.length ? rv : undefined;
    }
} //namespace bailouts

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
        const bailOuts = bailouts.getBailouts(meta);
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

// TODO: bailOut: add more checks and explanation why there are issues on each check.
