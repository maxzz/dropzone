import { FileUs } from '../store';
import { parse, j2xParser } from 'fast-xml-parser';
import { parseOptions } from './mani-io';
import { fileDownload } from '../../utils/file-download';

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
        ((obj.manifest as Mani.Manifest).descriptor as any)._attributes.id += '<>><'

        xml = (new j2xParser({ ...parseOptions, format: true, indentBy: '\t' })).parse(obj);
        xml = `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
        console.log('raw\n', xml);

        fileDownload({ data: xml, filename: 'test.txt', mime: 'text/plain;charset=utf-8' });

    } catch (error) {
        console.log({error});
    }

    return {
        res: xml,
    };
}
