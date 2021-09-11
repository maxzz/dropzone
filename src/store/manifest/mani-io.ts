import { xml2json } from 'xml-js';

import test from '../../assets/{ff06f637-4270-4a0e-95a3-6f4995dceae6}.dpm';

function beautifyXMLManifest(manifest: any): Manifest {
    // 0. convert XML .dpm object to manifest format.

    manifest.descriptor = manifest.descriptor._attributes || {};
    manifest.forms = manifest.forms.form || [];

    if (!Array.isArray(manifest.forms)) {
        manifest.forms = [manifest.forms];
    }

    manifest.forms.forEach(form => {
        // Remove _attributes

        form.fcontext && (form.fcontext = form.fcontext._attributes);
        form.detection && (form.detection = form.detection._attributes);
        form.options && (form.options = form.options._attributes);
        form.fields && (form.fields = form.fields.field);

        // Perform typecast

        if (form.fcontext) {
            form.fcontext.name !== undefined && (form.fcontext.name = +form.fcontext.name);
        }

        if (form.detection) {
            form.detection.web_checkurl !== undefined && (form.detection.web_checkurl = !!form.detection.web_checkurl);
        }

        if (form.options) {
            form.options.usequicklink !== undefined && (form.options.usequicklink = +form.options.usequicklink);
        }

        if (form.fields) {
            form.fields = form.fields.map(field => field._attributes);

            form.fields.forEach(field => {
                field.password && (field.password = !!field.password);
                field.useit && (field.useit = !!field.useit);

                field.rfieldindex && (field.rfieldindex = +field.rfieldindex);
            });
        }
    });

    return manifest as Manifest;
}

export function loadTest(): Manifest {
    var result: string = xml2json(test, {compact: true, spaces: 4});

    let json = JSON.parse(result);
    let manifest = beautifyXMLManifest(json.manifest);

    return manifest;
}

export async function loadByUrl(url: string): Promise<Manifest> {
    let res = await fetch(url);
    let text = await res.text();

    var result: string = xml2json(text, {compact: true, spaces: 4});
    let json = JSON.parse(result);

    let manifest = beautifyXMLManifest(json.manifest);

    return manifest;
}
