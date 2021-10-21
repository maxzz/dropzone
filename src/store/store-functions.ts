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
export const isEmpty = (fileUs: FileUs): boolean => !fileUs.meta || !fileUs.meta.length || !!fileUs.meta?.some((form: Meta.Form) => form.disp.isEmpty);

// Regex

const reDefaultEscapeCharsRegex = /[-|\\{}()[\]^$+.]/g; // This is defult set but without *?
const reQuestion = /[\?]/g;
const reWildcard = /[\*]/g;
function convertToRegex(s: string): string {
    // 0. Wildcard to RegEx. First dot and only then star.
    return s.replace(reDefaultEscapeCharsRegex, '\\$&').replace(reQuestion, '.').replace(reWildcard, '.*');
}

export function createRegexByFilter(s?: string, casesensitive?: boolean): RegExp | "" | undefined {
    return s && new RegExp(convertToRegex(s), casesensitive ? '' : 'i');
}

//

function useFileUs(fileUs: FileUs, regex: RegExp | undefined) {
    const showNormal = false;
    const showManual = false;
    const showEmpty = false;

    let useItNow = isEmpty(fileUs) ? showEmpty : isManual(fileUs) ? showManual : showNormal;
    if (regex) {
        if (useItNow) {
            useItNow = !!fileUs.fname.match(regex);

            if (!useItNow) {
                const form0 = fileUs.mani?.forms[0];
                const title = form0?.options.choosename;
                if (title) {
                    useItNow = !!title.match(regex);
                }

                if (!useItNow) {
                    const meta0 = fileUs.meta?.[0];
                    if (meta0) {
                        const url = meta0.mani.detection.web_ourl;
                        useItNow = !!url?.match(regex);
                    }

                    if (!useItNow) {
                        const meta0 = fileUs.meta?.[1];
                        if (meta0) {
                            const url = meta0.mani.detection.web_ourl;
                            useItNow = !!url?.match(regex);
                        }
                    }
                }
            }
        }
    }
    return useItNow;
}

// More to come...
