import { atom } from 'jotai';

export type FileUs = {
    id: string;
    name: string;
    modified: number; // last modified
    size: number;
    cnt?: string;
}

export const filesAtom = atom<FileUs[]>([]);

