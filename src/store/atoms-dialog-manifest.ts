import { atom } from "jotai";
import { FileUsFormData } from "./store-types";

// Form editor data

export type EditorData = FileUsFormData;

export const formEditorDataAtom = atom<EditorData | null>(null);
