import { atom } from "jotai";
import { FileUsAtomType } from "./store-types";

// Form editor data

export type EditorData = {
    fileUsAtom: FileUsAtomType;
    formIdx: number; // 0 - login (even if login does not exist); 1 - pchange; 2 - both
};

export const formEditorDataAtom = atom<EditorData | null>(null);
