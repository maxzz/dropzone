import { PrimitiveAtom, SetStateAction, atom } from "jotai";

// Field catalog dialog UI state

export const fldCatOpenAtom = atom(false);

export const doOpenFldCatDialogAtom = atom(
    (get) => get(fldCatOpenAtom),
    (get, set, value: SetStateAction<boolean>) => {
        set(fldCatOpenAtom, value);
    }
);

export type FldCatInData = {
    dbid: string | undefined;
}

export type FldCatOutData = {
    dbid: string | undefined;
}

export const fldCatInDataAtom = atom<FldCatInData | null>(null);
export const fldCatOutDataAtom = atom<FldCatOutData | null>(null); // null is initial state when dialog just opened

export type FldCatOutDataAtom = PrimitiveAtom<FldCatOutData | null>;

export const doSelectFldCatDialogAtom = atom(
    null,
    (get, set, value: FldCatInData | null) => {
        set(fldCatInDataAtom, value);
        set(fldCatOutDataAtom, null);
        set(fldCatOpenAtom, !!value);
    }
);
