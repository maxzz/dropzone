import { atom } from "jotai";
import type { FileUsAtomType } from "@/store/store-types/9-file-us-type";

// Files

export const filesAtom = atom<FileUsAtomType[]>([]);
