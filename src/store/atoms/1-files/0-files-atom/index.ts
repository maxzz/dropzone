import { atom } from "jotai";
import type { FileUsAtomType } from "@/store/store-types/0-file-us-type";

// Files

export const filesAtom = atom<FileUsAtomType[]>([]);
