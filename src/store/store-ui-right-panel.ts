import { atom, Atom, PrimitiveAtom } from "jotai";
import { FileUs, FileUsAtomType } from "./store-types";

// Right panel data

export const enum ViewMode {
    raw,
    edit,
}

type RightPanelData = {
    panelAtom: PrimitiveAtom<FileUsAtomType | undefined>;
    valueAtom: Atom<FileUs | undefined>;
    viewModeAtom: Atom<ViewMode>;
};

export const rightPanelData: RightPanelData = {
    panelAtom: atom<FileUsAtomType | undefined>(undefined),

    valueAtom: atom<FileUs | undefined>(
        (get) => {
            const rpa = get(rightPanelData.panelAtom);
            return rpa ? get(rpa) : undefined;
        }
    ),

    viewModeAtom: atom<ViewMode>(ViewMode.raw),
};
