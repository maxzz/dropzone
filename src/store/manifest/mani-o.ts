import { Mani } from "./mani";

const attributes: string = "_attributes";

function hasKeys(obj?: object): boolean {
    return !!obj && !!Reflect.ownKeys(obj).length;
}

export function manifestToJsonForXml(mani: Mani.Manifest) {
    const { options, descriptor, forms, ...rest } = mani;

    let rv: any = { manifest: {}, };

    // 1. Customization
    if (options) {
        const { processes, ...rest } = options;
        const xmlProcesses = processes?.length && {processes: { process: processes.map((process) => ({ [attributes]: process })) }};
        rv.manifest.options = { ...xmlProcesses, ...rest, };
    }

    // 2. Manifest descriptor
    if (hasKeys(descriptor)) {
        rv.manifest.descriptor = { [attributes]: descriptor };
    }

    // 3. Manifest forms
    if (forms?.length) {
        rv.manifest.forms = {
            form: forms.map((form) => {
                const { fcontext, detection, options, fields, ...rest } = form;
                return {
                    ...(hasKeys(fcontext) && { fcontext: { [attributes]: form.fcontext } }),
                    ...(hasKeys(detection) && { detection: { [attributes]: form.detection } }),
                    ...(hasKeys(options) && { options: { [attributes]: form.options } }),
                    ...(fields?.length && { fields: { field: form.fields.map((field) => ({ [attributes]: field })) } }),
                    ...rest,
                };
            })
        };
    }

    return { ...rv, ...rest, };
}
