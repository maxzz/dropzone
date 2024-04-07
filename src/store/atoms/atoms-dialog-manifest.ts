import { atom } from "jotai";
import { FileUsFormData } from "../store-types";

// Form editor data

export type ManiEditorData = FileUsFormData;

export const formEditorDataAtom = atom<ManiEditorData | null>(null);
