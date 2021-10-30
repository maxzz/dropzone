import { FileUs } from '../store';
import { parse } from 'fast-xml-parser';
import { J2xParser } from '../../utils/json2xml';
import { parseOptions } from './mani-io';
import { fileDownload } from '../../utils/file-download';

const attributes: string = "_attributes";

function manifestToJsonForXml(mani: Mani.Manifest) {

}

export function convertToXml(fileUs: FileUs): { err: string; res?: undefined; } | { res: string; err?: undefined; } {
    if (!fileUs.raw) {
        return {
            err: 'empty file',
        };
    }
    //console.log('raw', fileUs.raw);

    let xml = '';
    try {
        const obj = parse(fileUs.raw, parseOptions);
        //console.log('%craw', 'color: green', JSON.stringify(obj, null, 4));
        
        let rv = fileUs.mani && manifestToJsonForXml(fileUs.mani) || '';
        console.log('%c---------mani3Xml---------', 'color: green', `\n${rv}`);

        xml = (new J2xParser({
            ...parseOptions,
            format: true,
            indentBy: '    ',
        })).parse(obj);

        xml = `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
        console.log('%c---------raw---------', 'color: green', `\n${xml}`);

        //fileDownload({ data: xml, filename: fileUs.fname, mime: 'text/plain;charset=utf-8' });
    } catch (error) {
        console.log({ error });
    }

    return {
        res: xml,
    };
}
