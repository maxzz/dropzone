import { atom, Getter, WritableAtom } from 'jotai';
import atomWithCallback from '../hooks/atomsX';
import debounce from '../utils/debounce';
import uuid from '../utils/uuid';
import { buildFormExs } from './manifest/mani-functions';
import { parseManifest } from './manifest/mani-io';
import { delay, isEmpty, isManual, textFileReader } from './store-functions';

export type FileUs = {
    id: string;
    idx: number; // index in the loaded list wo/ counting on filters, i.e. absolute index
    fname: string;
    modified: number; // last modified
    size: number;
    raw?: string;
    mani?: Mani.Manifest;
    meta?: Meta.Form[],
    file?: File;
};

export type FileUsAtom = WritableAtom<FileUs, FileUs>;

// Local storage

namespace Storage {
    const KEY = 'pmit-01';

    type Store = {
        vSplitPos: number;
    };

    export let initialData: Store = {
        vSplitPos: 44,
    };

    function load() {
        const s = localStorage.getItem(KEY);
        if (s) {
            try {
                let obj = JSON.parse(s) as Store;
                initialData = obj;
            } catch (error) {
            }
        }
    }
    load();

    export const save = debounce(function _save(get: Getter) {
        let newStore: Store = {
            vSplitPos: get(SplitPaneAtom),
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);
}

// Files

export const filesAtom = atom<FileUsAtom[]>([]);

export const SetFilesAtom = atom(
    null,
    (get, set, accepterFiles: File[]) => {
        const dropped: FileUsAtom[] = accepterFiles.filter((file) => file.size).map((file, idx) => {
            return atom<FileUs>({
                id: uuid(),
                idx,
                fname: file.name,
                modified: file.lastModified,
                size: file.size,
                file: file,
            });
        });
        set(filesAtom, dropped);
        set(updateCacheAtom);
        set(rightPanelAtom, undefined);
        set(_foldAllCardsAtom, -1);
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

export const clearFilesAtom = atom(
    (get) => get(filesAtom),
    (get, set) => {
        set(filesAtom, []);
        set(rightPanelAtom, undefined);
    }
)

// Files toggle folding.

//TODO: hack: react does not have events down propagation. for more complicated cases we can use useImperativeHandle.
export const _foldAllCardsAtom = atom(-1); // -1 to skip initial render

export const foldAllCardsAtom = atom(
    (get) => get(_foldAllCardsAtom),
    (get, set) => {
        set(_foldAllCardsAtom, get(_foldAllCardsAtom) + 1); // odd - expand; even - collapse
    }
);

// Cache

function countManifestTypes(get: Getter) {
    const files = get(filesAtom);
    const res = files.reduce((acc, cur: FileUsAtom) => {
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

// Filters

export const showNormalManiAtom = atom(true);
export const showManualManiAtom = atom(true);
export const showEmptyManiAtom = atom(true);

export const totalManualManiAtom = atom(0);
export const totalNormalManiAtom = atom(0);
export const totalEmptyManiAtom = atom(0);

// Current atom for the right panel

export const rightPanelAtom = atom<FileUsAtom | undefined>(undefined);

export const rightPanelValueAtom = atom<FileUs | undefined>(
    (get) => {
        const rpa = get(rightPanelAtom);
        return rpa ? get(rpa) : undefined;
    }
);

// Split pane position

export const SplitPaneAtom = atomWithCallback<number>(Storage.initialData.vSplitPos, (get, _) => Storage.save(get));
