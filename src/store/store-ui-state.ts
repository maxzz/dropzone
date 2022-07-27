import { atom } from "jotai";
import { atomWithCallback } from "@/hooks/atomsX";
import { FileUs, FileUsAtomType } from "./store-types";
import { LocalStorageSave, } from "./store-save";
import { LocalStorage } from "./store-localstorage";
import { filesAtom, } from "./store-files";

// Filters

export const showNormalManiAtom = atom(true);
export const showManualManiAtom = atom(true);
export const showEmptyManiAtom = atom(true);

export const totalManualManiAtom = atom(0);
export const totalNormalManiAtom = atom(0);
export const totalEmptyManiAtom = atom(0);

export const searchFilterAtom = atom('');
export const searchFilterCaseSensitiveAtom = atom(false); // search case sensitive

// Current atom for the right panel

export const rightPanelAtom = atom<FileUsAtomType | undefined>(undefined);

export const rightPanelValueAtom = atom<FileUs | undefined>(
    (get) => {
        const rpa = get(rightPanelAtom);
        return rpa ? get(rpa) : undefined;
    }
);

// Files toggle folding. //TODO: hack: react does not have events down propagation. for more complicated cases we can use useImperativeHandle.

export const _foldAllCardsAtom = atom(-1); // -1 to skip initial render

export const foldAllCardsAtom = atom(
    (get) => get(_foldAllCardsAtom),
    (get, set) => {
        //set(busyAtom, 'Folding...');
        set(_foldAllCardsAtom, get(_foldAllCardsAtom) + 1); // odd - expand; even - collapse
        //set(busyAtom, '');
    }
);

// Manifests to actions selection

export const selected4ActionAtom = atom<FileUsAtomType[]>([]);

// Busy indicator

export const busyAtom = atom('');

//

export const doClearFilesAtom = atom(
    null,
    (get, set) => {
        set(filesAtom, []);
        set(rightPanelAtom, undefined);
        set(totalNormalManiAtom, 0);
        set(totalManualManiAtom, 0);
        set(totalEmptyManiAtom, 0);
    }
);

// UI has files

export const hasFilesAtom = atom(
    (get) => {
        const total = get(filesAtom);
        return !!total.length;
    }
    );

// Split pane position

export const splitPaneAtom = atomWithCallback<number>(LocalStorage.initialData.vSplitPos, LocalStorageSave.save);
