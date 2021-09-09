import { atom } from 'jotai';

export type FileUs = {
    id: string;
    name: string;
    modified: number; // last modified
    size: number;
    cnt?: string;
    file?: File;
}

export type FileCache = {
    id: string;
    cnt: string;
};

export const filesAtom = atom<FileUs[]>([]);

export const cacheAtom = atom<FileCache[]>([]);
