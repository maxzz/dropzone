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

export function cpp_restore(s: string): string {
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
            className: cpp_restore(getPoolName(pool, ss[2])),
            name: cpp_restore(getPoolName(pool, ss[3]))
        };
        return rv;
    }

    function sid(pool: string[], v: string): MPath.sid {
        let sid = {} as any;
        v.split('.').forEach((_, index) => {
            let s = cpp_restore(getPoolName(pool, _));
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
        function dedupe(items: string[]): string[] {
            return Array.from(new Set(items)); // This will preserve insertion order from items in set and then in array.
        }

        export function unPool(pool: string[], v: string): string[] {
            return /*dedupe*/(v.split('|').map(idx => getPoolName(pool, idx)));
        }

        function str2loc(v: string): MPath.loc {
            let [x, y, x2, y2, f, i] = v.split(' ').map(_ => +_);
            return { x, y, w: x2 - x, h: y2 - y, f: f || 0, i: i || 0 };
        }

        function loc2str(loc: MPath.loc): string {
            return `${loc.x} ${loc.y} ${loc.x + loc.w} ${loc.y + loc.h} ${loc.f || 0} ${loc.i || 0}`;
        }

        export namespace utils {
            function rectsBoundaries(rects: MPath.loc[]): Meta.Bounds {
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

            function lastItem(v: string | undefined): MPath.loc | undefined {
                let arr = (v || '').split('|');
                let last = arr[arr.length - 1];
                if (last) {
                    return str2loc(last);
                }
            }

            export function getFieldRects(form: Meta.Form, field: Meta.Field) {
                let bounds = rectsBoundaries(form.view.rects);
                let thisRects = [...form.view.rects];

                const last = lastItem(field.path.loc);
                last && thisRects.push(last);

                let lt = {x: form.view.bounds.x1, y: form.view.bounds.y1}; // left-top
                thisRects = thisRects.map((loc) => ({...loc, x: loc.x - lt.x, y: loc.y - lt.y, }));

                return { rects: thisRects, bounds: rectsBoundaries(thisRects) };
            }

            export function getAllRects(form: Mani.Form, pool: string[]): Meta.View {
                let uniqueLocs = new Set<string>();

                (form.fields || []).map((field: Mani.Field) => {
                    let pathChunks: [Meta.Chunk, string][] = getChunks(field.path_ext || '');
                    let thisLocs = pathChunks.find(([chunck]) => chunck === 'loc')?.[1] || '';

                    // We got locations now as string
                    let cleanLocs =
                        //thisLocs.split('|')
                        dedupe(thisLocs.split('|'))
                            .map(_ => getPoolName(pool, _))
                            .map(str2loc)
                            .map((_, index) => (_.i = index, _))
                            .filter(_ => _.w && _.h);

                    // mark the last item as field
                    if (cleanLocs.length) {
                        cleanLocs[cleanLocs.length - 1].f = 1;
                    }

                    // add to set locations from this path
                    cleanLocs.map(loc2str).forEach(loc => uniqueLocs.add(loc));
                });

                let rects = Array.from(uniqueLocs).map(str2loc);
                let bounds = rectsBoundaries(rects);

                return {
                    rects,
                    bounds,
                };
            }
        } //namespace utils
    } //namespace PathLocations

    function getChunks(path: string): [Meta.Chunk, string][] {
        // from [p4a]0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|1.8..|1.9..|1.8..|0.9..|0.8..|3.9..|0.a..[loc]b|c|c|c|c|d|e|f|10|11|12|13[sid]14.15.16..17
        // to ['p4a', '0.0.1.|0.2.1.|0.3.1.|0.3.4.5|0.6.4.7|1.8..|1.9..|1.8..|0.9..|0.8..|3.9..|0.a..'], ['loc', 'b|c|c|c|c|d|e|f|10|11|12|13'], ['sid', '14.15.16..17']
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

export function buildFormExs(mani: Mani.Manifest | undefined): Meta.Form[] {
    const isScript = (fields: Meta.Field[]): boolean => {
        return !!fields.length && fields.some(({ path }: { path: Meta.Path; }) => path.sn);
    };
    const isIe = (form: Mani.Form): boolean => {
        return !!form.detection?.names_ext?.match(/Internet Explorer_Server/); //return !!form.detection?.processname?.match(/iexplore\.exe$/);
    };
    const createMetaForm = (form: Mani.Form): Meta.Form => {
        const pool: string[] = getPool(form) || [];
        const fields: Meta.Field[] = (form.fields || []).map((field: Mani.Field) => ({
            mani: field,
            path: FieldPath.fieldPathItems(pool, field.path_ext || ''),
        }));
        return {
            mani: form,
            disp: {
                domain: urlDomain(removeQuery(form.detection?.web_ourl)),
                isScript: isScript(fields),
                isEmpty: !fields.length,
                isIe: isIe(form),
            },
            pool: pool,
            view: FieldPath.loc.utils.getAllRects(form, pool) || [],
            fields,
        };
    };
    return !mani || !mani.forms || !mani.forms.length ? [] : mani.forms.map(createMetaForm);
}
