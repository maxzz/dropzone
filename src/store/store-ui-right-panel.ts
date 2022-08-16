import { atom, Atom, PrimitiveAtom } from "jotai";
import { FileUs, FileUsAtomType } from "./store-types";

// Right panel data

type RightPanelData = {
    panelAtom: PrimitiveAtom<FileUsAtomType | undefined>;
    valueAtom: Atom<FileUs | undefined>;
};

export const rightPanelData: RightPanelData = {
    panelAtom: atom<FileUsAtomType | undefined>(undefined),
    valueAtom: atom<FileUs | undefined>(
        (get) => {
            const rpa = get(rightPanelData.panelAtom);
            return rpa ? get(rpa) : undefined;
        }
    ),
};
