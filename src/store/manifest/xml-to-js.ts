import { FileUs } from '../store-types';
import { XMLParser } from 'fast-xml-parser';
import { makeXML, parseOptionsRead } from '.';
import { fileDownload } from '@/utils/file-download';

export function convertToXml(fileUs: FileUs): { error: string; xml?: undefined; } | { xml: string; error?: undefined; } {
    if (!fileUs.raw) {
        return { error: 'empty file' };
    }
    //console.log('raw', fileUs.raw);

    let xml = '';
    try {
        // 1.
        const parser = new XMLParser(parseOptionsRead);
        const jsFromXml = parser.parse(fileUs.raw);

        //TODO: convert value life and skip '=== undefined'

        // 2.
        const xml = makeXML(fileUs.mani);
        //console.log('%c---------new xml from converted---------', 'color: green', `\n${xml}`);

        // 3.
        //fileDownload({ data: xml, filename: fileUs.fname, mime: 'text/plain;charset=utf-8' });
    } catch (error) {
        console.log({ error });
        return { error: 'cannot convert' };
    }

    return { xml };
}
