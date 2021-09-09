import { atom } from 'jotai';

export type FileUs = {
    id: string;
    name: string;
    modified: number; // last modified
    size: number;
    cnt?: string;
    file?: File;
};

export type FileCache = {
    id: string;
    cnt: string;
};

// interface Combined extends FileUs {
//     cnt: string;
// };
export type Combined = FileUs & FileCache;

export const filesAtom = atom<FileUs[]>([]);

export const cacheAtom = atom<FileCache[]>([]);

export const combined = atom<Combined[]>((get) => {
    const files = get(filesAtom);
    const cache = get(cacheAtom);
    const combined: Combined[] = files.map((fileUs: FileUs) => {
        const cnt = cache.find(item => item.id === fileUs.id);
        return {
            ...fileUs,
            cnt: cnt ? cnt.cnt : '',
        }
    });
    return combined;
});
