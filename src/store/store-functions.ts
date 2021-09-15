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

// Utilities

export const isManual = (m: FileUs): boolean => !!m.meta?.some((form: Meta.Form) => form.disp.isScript);
export const isEmpty = (m: FileUs): boolean => !!m.meta?.some((form: Meta.Form) => form.disp.isEmpty);
