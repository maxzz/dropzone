import { SetStateAction, atom } from "jotai";

// Field catalog dialog UI state

export const fldCatOpenAtom = atom(false);

export const openFldCatDialogAtom = atom(
    (get) => get(fldCatOpenAtom),
    (get, set, value: SetStateAction<boolean>) => {
        set(fldCatOpenAtom, value);
    }
);

