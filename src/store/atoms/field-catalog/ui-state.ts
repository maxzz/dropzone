import { SetStateAction, atom } from "jotai";

// Field catalog dialog UI state

export const fldCatOpenAtom = atom(false);

export const doOpenFldCatDialogAtom = atom(
    (get) => get(fldCatOpenAtom),
    (get, set, value: SetStateAction<boolean>) => {
        set(fldCatOpenAtom, value);
    }
);

export type FldCatSelectData = {
    dbid: string | undefined;
}

export const fldCatSelectDataAtom = atom<FldCatSelectData | null>(null);

export const doSelectFldCatDialogAtom = atom(
    null,
    (get, set, value: SetStateAction<FldCatSelectData | null>) => {
        set(fldCatSelectDataAtom, value);

        if (value) {
            set(fldCatOpenAtom, true);    
        } else {
            set(fldCatOpenAtom, false);
        }
    }
);
