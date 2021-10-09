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
