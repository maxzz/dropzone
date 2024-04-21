import { atom } from "jotai";
import { FileUsFormData } from "../../store-types";

// Form editor data

export type ManiEditorData = FileUsFormData;

export const dialogManiEditorDataAtom = atom<ManiEditorData | null>(null);
