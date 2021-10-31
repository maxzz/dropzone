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

    // 1. Customization

    if (mani.options) {
        let processes;
        let rest: any = {};
        for (const kv of Object.entries(mani.options) as Entries<Mani.Customization.Options>) {
            if (kv[0] === 'processes') {
                const maniProcesses: Mani.Customization.Process[] = kv[1];
                processes = maniProcesses?.length && maniProcesses.map((process) => ({ [attributes]: { ...process } }));
            } else {
                rest[kv[0]] = kv[1];
            }
        }
        rv.manifest.options = {
            ...(processes && { processes: { process: processes } }),
            ...rest,
        };
    }

    // 2. Manifest descriptor

    if (!isEmptyObject(mani.descriptor)) {
        rv.manifest.descriptor = { [attributes]: { ...mani.descriptor } };
    }

    // 3. Manifest forms

    if (mani.forms?.length) {
        rv.manifest.forms = {};
        rv.manifest.forms.form = mani.forms.map((form) => {
            let newForm: any = {};

            // 3.1. Form detection
            if (!isEmptyObject(form.fcontext)) {
                newForm.fcontext = { [attributes]: { ...form.fcontext } };
            }

            // 3.2. Form detection
            if (!isEmptyObject(form.detection)) {
                newForm.detection = { [attributes]: { ...form.detection } };
            }

            // 3.3. Form options
            if (!isEmptyObject(form.options)) {
                newForm.options = { [attributes]: { ...form.options } };
            }

            // 3.4. Form fields
            if (form.fields.length) {
                newForm.fields = { field: form.fields.map((field) => ({ [attributes]: { ...field } })) };
            }

            return newForm;
        });
    }//3.

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

        // console.log('%c---------internal mani---------', 'color: green', `\n${JSON.stringify(fileUs.mani || 'undefiend', null, 4)}`);
        // console.log('%c---------js from xml---------', 'color: green', `\n${JSON.stringify(jsFromXml, null, 4)}`);
        // console.log('%c---------mani for xml---------', 'color: yellow', `\n${JSON.stringify(rv, null, 4)}`);

        // 3.
        // xml = (new J2xParser({ ...parseOptions, format: true, indentBy: '    ', })).parse(jsFromXml);
        // xml = `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
        //console.log('%c---------new xml from---------', 'color: green', `\n${xml}`);

        xml = (new J2xParser({ ...parseOptions, format: true, indentBy: '    ', })).parse(rv);
        xml = `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
        console.log('%c---------new xml from converted---------', 'color: green', `\n${xml}`);

        // 4.
        //fileDownload({ data: xml, filename: fileUs.fname, mime: 'text/plain;charset=utf-8' });
    } catch (error) {
        console.log({ error });
    }

    return { res: xml, };
}
