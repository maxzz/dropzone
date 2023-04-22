import { atom } from "jotai";
import { atomWithCallback } from "@/hooks/atomsX";
import { FileUsAtomType, Order, SortBy, UISize } from "../store-types";
import { LocalStorageSave, } from "../store-localstorage-save";
import { LocalStorage } from "../store-localstorage-load";
import { filesAtom, } from "./atoms-files";

// Busy indicator

export const busyAtom = atom('');

// UI has files

export const hasFilesAtom = atom(
    (get) => {
        const total = get(filesAtom);
        return !!total.length;
    }
);

// Filters state

export const showManiAtoms = {
    normalAtom: atom(true),
    manualAtom: atom(true),
    emptyAtom: atom(true),
};

export const totalManiAtoms = {
    manualAtom: atom(0),
    normalAtom: atom(0),
    emptyAtom: atom(0),
};

// Filters search data

export const searchFilterData = {
    textAtom: atom(''),
    caseSensitiveAtom: atom(false), // search case sensitive
};

// Files sort by and order

export const sortByAtom = atomWithCallback<SortBy>(LocalStorage.initialData.sortBy, LocalStorageSave.save);
export const orderAtom = atomWithCallback<Order>(LocalStorage.initialData.order, LocalStorageSave.save);

// Files toggle folding. //TODO: hack: react does not have events down propagation. for more complicated cases we can use useImperativeHandle.

export const _foldAllCardsAtom = atom(-1); // -1 to skip initial render

export const allCards = {

    areFoldedCounterAtom: atom(
        (get) => get(_foldAllCardsAtom) // This is almost 'areFoldedAtom' except it is counter to skip first render (which is not true anymore for React 18 dev mode).
    ),

    doFoldAllCardsAtom: atom(
        null,
        (get, set) => {
            //set(busyAtom, 'Folding...');
            set(_foldAllCardsAtom, get(_foldAllCardsAtom) + 1); // odd - expand; even - collapse
            //set(busyAtom, '');
        }
    ),
};

// UI split pane position

export const splitPaneAtom = atomWithCallback<number>(LocalStorage.initialData.vSplitPos, LocalStorageSave.save);

// UI files list items size

export const uiSizeAtom = atomWithCallback<UISize>(LocalStorage.initialData.uiSize, LocalStorageSave.save);

// Manifests to actions selection (not used anymore?)

export const selected4ActionAtom = atom<FileUsAtomType[]>([]);
