import { FileUs } from '../store';
import { parse } from 'fast-xml-parser';
import { J2xParser } from '../../utils/json2xml';
import { parseOptions } from './mani-io';
import { fileDownload } from '../../utils/file-download';

const attributes: string = "_attributes";

function manifestToJsonForXml(mani: Mani.Manifest) {
    let rv: any = {
        manifest: {}
    };
    if (mani.descriptor) {
        rv.manifest.descriptor = { [attributes]: { ...mani.descriptor } };
    }
    if (mani.forms?.length) {
        rv.manifest.forms = {};
        rv.manifest.forms.form = mani.forms.map((form) => {
            let newForm: any = {};
            if (form.detection) {
                newForm.detection = { [attributes]: { ...form.detection } };
            }
            if (form.options) {
                newForm.options = { [attributes]: { ...form.options } };
            }
            return newForm;
        });

    }
    return rv;
}

export function convertToXml(fileUs: FileUs): { err: string; res?: undefined; } | { res: string; err?: undefined; } {
    if (!fileUs.raw) {
        return { err: 'empty file', };
    }
    //console.log('raw', fileUs.raw);

    let xml = '';
    try {
        // 1.
        const obj = parse(fileUs.raw, parseOptions);

        // 2.
        let rv = fileUs.mani && manifestToJsonForXml(fileUs.mani) || '';

        //console.log('%c---------source mani---------', 'color: green', `\n${JSON.stringify(fileUs.mani || 'undefiend', null, 4)}`);
        console.log('%c---------raw---------', 'color: green', `\n${JSON.stringify(obj, null, 4)}`);
        console.log('%c---------mani3Xml---------', 'color: yellow', `\n${JSON.stringify(rv, null, 4)}`);

        // 3.
        xml = (new J2xParser({ ...parseOptions, format: true, indentBy: '    ', })).parse(obj);
        xml = `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
        //console.log('%c---------raw---------', 'color: green', `\n${xml}`);

        // 4.
        fileDownload({ data: xml, filename: fileUs.fname, mime: 'text/plain;charset=utf-8' });
    } catch (error) {
        console.log({ error });
    }

    return { res: xml, };
}
