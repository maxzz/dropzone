// Filters

import { atom } from "jotai";
import { filesAtom } from "./store";
import { FileUs, FileUsAtomType } from "./store-types";

export const showNormalManiAtom = atom(true);
export const showManualManiAtom = atom(true);
export const showEmptyManiAtom = atom(true);

export const totalManualManiAtom = atom(0);
export const totalNormalManiAtom = atom(0);
export const totalEmptyManiAtom = atom(0);

export const searchFilterAtom = atom('');
export const searchFilterCaseSensitiveAtom = atom(false); // search case sensitive

// Current atom for the right panel

export const rightPanelAtom = atom<FileUsAtomType | undefined>(undefined);

export const rightPanelValueAtom = atom<FileUs | undefined>(
    (get) => {
        const rpa = get(rightPanelAtom);
        return rpa ? get(rpa) : undefined;
    }
);

// Current card selection

const getCurrentCardAtom = atom( // TODO: it should be function instead of atom, since there is no reactivity
    (get) => {
        const files = get(filesAtom);
        const sel = files.find((currentFileUsAtom) => get(get(currentFileUsAtom).state.isCurrentAtom));
        //console.log('get selected', `${sel}`, 'all', files.map((fileAtom) => `${fileAtom}`));
        return sel;
    }
);

export const setCurrentCardAtom = atom(
    null,
    (get, set, { fileUsAtom, setCurrent }: { fileUsAtom: FileUsAtomType, setCurrent: boolean; }) => {
        const files = get(filesAtom);
        files.forEach((currentFileUsAtom) => {
            const thisCurrentAtom = get(currentFileUsAtom).state.isCurrentAtom;
            const thisCurrentNow = get(thisCurrentAtom);
            if (currentFileUsAtom === fileUsAtom) {
                (thisCurrentNow !== setCurrent) && set(thisCurrentAtom, setCurrent);
            } else {
                (thisCurrentNow) && set(thisCurrentAtom, false);
            }
        });
    }
);
