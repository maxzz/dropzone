import { atom } from "jotai";
import { filesAtom } from "../1-files";

// UI has files

export const hasFilesAtom = atom(
    (get) => {
        const total = get(filesAtom);
        return !!total.length;
    }
);
