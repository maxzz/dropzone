import { MPath, Meta } from "../mani-types";
import { TransformEncoding } from "./transform-xml-enc";
import { getPoolName } from "./transform-mani-pool";

export namespace FieldPath {
    function p4a(pool: string[], s: string): MPath.p4a {
        let ss = s.split('.');
        let rv: MPath.p4a = {
            rnumber: 0,
            roleString: getPoolName(pool, ss[1]),
            className: TransformEncoding.cppRestore(getPoolName(pool, ss[2])),
            name: TransformEncoding.cppRestore(getPoolName(pool, ss[3]))
        };
        return rv;
    }

    function sid(pool: string[], v: string): MPath.sid {
        let sid = {} as any;
        v.split('.').forEach((_, index) => {
            let s = TransformEncoding.cppRestore(getPoolName(pool, _));
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
