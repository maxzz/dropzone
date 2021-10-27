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

    try {
        const obj = parse(fileUs.raw, parseOptions); //console.log('%craw', 'color: green', JSON.stringify(obj, null, 4));

    } catch (error) {
        
    }
    

    let xml = '';
    return {
        res: xml,
    };
}
