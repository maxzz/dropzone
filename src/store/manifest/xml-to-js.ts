import { FileUs } from '../store';
import { parse, j2xParser } from 'fast-xml-parser';
import { parseOptions } from './mani-io';
import { fileDownload } from '../../utils/file-download';

function escapeXml(unsafe: string) {
    return unsafe.replace(/[<>&'"]/g, function (c: string): string {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
}

const attributes: string = "_attributes";

function jsonToXml<T extends Object>(obj: T, rv: string, indent: number): void {
    const entries = Object.entries(obj);

    for (let [key, val] of entries) {
        if (Array.isArray(val)) {

        } else if (typeof val === 'object') {

        }
    }

    // for (let cur = 0; cur < entries.length; cur++) {
    //     if (typeof entries[cur][1] === 'string') {
    //     }
    // }
}

export function convertToXml(fileUs: FileUs): { err: string; res?: undefined; } | { res: string; err?: undefined; } {

    //console.log('raw', fileUs.raw);

    if (!fileUs.raw) {
        return {
            err: 'empty file',
        };
    }

    let xml = '';
    try {
        const obj = parse(fileUs.raw, parseOptions); //console.log('%craw', 'color: green', JSON.stringify(obj, null, 4));
        console.log('obj\n', obj);
        ((obj.manifest as Mani.Manifest).descriptor as any)._attributes.id += '<>><'; // <- fast-xml-parser can read it, but notepad complains on illegal characters.

        let rv = '';
        jsonToXml(1, rv, 0);

        xml = (new j2xParser({ ...parseOptions, format: true, indentBy: '\t', attrValueProcessor: escapeXml })).parse(obj);
        xml = `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
        console.log('raw\n', xml);

        fileDownload({ data: xml, filename: fileUs.fname, mime: 'text/plain;charset=utf-8' });

    } catch (error) {
        console.log({ error });
    }

    return {
        res: xml,
    };
}
