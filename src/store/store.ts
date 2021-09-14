import { atom, WritableAtom } from 'jotai';
import uuid from '../utils/uuid';
import { parseManifest } from './manifest/mani-io';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type FileUs = {
    id: string;
    fname: string;
    modified: number; // last modified
    size: number;
    raw?: string;
    mani?: Mani.Manifest;
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
                fname: file.name,
                modified: file.lastModified,
                size: file.size,
                file: file,
            });
        });
        set(filesAtom, dropped);
        set(updateCacheAtom);
    }
);

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

const updateCacheAtom = atom(
    null,
    async (get, set) => {
        const files = get(filesAtom);

        for (let fileAtom of files) {
            try {
                const file = get(fileAtom);

                if (file.file && !file.raw) {
                    const cnt = await textFileReader(file.file);
                    //console.log('cnt', cnt);

                    let mani: Mani.Manifest | undefined;
                    try {
                        mani = parseManifest(cnt);
                    } catch (error) {
                        console.log('%ctm error', 'color: red', error, '\n', file.fname, cnt);
                    }

                    const newAtom = {
                        ...file,
                        raw: cnt,
                        mani: mani,
                    };
                    set(fileAtom, newAtom);
                    //await delay(1000);
                }
            } catch (error) {
                console.log('error', error);
            }
        }

        set(totalManualManiAtom, files.length);
        set(totalNormalManiAtom, files.length);
    }
);

// Filers

export const showNormalManiAtom = atom(true);
export const showManualManiAtom = atom(false);

export const totalManualManiAtom = atom(0);
export const totalNormalManiAtom = atom(0);
