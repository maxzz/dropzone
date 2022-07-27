import { atom } from "jotai";
import { atomWithCallback } from "@/hooks/atomsX";
import { LocalStorage } from "./store-localstorage";
import { LocalStorageSave, } from "./store";
import { filesAtom, } from "./store-files";
import { rightPanelAtom, totalEmptyManiAtom, totalManualManiAtom, totalNormalManiAtom } from "./store-filters";
import { FileUsAtomType } from "./store-types";

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

// Split pane position

export const splitPaneAtom = atomWithCallback<number>(LocalStorage.initialData.vSplitPos, ({ get }) => LocalStorageSave.saveDebounced(get));
