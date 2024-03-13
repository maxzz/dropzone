import { atom } from "jotai";
import { FileUsFormData } from "../store-types/1-file-us-form-data";

// Form editor data

export type EditorData = FileUsFormData;

export const formEditorDataAtom = atom<EditorData | null>(null);
