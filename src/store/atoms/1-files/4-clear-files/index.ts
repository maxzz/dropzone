import { atom } from "jotai";
import { totalManiAtoms } from "../../9-ui-state";
import { rightPanelAtoms } from "../../2-right-panel";
import { filesAtom } from "../0-files-atom";

export const doClearFilesAtom = atom(
    null,
    (get, set) => {
        set(filesAtom, []);
        set(rightPanelAtoms.panelAtom, undefined);
        set(totalManiAtoms.normalAtom, 0);
        set(totalManiAtoms.manualAtom, 0);
        set(totalManiAtoms.emptyAtom, 0);
    }
);
