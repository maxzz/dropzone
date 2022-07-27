import { atom, PrimitiveAtom } from "jotai";
import { FileUsAtom } from "./store-types";

// Form editor data

export type EditorData = {
    fileUsAtom: FileUsAtom;
    formIdx: number; // 0 - login (even if login does not exist); 1 - pchange; 2 - both
};

export type FormEditorDataAtom = PrimitiveAtom<EditorData | null>;

export const formEditorDataAtom = atom<EditorData | null>(null);

