import { atom } from "jotai";
import { FileUsFormData } from "../store-types/1-file-us-form-data";

// Convert dialog data

export type ConvertDialogData = FileUsFormData & {
    text: string;
};

export const formEditorDataAtom = atom<ConvertDialogData | null>(null);
