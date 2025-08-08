import { atom } from "jotai";
import { type FileUs } from "@/store/store-types";
import { isAnyEmpty, isAnyManual } from "@/store/manifest";

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
    fcAtom: atom(0),             // field catalogs
};

export function clearTotalManis(set: Setter) {
    set(totalManiAtoms.normalAtom, 0);
    set(totalManiAtoms.manualAtom, 0);
    set(totalManiAtoms.emptyAtom, 0);
    set(totalManiAtoms.fcAtom, 0);
}

export function addToTotalManis(fileUs: FileUs, set: Setter) {
    const { fcat, meta } = fileUs.parsedSrc;

    if (fcat) {
        set(totalManiAtoms.fcAtom, v => ++v);
    } else if (isAnyEmpty(meta)) {
        set(totalManiAtoms.emptyAtom, v => ++v);
    } else if (isAnyManual(meta)) {
        set(totalManiAtoms.manualAtom, v => ++v);
    } else {
        set(totalManiAtoms.normalAtom, v => ++v);
    }
}
