import { atom, Getter, PrimitiveAtom, WritableAtom } from 'jotai';
import atomWithCallback from '../hooks/atomsX';
import debounce from '../utils/debounce';
import uuid from '../utils/uuid';
import { buildManiMetaForms } from './manifest/mani-functions';
import { parseManifest } from './manifest/mani-io';
import { delay, isEmpty, isManual, textFileReader } from './store-functions';

export type FileUs = {
    id: string;
    idx: number;        // index in the loaded list wo/ counting on filters, i.e. absolute index
    fname: string;
    fpath: string;      // file relative path to the dropped folder
    fmodi: number;      // lastModified
    modified: number;   // last modified
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
            vSplitPos: get(splitPaneAtom),
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);
}

// Files

export const filesAtom = atom<FileUsAtom[]>([]);

export const setFilesAtom = atom(
    null,
    (get, set, accepterFiles: File[]) => {
        const dropped: FileUsAtom[] = accepterFiles.filter((file) => file.size).map((file, idx) => {
            const path = ((file as any).path as string || '').replace(/^\//, '').split(/[\\\/]/);
            path.pop();
            return atom<FileUs>({
                id: uuid(),
                idx,
                fname: file.name,
                fpath: path.join('/'),
                fmodi: (file as any).lastModified || 0,
                modified: file.lastModified,
                size: file.size,
                file: file,
            });
        });
        set(_foldAllCardsAtom, -1);
        set(filesAtom, dropped);
        set(updateCacheAtom);
        set(rightPanelAtom, undefined);
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
        set(totalNormalManiAtom, 0);
        set(totalManualManiAtom, 0);
        set(totalEmptyManiAtom, 0);
    }
)

// Files toggle folding.

//TODO: hack: react does not have events down propagation. for more complicated cases we can use useImperativeHandle.
export const _foldAllCardsAtom = atom(-1); // -1 to skip initial render

export const foldAllCardsAtom = atom(
    (get) => get(_foldAllCardsAtom),
    (get, set) => {
        //set(busyAtom, 'Folding...');
        set(_foldAllCardsAtom, get(_foldAllCardsAtom) + 1); // odd - expand; even - collapse
        //set(busyAtom, '');
    }
);

// Fields selection

export type SelectRow = {
    field: number;
    form: number;
}

export type SelectRowAtoms = {
    loginAtom: PrimitiveAtom<SelectRow>;
    cpassAtom: PrimitiveAtom<SelectRow>;
};

// Cache

const updateCacheAtom = atom(
    null,
    async (get, set) => {
        set(totalNormalManiAtom, 0);
        set(totalManualManiAtom, 0);
        set(totalEmptyManiAtom, 0);
        set(busyAtom, 'Parsing...');

        const total = { normal: 0, manual: 0, empty: 0 };

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
                        meta = buildManiMetaForms(mani);
                    } catch (error) {
                        console.log('%ctm error', 'color: red', error, '\n', file.fname, raw);
                    }

                    const forNewAtom: FileUs = {
                        ...file,
                        raw,
                        mani,
                        meta,
                    };
                    set(fileAtom, forNewAtom);

                    if (isEmpty(forNewAtom)) {
                        set(totalEmptyManiAtom, ++total.empty);
                    } else if (isManual(forNewAtom)) {
                        set(totalManualManiAtom, ++total.manual);
                    } else {
                        set(totalNormalManiAtom, ++total.normal);
                    }
            
                    //await delay(1000);
                }
            } catch (error) {
                console.log('error', error);
            }
        } //for

        set(busyAtom, '');
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

// Busy indicator

export const busyAtom = atom('');

// Split pane position

export const splitPaneAtom = atomWithCallback<number>(Storage.initialData.vSplitPos, (get, _) => Storage.save(get));

// Manifests to actions selection

export const selected4Action = atom<FileUsAtom[]>([]);
