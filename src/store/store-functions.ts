import { FileUs } from './store';

export function textFileReader(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const aborted = () => reject(`File (${file.name}) reading was aborted`);
        reader.onabort = aborted;
        reader.onerror = aborted;
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.readAsText(file);
    });
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const isObject = (value: any): boolean => value && typeof value === 'object';

// Utilities

export const isManual = (fileUs: FileUs): boolean => !!fileUs.meta?.some((form: Meta.Form) => form.disp.isScript);
export const isEmpty = (fileUs: FileUs): boolean => !fileUs.meta || !fileUs.meta.length || !!fileUs.meta?.some((form: Meta.Form) => form.disp.noFields);
export const isAnyWeb = (fileUs: FileUs): boolean => !!fileUs.meta?.[0]?.disp.domain || !!fileUs.meta?.[1]?.disp.domain;

// Regex

const reDefaultEscapeCharsRegex = /[-|\\{}()[\]^$+.]/g; // This is defult set but without *?
const reQuestion = /[\?]/g;
const reWildcard = /[\*]/g;
function convertToRegex(s: string): string {
    // 0. Wildcard to RegEx. First dot and only then star.
    return s.replace(reDefaultEscapeCharsRegex, '\\$&').replace(reQuestion, '.').replace(reWildcard, '.*');
}

type FilterParams = {
    winOnly: boolean;
    webOnly: boolean;
    whyOnly: boolean;
    regex: '' | RegExp | undefined;
};

export function createRegexByFilter(s?: string, casesensitive?: boolean): FilterParams {
    let winOnly = !!(s && s.match(/^win\:/));
    let webOnly = !!(s && s.match(/^web\:/));
    let whyOnly = !!(s && s.match(/^why\:/));
    if (winOnly || webOnly) {
        s = s?.replace(/^(win|web|why)\:/, '');
    }
    return {
        winOnly,
        webOnly,
        whyOnly,
        regex: s && new RegExp(convertToRegex(s), casesensitive ? '' : 'i')
    };
}

// Filter

export function useFileUsByFilter(fileUs: FileUs, regex: RegExp): boolean {
    let useItNow = !!fileUs.fname.match(regex);

    if (!useItNow) {
        useItNow = !!fileUs.mani?.forms?.[0]?.options?.choosename?.match(regex);
    }

    if (!useItNow) {
        useItNow = !!fileUs.meta?.[0]?.mani.detection?.web_ourl?.match(regex);
    }

    if (!useItNow) {
        useItNow = !!fileUs.meta?.[1]?.mani.detection?.web_ourl?.match(regex);
    }

    return useItNow;
}

// More to come...
