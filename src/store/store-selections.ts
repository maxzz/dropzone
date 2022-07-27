import { atom } from "jotai";
import { filesAtom } from "./store-files";
import { FileUsAtomType } from "./store-types";

// Current card selection

const getCurrentCardAtom = atom( // TODO: it should be function instead of atom, since there is no reactivity
    (get) => {
        const files = get(filesAtom);
        const sel = files.find((currentFileUsAtom) => get(get(currentFileUsAtom).state.isCurrentAtom));
        //console.log('get selected', `${sel}`, 'all', files.map((fileAtom) => `${fileAtom}`));
        return sel;
    }
);

export const doSetCurrentCardAtom = atom(
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
