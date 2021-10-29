import { FileUs } from '../store';
import { parse } from 'fast-xml-parser';
import { parseOptions } from './mani-io';
import { fileDownload } from '../../utils/file-download';
import { J2xParser } from '../../utils/json2xml';

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

function jsonToXml<T extends Object>(obj: T, os: string, itemKey: string, indent: number): void {

    if (typeof obj === 'object') {
        const entries = Object.entries(obj);

        for (let [key, val] of entries) {
            if (Array.isArray(val)) {

            } else if (typeof val === 'object') {

            }
        }
    } else if (Array.isArray(obj)) {

        // for (let elm of obj) {

        // }
    }


    // for (let cur = 0; cur < entries.length; cur++) {
    //     if (typeof entries[cur][1] === 'string') {
    //     }
    // }
}

function tag(s: string): string {
    //console.log('-----------tag', s);
    
    return s;
}

function attr(s: string): string {
    //console.log('    attr', s);

    return escapeXml(s);
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
        
        //((obj.manifest as Mani.Manifest).descriptor as any)._attributes.id += '<>><'; // <- fast-xml-parser can read it, but notepad complains on illegal characters.

        // let rv = '';
        // jsonToXml({manifest: {
        // }}, rv, 'manifest', 0);

        xml = (new J2xParser({
            ...parseOptions,
            format: true,
            indentBy: '\t',
            tagValueProcessor: tag,
            attrValueProcessor: attr,
        })).parse(obj);

        xml = `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
        //console.log('raw\n', xml);

        //fileDownload({ data: xml, filename: fileUs.fname, mime: 'text/plain;charset=utf-8' });

    } catch (error) {
        console.log({ error });
    }

    return {
        res: xml,
    };
}
