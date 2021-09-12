import { parse } from 'fast-xml-parser';

//import test from '../../assets/{ff06f637-4270-4a0e-95a3-6f4995dceae6}.dpm';

export function beautifyXMLManifest(manifest: Mani.Manifest): Mani.Manifest {
    // 0. convert XML .dpm object to manifest format.

    manifest.descriptor = (manifest.descriptor as any)._attributes || {};
    manifest.forms = (manifest.forms as any).form || [];

    if (!Array.isArray(manifest.forms)) {
        manifest.forms = [manifest.forms];
    }

    manifest.forms.forEach((form: Mani.Form) => {
        // Remove _attributes
        form.fcontext && (form.fcontext = (form.fcontext as any)._attributes);
        form.detection && (form.detection = (form.detection as any)._attributes);
        form.options && (form.options = (form.options as any)._attributes);

        if (form.fields) {
            let fields = (form.fields as any).field as Mani.Field[];
            form.fields = Array.isArray(fields) ? fields : [fields];
        }

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

            form.fields.forEach((field: Mani.Field) => {
                field.password && (field.password = !!field.password);
                field.useit && (field.useit = !!field.useit);

                field.rfieldindex && (field.rfieldindex = +field.rfieldindex);
            });
        }
    });

    return manifest as Mani.Manifest;
}

const parseOptions = {
    attributeNamePrefix: "",
    attrNodeName: "_attributes",
    ignoreAttributes: false,
    allowBooleanAttributes: true,
};

export function parseManifest(cnt: string): Mani.Manifest | undefined {
    const obj = parse(cnt, parseOptions);
    //console.log('%craw', 'color: red', obj);

    const res = beautifyXMLManifest(obj.manifest);
    // //console.log('%ctm', 'color: red', res);

    return res;
}
