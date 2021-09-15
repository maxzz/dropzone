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

export function poolName(pool: string[], index: string): string {
    if (!index) {
        return '';
    }
    let n: number = index !== '' ? parseInt(`0x${index}`, 16) : -1;
    if (n < pool.length && n >= 0) {
        return removeEscapeChars(pool[n], '\\');
    }
    return '????????????';
}

function pathItem_p4a(pool: string[], s: string): MPath.Chunk_p4a {
    let ss = s.split('.');
    let rv: MPath.Chunk_p4a = {
        rnumber: 0,
        roleString: poolName(pool, ss[1]),
        className: cpp_restore(poolName(pool, ss[2])),
        name: cpp_restore(poolName(pool, ss[3]))
    };
    return rv;
}

function pathItem_sid(pool: string[], v: string): MPath.Chunk_sid {
    let sid = {} as any;
    v.split('.').forEach((_, index) => {
        let s = cpp_restore(poolName(pool, _));
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

function dedupe(items: string[]): string[] {
    return Array.from(new Set(items));
}

function pathItem_loc_removePool(pool: string[], v: string): string {
    let rv = /*dedupe*/(v.split('|').map(_ => poolName(pool, _))).join('|');
    return rv;
}

function str2loc(str: string): MPath.Chunk_loc {
    let s = str.split(' ').map(_ => +_);
    return { x: s[0], y: s[1], w: s[2] - s[0], h: s[3] - s[1], f: s[4] || 0, i: s[5] || 0 };
}

function loc2str(loc: MPath.Chunk_loc): string {
    let s = `${loc.x} ${loc.y} ${loc.x + loc.w} ${loc.y + loc.h} ${loc.f || 0} ${loc.i || 0}`;
    return s;
}

export function pathItem_loc2items(v: string): MPath.Chunk_loc[] {
    let rv = dedupe(v.split('|')).map(str2loc).filter(_ => _.w && _.h);
    return rv;
}

export function buildFormLocations(form: Mani.Form): MPath.Chunk_loc[] {
    let pool: string[] = getPool(form);
    let uni = new Set<string>();

    form.fields.map((field: Mani.Field) => {
        let path = field.path_ext ? field.path_ext : '';
        let items: [string, string][] = pathItems(path);
        let locsItem = items.find((_) => _[0] === 'loc');
        let locs = locsItem ? locsItem[1] : '';
        // We got locations now as string
        let clearLocs = locs.split('|').map(_ => poolName(pool, _)).map(str2loc).map((_, index) => (_.i = index, _)).filter(_ => _.w && _.h);
        if (clearLocs.length) {
            clearLocs[clearLocs.length - 1].f = 1;
        }
        clearLocs.map(loc2str).forEach(_ => uni.add(_));
    });

    return Array.from(uni).map(str2loc);
}

function pathItems(path: string): [string, string][] {
    let rv: [string, string][] = path.split('[').filter(Boolean).map<[string, string]>((val) => val.split(']') as [string, string]);
    return rv;
}

export function getPool(form: Mani.Form): string[] {
    return form && form.detection && form.detection.names_ext ? form.detection.names_ext.split(':') : [];
}

export function fieldPathItems(pool: string[], path: string): Meta.Path {
    let rv: Meta.Path = {};

    let items: [string, string][] = pathItems(path);

    items.forEach((_) => {
        switch (_[0]) {
            case 'p4a':
            case 'p4': {
                rv.p4a = _[1].split('|').map(_ => pathItem_p4a(pool, _));
                break;
            }
            case 'loc': {
                rv.loc = pathItem_loc_removePool(pool, _[1]);
                break;
            }
            case 'sid': {
                rv.sid = pathItem_sid(pool, _[1]);
                break;
            }
            case 'did2': {
                rv.did2 = _[1];
                break;
            }
            case 'sn': {
                rv.sn = {
                    total: 0,
                    current: 0,
                    parts: [],
                };
                let ss = _[1].split(';');
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

export function buildFormExs(mani: Mani.Manifest | undefined): Meta.Form[] {
    const isScript = (fields: Meta.Field[]): boolean => {
        console.log('path', fields.some(({path}: {path: Meta.Path}) => path.sn));
        return fields.some(({path}: {path: Meta.Path}) => path.sn);
    };
    const buildMetaForm = (form: Mani.Form): Meta.Form => {
        const pool = getPool(form) || [];
        const fields: Meta.Field[] = (form.fields || []).map((field: Mani.Field) => ({
            mani: field,
            path: fieldPathItems(pool, field.path_ext || ''),
        }));
        return {
            mani: form,
            disp: {
                isScript: isScript(fields),
            },
            pool: pool,
            rects: buildFormLocations(form) || [],
            fields,
        };
    };
    return !mani || !mani.forms || !mani.forms.length ? [] : mani.forms.map(buildMetaForm);
}
