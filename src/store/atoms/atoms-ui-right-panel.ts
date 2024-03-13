import { Atomize } from "@/hooks/atomsX";
import { atom, Atom, PrimitiveAtom } from "jotai";
import { FileUs, FileUsAtomType } from "../store-types/0-file-us-type";

// Right panel data

export const enum ViewMode {
    raw,
    edit,
}

type RightPanelData = {
    panelAtom: PrimitiveAtom<FileUsAtomType | undefined>;
    fileUsAtom: Atom<FileUs | undefined>;
    viewModeAtom: PrimitiveAtom<ViewMode>;
};

export const rightPanelData: RightPanelData = {
    panelAtom: atom<FileUsAtomType | undefined>(undefined),

    fileUsAtom: atom<FileUs | undefined>(
        (get) => {
            const rpa = get(rightPanelData.panelAtom);
            return rpa ? get(rpa) : undefined;
        }
    ),

    viewModeAtom: atom<ViewMode>(ViewMode.raw),
};

// Open sections

export type ManiOpenSections = {
    form: boolean;
    fields: boolean;
    submit: boolean;
    policy: boolean;
    options: boolean;
};

function createFormOpenSections(): Atomize<ManiOpenSections> {
    return {
        formAtom: atom<boolean>(true),
        fieldsAtom: atom<boolean>(true),
        submitAtom: atom<boolean>(false),
        policyAtom: atom<boolean>(false),
        optionsAtom: atom<boolean>(false),
    };
}

export const maniOpenSections: [login: Atomize<ManiOpenSections>, cpass: Atomize<ManiOpenSections>] = [
    createFormOpenSections(),
    createFormOpenSections()
];
