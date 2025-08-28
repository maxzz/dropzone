import { type FileUs } from "@/store/store-types";
import { convertJsToXml, type Mani, prepareNewMani4Xml, showError } from "pm-manifest";
//import { fileDownload } from "@/utils/file-download";

export function convertToXml(fileUs: FileUs): { error: string; xml?: undefined; } | { xml: string; error?: undefined; } {
    if (!fileUs.fileCnt.raw) {
        return { error: 'empty file' };
    }
    
    try {
        // 1.
        const mani = prepareNewMani4Xml(fileUs.parsedSrc.mani as Mani.Manifest);
        const xml = convertJsToXml(mani) || '';
        //console.log('%c---------new xml from converted---------', 'color: green', `\n${xml}`);

        // 2.
        //fileDownload({ data: xml, filename: fileUs.fname, mime: 'text/plain;charset=utf-8' });
        return { xml };
    } catch (error) {
        showError({ error });
        return { error: 'failed to convert' };
    }
}
