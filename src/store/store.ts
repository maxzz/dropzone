import { atom, WritableAtom } from 'jotai';
import uuid from '../utils/uuid';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type FileUs = {
    id: string;
    name: string;
    modified: number; // last modified
    size: number;
    raw?: string;
    file?: File;
};

export type FileUsAtom = WritableAtom<FileUs, FileUs>;

// Files

export const filesAtom = atom<FileUsAtom[]>([]);

export const SetFilesAtom = atom(
    null,
    (get, set, accepterFiles: File[]) => {
        const dropped: FileUsAtom[] = accepterFiles.map((file) => {
            return atom<FileUs>({
                id: uuid(),
                name: file.name,
                modified: file.lastModified,
                size: file.size,
                file: file,
            });
        });
        set(filesAtom, dropped);
    }
)

// Cache

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

export const updateCacheAtom = atom(
    null,
    async (get, set) => {
        const files = get(filesAtom);

        for (let fileAtom of files) {
            try {
                const file = get(fileAtom);

                if (file.file && !file.raw) {
                    const cnt = await textFileReader(file.file);
                    const newAtom = {
                        ...file,
                        raw: cnt,
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
