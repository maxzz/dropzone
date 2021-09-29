import { removeQuery, urlDomain } from './url';

/**
   * fileTimeToDate()
   * Convert a Windows FILETIME to a Javascript Date
   * @param {number} fileTime - the number of 100ns
   * intervals since January 1, 1601 (UTC)
   * @returns {Date}
   **/
export function fileTimeToDate(fileTime: number | string): Date {
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
    function pathItem_p4a(pool: string[], s: string): MPath.Chunk_p4a {
        let ss = s.split('.');
        let rv: MPath.Chunk_p4a = {
            rnumber: 0,
            roleString: getPoolName(pool, ss[1]),
            className: cpp_restore(getPoolName(pool, ss[2])),
            name: cpp_restore(getPoolName(pool, ss[3]))
        };
        return rv;
    }

    function pathItem_sid(pool: string[], v: string): MPath.Chunk_sid {
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

    export namespace PathLocations {
        function dedupe(items: string[]): string[] {
            return Array.from(new Set(items)); // This should preserve insertion order, if I remember correctly.
        }

        export function unPool(pool: string[], v: string): string {
            return dedupe(v.split('|').map(_ => getPoolName(pool, _))).join('|');;
        }

        // export function unPool(pool: string[], v: string): string {
        //     return /*dedupe*/(v.split('|').map(_ => getPoolName(pool, _))).join('|');;
        // }

        function str2loc(v: string): MPath.Chunk_loc {
            let nmbs = v.split(' ').map(_ => +_);
            return { x: nmbs[0], y: nmbs[1], w: nmbs[2] - nmbs[0], h: nmbs[3] - nmbs[1], f: nmbs[4] || 0, i: nmbs[5] || 0 };
        }

        function loc2str(loc: MPath.Chunk_loc): string {
            return `${loc.x} ${loc.y} ${loc.x + loc.w} ${loc.y + loc.h} ${loc.f || 0} ${loc.i || 0}`;
        }

        // function pathItem_loc2items(v: string): MPath.Chunk_loc[] {
        //     let arr = v.split('|');
        //     let res = dedupe(arr).map(str2loc).filter(_ => _.w && _.h);
        //     console.log('v', v, 'res', res);
        //     return res;
        // }

        function locs2items(v: string): MPath.Chunk_loc[] {
            return dedupe(v.split('|')).map(str2loc).filter(_ => _.w && _.h);
        }

        function lastItem(v: string | undefined): MPath.Chunk_loc | undefined {
            let arr = (v || '').split('|');
            let last = arr[arr.length - 1];
            if (last) {
                return str2loc(last);
            }
        }

        export namespace utils {
            function rectsBoundaries(rects: MPath.Chunk_loc[]): { x1: number; y1: number; x2: number; y2: number; } {
                let x1 = 0; // x1,y1 ┌──────┐
                let y1 = 0; //       │      │
                let x2 = 0; //       └──────┘ x2,y2
                let y2 = 0;
                rects.forEach(rect => {
                    if (rect.x > x1) {
                        x1 = rect.x;
                    }
                    if (rect.y > y1) {
                        y1 = rect.y;
                    }
                    if (rect.x + rect.w > x2) {
                        x2 = rect.x + rect.w;
                    }
                    if (rect.y + rect.h > y2) {
                        y2 = rect.y + rect.h;
                    }
                });
                return { x1, y1, x2, y2 };
            }
            
            // function addLastRect(field: Meta.Field, rv: MPath.Chunk_loc[] ) {
            //     let fieldLocs = locs2items(field.path.loc || '');
            //     if (fieldLocs.length) {
            //         rv.push(fieldLocs[fieldLocs.length - 1]);
            //     }
            // }

            export function getFieldRects(form: Meta.Form, field: Meta.Field) {
                let boundaries = rectsBoundaries(form.rects);
                let thisRects = [...form.rects];
                //console.log('rect', thisRects);

                const last = lastItem(field.path.loc);
                last && thisRects.push(last);
            
                //addLastRect(field, thisRects);
            
                return { rects: thisRects, boundaries };
            }

            export function getAllRects(form: Mani.Form, pool: string[]): MPath.Chunk_loc[] {
                let uni = new Set<string>();
    
                (form.fields || []).map((field: Mani.Field) => {
                    let path = field.path_ext ? field.path_ext : '';
                    let items: [string, string][] = pathItems(path);
                    let locsItem = items.find((_) => _[0] === 'loc');
                    let locs = locsItem ? locsItem[1] : '';
                    // We got locations now as string
                    //let cleanLocs = locs.split('|').map(_ => getPoolName(pool, _)).map(str2loc).map((_, index) => (_.i = index, _)).filter(_ => _.w && _.h);
                    let cleanLocs = dedupe(locs.split('|')).map(_ => getPoolName(pool, _)).map(str2loc).map((_, index) => (_.i = index, _)).filter(_ => _.w && _.h);
                    // mark the last item as field
                    if (cleanLocs.length) {
                        cleanLocs[cleanLocs.length - 1].f = 1;
                    }
                    // add to set locations from this path
                    cleanLocs.map(loc2str).forEach(loc => uni.add(loc));
                });
    
                return Array.from(uni).map(str2loc);
            }
        } //namespace utils
    } //namespace PathLocations

    function pathItems(path: string): [string, string][] {
        return path.split('[').filter(Boolean).map<[string, string]>((val) => val.split(']') as [string, string]);;
    }

    export function fieldPathItems(pool: string[], path: string): Meta.Path {
        const rv: Meta.Path = {};
        const items: [string, string][] = pathItems(path);

        items.forEach((item: [string, string]) => {
            switch (item[0]) {
                case 'p4a':
                case 'p4': {
                    rv.p4a = item[1].split('|').map(_ => pathItem_p4a(pool, _));
                    break;
                }
                case 'loc': {
                    rv.loc = PathLocations.unPool(pool, item[1]);
                    break;
                }
                case 'sid': {
                    rv.sid = pathItem_sid(pool, item[1]);
                    break;
                }
                case 'did2': {
                    rv.did2 = item[1];
                    break;
                }
                case 'sn': {
                    rv.sn = {
                        total: 0,
                        current: 0,
                        parts: [],
                    };
                    let ss = item[1].split(';');
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
                default:
                    console.log('??????path??????');
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
            rects: FieldPath.PathLocations.utils.getAllRects(form, pool) || [],
            fields,
        };
    };
    return !mani || !mani.forms || !mani.forms.length ? [] : mani.forms.map(createMetaForm);
}
