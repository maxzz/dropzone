import { atom } from "jotai";

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
