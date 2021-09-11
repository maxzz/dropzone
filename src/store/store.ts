import { Atom, atom, SetStateAction, WritableAtom } from 'jotai';

export type FileUs = {
    id: string;
    name: string;
    modified: number; // last modified
    size: number;
    cnt?: string;
    file?: File;
};

export type FileUsAtom = WritableAtom<FileUs, FileUs>;

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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const updateCacheAtom = atom(
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
                    };
                    set(fileAtom, newAtom);
                    //await delay(1000);
                }
            } catch (error) {
                console.log('error', error);
            }
        }
    }
);
