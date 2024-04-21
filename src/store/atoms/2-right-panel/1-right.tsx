import { atom, Atom, PrimitiveAtom } from "jotai";
import { FileUs, FileUsAtomType } from "@/store/store-types";

// Right panel data

export const enum ViewMode {
    raw,
    edit,
}

type RightPanelAtoms = {
    panelAtom: PrimitiveAtom<FileUsAtomType | undefined>;
    fileUsAtom: Atom<FileUs | undefined>;
    viewModeAtom: PrimitiveAtom<ViewMode>;
};

export const rightPanelAtoms: RightPanelAtoms = {
    panelAtom: atom<FileUsAtomType | undefined>(undefined),

    fileUsAtom: atom<FileUs | undefined>(
        (get) => {
            const rpa = get(rightPanelAtoms.panelAtom);
            return rpa ? get(rpa) : undefined;
        }
    ),

    viewModeAtom: atom<ViewMode>(ViewMode.raw),
};
