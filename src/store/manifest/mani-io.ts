import { xml2json } from 'xml-js';

import test from '../../assets/{ff06f637-4270-4a0e-95a3-6f4995dceae6}.dpm';

function beautifyXMLManifest(manifest: Manifest): Manifest {
    // 0. convert XML .dpm object to manifest format.

    manifest.descriptor = (manifest.descriptor as any)._attributes || {};
    manifest.forms = (manifest.forms as any).form || [];

    if (!Array.isArray(manifest.forms)) {
        manifest.forms = [manifest.forms];
    }

    manifest.forms.forEach((form: Form) => {
        // Remove _attributes
        form.fcontext && (form.fcontext = (form.fcontext as any)._attributes);
        form.detection && (form.detection = (form.detection as any)._attributes);
        form.options && (form.options = (form.options as any)._attributes);
        form.fields && (form.fields = (form.fields as any).field);

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
            form.fields = form.fields.map(field => (field as any)._attributes);

            form.fields.forEach((field: Field) => {
                field.password && (field.password = !!field.password);
                field.useit && (field.useit = !!field.useit);

                field.rfieldindex && (field.rfieldindex = +field.rfieldindex);
            });
        }
    });

    return manifest as Manifest;
}

// export function loadTest(): Manifest {
//     var result: string = xml2json(test, {compact: true, spaces: 4});

//     let json = JSON.parse(result);
//     let manifest = beautifyXMLManifest(json.manifest);

//     return manifest;
// }

export function loadByText(text: string): Manifest {
    var result: string = xml2json(text, {compact: true, spaces: 4});

    let json = JSON.parse(result);
    let manifest = beautifyXMLManifest(json.manifest);

    return manifest;
}

// export async function loadByUrl(url: string): Promise<Manifest> {
//     let res = await fetch(url);
//     let text = await res.text();

//     var result: string = xml2json(text, {compact: true, spaces: 4});
//     let json = JSON.parse(result);

//     let manifest = beautifyXMLManifest(json.manifest);

//     return manifest;
// }
