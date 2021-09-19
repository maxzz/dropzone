import { atom, Getter, WritableAtom } from 'jotai';
import uuid from '../utils/uuid';
import { buildFormExs } from './manifest/mani-functions';
import { parseManifest } from './manifest/mani-io';
import { delay, isEmpty, isManual, textFileReader } from './store-functions';

export type FileUs = {
    id: string;
    fname: string;
    modified: number; // last modified
    size: number;
    raw?: string;
    mani?: Mani.Manifest;
    meta?: Meta.Form[],
    file?: File;
};

export type FileUsAtom = WritableAtom<FileUs, FileUs>;

// Files

export const filesAtom = atom<FileUsAtom[]>([]);

export const SetFilesAtom = atom(
    null,
    (get, set, accepterFiles: File[]) => {
        const dropped: FileUsAtom[] = accepterFiles.filter((file) => file.size).map((file) => {
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

export const filteredAtom = atom<FileUsAtom[]>(
    (get) => {
        const showNormal = get(showNormalManiAtom);
        const showManual = get(showManualManiAtom);
        const showEmpty = get(showEmptyManiAtom);
        const files = get(filesAtom);
        return files.filter((fileAtom: FileUsAtom) => {
            const fileUs = get(fileAtom);
            return isEmpty(fileUs) ? showEmpty : isManual(fileUs) ? showManual : showNormal;
        });
    }
);

// Cache

function countManifestTypes(get: Getter) {
    const files = get(filesAtom);
    const res = files.reduce((acc, cur) => {
        const m: FileUs = get(cur);
        if (isEmpty(m)) {
            acc.empty++;
        } else if (isManual(m)) {
            acc.manual++;
        } else {
            acc.normal++;
        }
        return acc;
    }, { normal: 0, manual: 0, empty: 0 });
    return res;
}

const updateCacheAtom = atom(
    null,
    async (get, set) => {
        const files = get(filesAtom);

        for (let fileAtom of files) {
            try {
                const file = get(fileAtom);

                if (file.file && !file.raw) {
                    const raw = await textFileReader(file.file);

                    let mani: Mani.Manifest | undefined;
                    let meta: Meta.Form[] | undefined;
                    try {
                        mani = parseManifest(raw);
                        meta = buildFormExs(mani);
                    } catch (error) {
                        console.log('%ctm error', 'color: red', error, '\n', file.fname, raw);
                    }

                    const forNewAtom: FileUs = {
                        ...file,
                        raw: raw,
                        mani,
                        meta,
                    };
                    set(fileAtom, forNewAtom);
                    //await delay(1000);
                }
            } catch (error) {
                console.log('error', error);
            }
        } //for

        const total = countManifestTypes(get);
        set(totalNormalManiAtom, total.normal);
        set(totalManualManiAtom, total.manual);
        set(totalEmptyManiAtom, total.empty);
    }
);

// Filers

export const showNormalManiAtom = atom(true);
export const showManualManiAtom = atom(true);
export const showEmptyManiAtom = atom(true);

export const totalManualManiAtom = atom(0);
export const totalNormalManiAtom = atom(0);
export const totalEmptyManiAtom = atom(0);

// Current atom for the right panel

export const rightPanelAtom = atom<FileUsAtom | undefined>(undefined);

export const rightPanelValue = atom(
    (get) => {
        const rpa = get(rightPanelAtom);
        return rpa ? get(rpa) : undefined;
    }
);
