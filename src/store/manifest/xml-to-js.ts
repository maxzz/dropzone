import { FileUs } from '../store';
import { parse, j2xParser } from 'fast-xml-parser';
import { parseOptions } from './mani-io';

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
        xml = (new j2xParser({...parseOptions, format: true, indentBy: '\t'})).parse(obj);
        console.log('raw', xml);

    } catch (error) {
        
    }
    
    return {
        res: xml,
    };
}
