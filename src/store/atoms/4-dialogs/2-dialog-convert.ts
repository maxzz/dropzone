import { atom } from "jotai";
import { FileUsFormData } from "../../store-types";

// Convert dialog data

export type ConvertDialogData = FileUsFormData & {
    text: string;
};

export const dialogConvertDataAtom = atom<ConvertDialogData | null>(null);
