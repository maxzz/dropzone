import { Catalog, FieldCatalog, Mani, Meta, fieldTyp4Str } from '../mani-types';
import { getPool } from './transform-mani-pool';
import { TransformValue } from './transform-valuelife';
import { FieldPath } from './transform-path';
import { removeQuery, urlDomain } from './url';
import { uuid } from '@/utils';

namespace Bailouts {
    function noSIDs(meta: Meta.Form) { // web, not script, use it, no sid, and not button; scuonlinebanking.com clogin #89340
        return !!meta.disp.domain && !meta.disp.isScript &&
            !!meta.fields.find((field: Meta.Field) => field.mani.useit && !field.path.sid && field.mani.type !== 'button');
    }

    export function getBailouts(meta: Meta.Form): string[] | undefined {
        const rv: string[] = [];
        if (meta.disp.isIe && !meta.disp.domain) {
            rv.push("IE website form without site domain");
        }
        if (meta.disp.isIe && meta.disp.isScript) {
            rv.push("Manual mode manifest built for IE");
        };
        if (noSIDs(meta)) {
            rv.push("There are fields in the form without an ID. Check path that does not have SID."); // short: The form has fields with no ID
        }
        return rv.length ? rv : undefined;
    }
} //namespace Bailouts

export function buildManiMetaForms(mani: Mani.Manifest | undefined): Meta.Form[] {
    const isManual = (fields: Meta.Field[]): boolean => {
        return !!fields.length && fields.some(({ path }: { path: Meta.Path; }) => path.sn);
    };
    const isIeServer = (form: Mani.Form): boolean => {
        return !!form.detection?.names_ext?.match(/Internet Explorer_Server/);
    };
    const isIeProcess = (form: Mani.Form): boolean => {
        return !!form.detection?.processname?.match(/(iexplore|msedge|microsoftedgecp)\.exe"?$/i);
    };
    const createMetaForm = (form: Mani.Form, idx: number): Meta.Form => {
        const pool: string[] = getPool(form) || [];
        const fields: Meta.Field[] = (form.fields || []).map((field: Mani.Field, idx: number) => ({
            mani: field,
            ftyp: fieldTyp4Str(field),
            life: TransformValue.valueLife4Mani(field),
            path: FieldPath.fieldPathItems(pool, field.path_ext || ''),
            pidx: idx,
            ridx: 0,
        }));
        const domain = urlDomain(removeQuery(form.detection?.web_ourl));
        const isScript = isManual(fields);
        const isIe = isIeServer(form) || isIeProcess(form);
        const meta: Meta.Form = {
            mani: form,
            type: idx,
            disp: {
                domain,
                isScript,
                noFields: !fields.length,
                isIe,
            },
            pool: pool,
            view: FieldPath.loc.utils.buildPreviewData(fields),
            fields,
            rother: [],
        };
        const bailOuts = Bailouts.getBailouts(meta);
        if (bailOuts) {
            meta.disp.bailOut = bailOuts;
        }
        return meta;
    };
    const forms: Meta.Form[] = !mani || !mani.forms || !mani.forms.length ? [] : mani.forms.map(createMetaForm);
    [0, 1].forEach((type: number) => { // build xlinks
        if (forms[type]) {
            forms[type].rother = forms[type === 0 ? 1 : 0]?.fields.map((field) => field.ridx) || [];
        }
    });
    return forms;
}

// Field catalog transformation

export function buildCatalogMetaFromNames(names: Catalog.Name[] | undefined): FieldCatalog {
    const items = names?.map((item, idx) => {
        const now = uuid.asRelativeNumber();
        return { ...item, index: idx, uuid: now, mru: now, };
    }) || [];
    return {
        items,
    };
}

export function buildCatalogMeta(fcat: Catalog.Root | undefined): FieldCatalog {
    //TODO: handle addtional info
    return buildCatalogMetaFromNames(fcat?.names);
}

// TODO: bailOut: add more checks and explanation why there are issues on each check.
