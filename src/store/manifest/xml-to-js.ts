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

function manifestToJsonForXml(mani: Mani.Manifest) {

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
        
        let rv = fileUs.mani && manifestToJsonForXml(fileUs.mani) || '';
        console.log('mani3Xml', rv);

        xml = (new J2xParser({
            ...parseOptions,
            format: true,
            indentBy: '    ',
        })).parse(obj);

        xml = `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
        console.log('---------raw\n', xml);

        //fileDownload({ data: xml, filename: fileUs.fname, mime: 'text/plain;charset=utf-8' });

    } catch (error) {
        console.log({ error });
    }

    return {
        res: xml,
    };
}
