import { FileUs } from '../store';
import { parse } from 'fast-xml-parser';
import { J2xParser } from '../../utils/json2xml';
import { parseOptions } from './mani-io';
import { fileDownload } from '../../utils/file-download';

const attributes: string = "_attributes";

function isEmptyObject(obj?: object): boolean {
    return !obj || !Reflect.ownKeys(obj).length;
}

function manifestToJsonForXml(mani: Mani.Manifest) {
    let rv: any = {
        manifest: {}
    };
    if (!isEmptyObject(mani.options)) {
        if (!isEmptyObject(mani.options?.processes)) {
        }
        rv.manifest.options = { [attributes]: { ...mani.options } };
    }
    if (!isEmptyObject(mani.descriptor)) {
        rv.manifest.descriptor = { [attributes]: { ...mani.descriptor } };
    }
    if (mani.forms?.length) {
        rv.manifest.forms = {};
        rv.manifest.forms.form = mani.forms.map((form) => {
            let newForm: any = {};
            if (!isEmptyObject(form.detection)) {
                newForm.detection = { [attributes]: { ...form.detection } };
            }
            if (!isEmptyObject(form.options)) {
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
        const jsFromXml = parse(fileUs.raw, parseOptions);

        // 2.
        let rv = fileUs.mani && manifestToJsonForXml(fileUs.mani) || '';

        console.log('%c---------internal mani---------', 'color: green', `\n${JSON.stringify(fileUs.mani || 'undefiend', null, 4)}`);
        console.log('%c---------js from xml---------', 'color: green', `\n${JSON.stringify(jsFromXml, null, 4)}`);
        console.log('%c---------mani for Xml---------', 'color: yellow', `\n${JSON.stringify(rv, null, 4)}`);

        // 3.
        xml = (new J2xParser({ ...parseOptions, format: true, indentBy: '    ', })).parse(jsFromXml);
        xml = `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
        //console.log('%c---------raw---------', 'color: green', `\n${xml}`);

        // 4.
        //fileDownload({ data: xml, filename: fileUs.fname, mime: 'text/plain;charset=utf-8' });
    } catch (error) {
        console.log({ error });
    }

    return { res: xml, };
}
