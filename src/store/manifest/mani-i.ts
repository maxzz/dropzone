import { XMLParser } from 'fast-xml-parser';
import { Catalog, Mani } from './mani';
import { Transform } from './mani-functions';
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
                field.submit && (field.submit = !!field.submit);
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

export const parseOptionsRead = {
    attributeNamePrefix: "",
    attributesGroupName: "_attributes",
    ignoreAttributes: false,
    allowBooleanAttributes: true,
};

export type ParseManifestResult = {
    mani?: Mani.Manifest;
    fcat?: Catalog.Root;
};

export function parseXMLFile(cnt: string): ParseManifestResult {
    const parser = new XMLParser(parseOptionsRead);
    const obj = parser.parse(cnt); //console.log('%craw', 'color: green', JSON.stringify(obj, null, 4));
    return {
        mani: obj?.manifest && beautifyXMLManifest(obj.manifest),
        fcat: obj?.storagecatalog && beautifyXMLCatalog(obj?.storagecatalog),
    };
}

export namespace Matching {
    export enum Style {         // cannot use const w/ esbuild
        undef = 0,
        makeDomainMatch = 1,    // That means match the url as string (i.e. not regex or wildcard). this should have prefix '[m0]:1:0:', but unfortunately it is used without prefix as raw murl.
        regex = 2,
        wildcard = 3,
        skipDomainMatch = 4,    // This is exactly string content match i.e. skip domain match. this should have prefix '[m0]:4:0:'
    }

    export enum Options {       // cannot use const w/ esbuild
        undef = 0,
        caseinsensitive = 0x0001, // This option does not make sense for URLs (even for wildcards).
        matchtext = 0x0002,       // match text or don't; This option does not make sense for URLs.
        usequery = 0x0004,        // match text or don't; This option does not make sense for URLs.
        pmacSet = 0x0008,         // set manually by pmac utility.
    }

    export type RawMatchData = {
        style: Style;
        opt: Options;
        url: string;
    };

    export const reUrlMatchCheck = /^\[m0\]\:.\:.\:/;   // this regex to quickly check the start of url if any matching is set
    //export const reUrlMatchRegex = /^\[m0\]\:3\:.\:/; // this can be 3 or 8: /^\[m0\]\:8\:.\:/   // this regex to quickly check the start of url if regex matching is set
    export const addPrefixRegex = '[m0]:3:8:';          // this prefix is to add the start of url as regex match to exclude from DomainMatch

    const reOtsMatching = /^\[m0\]:([0-4]):([01248ace]{1,4}):\s*(.+)/; // 0: [m0]; 1:style; 2:options; 3:pattern. Example: web_murl="[m0]:2:2:https^2dot;//maxzz.github.io/test-pm/"

    export function getMatchRawData(murl: string): RawMatchData {
        let rv = { style: Style.undef, opt: Options.undef, url: murl || '', }; // don't need call restoreCpp(murl) here.
        let m = murl?.match(reOtsMatching); // TODO: do we need to resrt reOtsMatching.lastIndex before match?
        if (m) {
            rv.style = +m[1] as Style; // style
            rv.opt = +m[2] as Options; // options
            rv.url = Transform.cppRestore(m[3]); // pattern
        }
        return rv;
    }

    export function makeRawMatchData({ style, opt, url }: RawMatchData, ourl: string): string {
        url = (style !== Style.undef ? url || '' : ourl).trim();
        return style !== Style.undef || opt !== Options.undef ? `[m0]:${style}:${opt}:${Transform.colonEscape(url)}` : url;
    }

    function styleName(style: number): string {
        const names: Record<number, string> = {
            1: 'use domain match',            // Style.makeDomainMatch
            2: 'regex',                       // Style.regex
            3: 'wildcard',                    // Style.wildcard
            4: 'don\'t match this in domain', // Style.skipDomainMatch
        };
        return names[style] || `${style}`;
    }

    export function getMatchInfo(murl: string): { prefix: string; join: string; url: string; } | undefined {
        const raw = getMatchRawData(murl);
        if (raw.style || raw.opt) {
            const { style, opt, url } = raw;

            let resOpt = [];
            (opt & 1) !== 0 && (resOpt.push('case insensitive'));   // Options.caseinsensitive
            (opt & 2) !== 0 && (resOpt.push('match ext.'));         // Options.matchtext

            let resStyle = styleName(style);
            return {
                prefix: `[m0]:${style}:${opt}`,
                join: `${resStyle}${resOpt.length ? `; Options: ${resOpt.join(', ')}` : ''}`,
                url,
            };
        }
    }

} //namespace Matching
