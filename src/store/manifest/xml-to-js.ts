import { FileUs } from '../store-types';
import { XMLParser } from 'fast-xml-parser';
import { J2xParser } from '@/utils/json2xml';
import { fileDownload } from '@/utils/file-download';
import { parseOptions } from './mani-i';
import { manifestToJsonForXml } from './mani-o';

export function convertToXml(fileUs: FileUs): { error: string; xml?: undefined; } | { xml: string; error?: undefined; } {
    if (!fileUs.raw) {
        return { error: 'empty file' };
    }
    //console.log('raw', fileUs.raw);

    let xml = '';
    try {
        // 1.
        const parser = new XMLParser(parseOptions);
        const jsFromXml = parser.parse(fileUs.raw);

        //TODO: convert value life and skip '=== undefined'

        // 2.
        let rv = fileUs.mani && manifestToJsonForXml(fileUs.mani) || '';

        // console.log('%c---------internal mani---------', 'color: green', `\n${JSON.stringify(fileUs.mani || 'undefiend', null, 4)}`);
        // console.log('%c---------js from xml---------', 'color: green', `\n${JSON.stringify(jsFromXml, null, 4)}`);
        // console.log('%c---------mani for xml---------', 'color: yellow', `\n${JSON.stringify(rv, null, 4)}`);

        // 3.
        // xml = (new J2xParser({ ...parseOptions, format: true, indentBy: '    ', })).parse(jsFromXml);
        // xml = `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
        //console.log('%c---------new xml from---------', 'color: green', `\n${xml}`);

        const j2xParser = new J2xParser({ ...parseOptions, format: true, indentBy: '    ', });
        xml = j2xParser.parse(rv);
        xml = `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
        //console.log('%c---------new xml from converted---------', 'color: green', `\n${xml}`);

        // 4.
        //fileDownload({ data: xml, filename: fileUs.fname, mime: 'text/plain;charset=utf-8' });
    } catch (error) {
        console.log({ error });
        return { error: 'cannot convert' };
    }

    return { xml };
}
