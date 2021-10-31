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
        /*
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
        */

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
            //let newForm: any = {};

            const { fcontext, detection, options, fields } = form;

            let newForm: any = {
                ...(!isEmptyObject(fcontext) && { fcontext: { [attributes]: { ...form.fcontext } } }),
                ...(!isEmptyObject(detection) && { detection: { [attributes]: { ...form.detection } } }),
                ...(!isEmptyObject(options) && { options: { [attributes]: { ...form.options } } }),
                ...(fields?.length && { fields: { field: form.fields.map((field) => ({ [attributes]: { ...field } })) } }),
            };

            /*
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
            */

            return newForm;
        });
    }

    return rv;
}
