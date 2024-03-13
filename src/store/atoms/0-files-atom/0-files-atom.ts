import { atom } from 'jotai';
import { FileUsAtomType } from "@/store/store-types/0-file-us-type";

// Files

export const filesAtom = atom<FileUsAtomType[]>([]);
