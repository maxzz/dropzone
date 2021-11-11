import { parse } from 'fast-xml-parser';
import { restoreCpp } from './mani-functions';
//import test from '../../assets/{ff06f637-4270-4a0e-95a3-6f4995dceae6}.dpm';

export function beautifyXMLManifest(manifest: Mani.Manifest): Mani.Manifest {
    // 0. convert XML .dpm object to manifest format.

    manifest.descriptor = (manifest.descriptor as any)?._attributes || {};
    manifest.forms = (manifest.forms as any)?.form || [];

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
        if (form.fields) {
            form.fields = form.fields.map(field => (field as any)._attributes);

            form.fields.forEach((field: Mani.Field) => {
                field.password && (field.password = !!field.password);
                field.useit && (field.useit = !!field.useit);
                field.rfieldindex && (field.rfieldindex = +field.rfieldindex);
            });
        }
    });

    if (manifest.options?.processes) {
        manifest.options.processes = (manifest.options.processes as any).process || [];
        if (!Array.isArray(manifest.options.processes)) {
            manifest.options.processes = [manifest.options.processes];
        }
        manifest.options.processes = manifest.options.processes.map((process) => (process as any)._attributes);
    }

    return manifest as Mani.Manifest;
}

export function beautifyXMLCatalog(catalog: Catalog.Root): Catalog.Root {
    catalog.names = (catalog as any)?.names?.name || [];
    catalog.names = catalog.names.map((item: any) => item?._attributes).filter(Boolean);
    return catalog;
}

export const parseOptions = {
    attributeNamePrefix: "",
    attrNodeName: "_attributes",
    ignoreAttributes: false,
    allowBooleanAttributes: true,
};

export type ParseManifestResult = {
    mani?: Mani.Manifest;
    fcat?: Catalog.Root;
};

export function parseManifest(cnt: string): ParseManifestResult {
    const obj = parse(cnt, parseOptions); //console.log('%craw', 'color: green', JSON.stringify(obj, null, 4));
    return {
        mani: obj?.manifest && beautifyXMLManifest(obj.manifest),
        fcat: obj?.storagecatalog && beautifyXMLCatalog(obj?.storagecatalog),
    };
}

export namespace Matching {
    export enum MatchStyle {    // cannot use const w/ esbuild
        undef = 0,
        makeDomainMatch = 1,    // That means match the url as string (i.e. not regex or wildcard). this should have prefix '[m0]:1:0:', but unfortunately it is used without prefix as raw murl.
        regex = 2,
        wildcard = 3,
        skipDomainMatch = 4,    // This is exactly string content match i.e. skip domain match. this should have prefix '[m0]:4:0:'
    }

    export enum MatchOptions {  // cannot use const w/ esbuild
        undef = 0,
        caseinsensitive = 0x0001, // This option does not make sense for URLs.
        matchtext = 0x0002,     // match text or don't; This option does not make sense for URLs.
    }

    const reOtsMatching = /^\[m0\]:([1-4]):([0-3]?):\s*(.+)/; // 0: [m0]; 1:style; 2:options; 3:pattern. Example: web_murl="[m0]:2:2:https^2dot;//maxzz.github.io/test-pm/"

    export function getMatchRawInfo(murl: string): { opt: number; style: number; url: string; } | undefined {
        let m = murl?.match(reOtsMatching);
        if (m) {
            let style = +m[1] as MatchStyle; // style
            let opt = +m[2] as MatchOptions; // options
            let url = restoreCpp(m[3]);      // pattern

            return {
                opt,
                style,
                url,
            };
        }
    }

    export function getMatchInfo(murl: string): { prefix: string; join: string; opt: number; style: number; url: string; } | undefined {
        let m = murl?.match(reOtsMatching);
        if (m) {
            let style = +m[1] as MatchStyle; // style
            let opt = +m[2] as MatchOptions; // options
            let url = restoreCpp(m[3]);      // pattern

            let resOpt = [];
            (opt & 1) !== 0 && (resOpt.push('case insensitive')); // MatchOptions.caseinsensitive
            (opt & 2) !== 0 && (resOpt.push('match ext.')); // MatchOptions.matchtext

            let resStyle = '';
            switch (style) {
                case 1: { // MatchStyle.makeDomainMatch
                    resStyle = 'use domain match';
                    break;
                }
                case 2: { // MatchStyle.regex
                    resStyle = 'regex';
                    break;
                }
                case 3: { // MatchStyle.wildcard
                    resStyle = 'wildcard';
                    break;
                }
                case 4: { // MatchStyle.skipDomainMatch
                    resStyle = 'don\'t match this in domain';
                    break;
                }
                default: {
                    resStyle = `${style}`;
                }
            }//switch

            return {
                prefix: `[m0]:${m[1]}:${m[2]}`,
                join: `${resStyle}${resOpt.length ? `; Options: ${resOpt.join(', ')}` : ''}`,
                opt,
                style,
                url,
            };
        }
    }

} //namespace Matching
