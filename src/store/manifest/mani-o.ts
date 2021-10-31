const attributes: string = "_attributes";

function isEmptyObject(obj?: object): boolean {
    return !obj || !Reflect.ownKeys(obj).length;
}

export function manifestToJsonForXml(mani: Mani.Manifest) {
    let rv: any = {
        manifest: {}
    };

    // 1. Customization
    if (mani.options) {
        const { processes, ...rest } = mani.options;
        const xmlProcesses = processes?.length && processes.map((process) => ({ [attributes]: { ...process } }));
        rv.manifest.options = {
            ...(xmlProcesses && { processes: { process: xmlProcesses } }),
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
            const { fcontext, detection, options, fields, ...rest } = form;
            return {
                ...(!isEmptyObject(fcontext) && { fcontext: { [attributes]: { ...form.fcontext } } }),
                ...(!isEmptyObject(detection) && { detection: { [attributes]: { ...form.detection } } }),
                ...(!isEmptyObject(options) && { options: { [attributes]: { ...form.options } } }),
                ...(fields?.length && { fields: { field: form.fields.map((field) => ({ [attributes]: { ...field } })) } }),
                ...rest,
            };
        });
    }

    return rv;
}
