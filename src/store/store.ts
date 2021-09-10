import { Atom, atom } from 'jotai';

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

// export type Combined = FileUs & FileCache;

// export const filesAtom = atom<FileUs[]>([]);

// export const cacheAtom = atom<FileCache[]>([]);

// export const combined = atom<Combined[]>((get) => {
//     const files = get(filesAtom);
//     const cache = get(cacheAtom);
//     const combined: Combined[] = files.map((fileUs: FileUs) => {
//         const cnt = cache.find(item => item.id === fileUs.id);
//         return {
//             ...fileUs,
//             cnt: cnt ? cnt.cnt : '',
//         }
//     });
//     return combined;
// });

export type FileUsAtom = Atom<FileUs>;

export const filesAtom = atom<FileUsAtom[]>([]);

function textFileReader(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const aborted = () => reject(`file (${file.name}) reading was aborted`);
        reader.onabort = aborted;
        reader.onerror = aborted;
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.readAsText(file);
    });
}

const updateCacheAtom = atom(
    null,
    async (get, set) => {
        const files = get(filesAtom);

        for (let fileAtom of files) {
            try {
                const file = get(fileAtom);

                if (file.file && !file.cnt) {
                    const cnt = await textFileReader(file.file);
                    const newAtom = {
                        ...file,
                        cnt,
                    }
                    set(fileAtom, atom(newAtom));
                }

                file.file && cache.push(
                    { id: file.id, cnt: await textFileReader(file.file), }
                );
            } catch (error) {
                console.log('error', error);
            }
        }


    }
);

async function laodCache(acceptedFiles: FileUs[]) {
    const cache: FileCache[] = [];
    for (let file of acceptedFiles) {
        try {
            file.file && cache.push({ id: file.id, cnt: await textFileReader(file.file), });
        } catch (error) {
            console.log('error', error);
        }
    }
    return cache;
}
