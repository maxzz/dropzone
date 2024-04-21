import { atom } from "jotai";
import { Atomize } from "@/util-hooks";

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
