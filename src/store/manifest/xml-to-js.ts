import { useAtom } from 'jotai';
import { FileUsAtom } from '../store';
import { parse, j2xParser } from 'fast-xml-parser';

export function convertToXml(fileUsAtom: FileUsAtom): string {
    const fileUs = useAtom(fileUsAtom);
    
    let xml = '';
    return xml;
}
