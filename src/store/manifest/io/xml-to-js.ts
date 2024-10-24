import { type FileUs } from "@/store/store-types";
import { makeXML, showError } from '..';
//import { fileDownload } from '@/utils/file-download';

export function convertToXml(fileUs: FileUs): { error: string; xml?: undefined; } | { xml: string; error?: undefined; } {
    if (!fileUs.fileCnt.raw) {
        return { error: 'empty file' };
    }
    let xml = '';
    try {
        // 1.
        xml = makeXML(fileUs.parsedSrc.mani) || '';
        //console.log('%c---------new xml from converted---------', 'color: green', `\n${xml}`);
        // 2.
        //fileDownload({ data: xml, filename: fileUs.fname, mime: 'text/plain;charset=utf-8' });
        return { xml };
    } catch (error) {
        showError({ error });
        return { error: 'failed to convert' };
    }
}
