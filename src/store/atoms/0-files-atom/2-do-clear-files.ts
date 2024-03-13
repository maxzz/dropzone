import { atom } from 'jotai';
import { totalManiAtoms } from '../atoms-ui-state';
import { rightPanelData } from '../atoms-ui-right-panel';
import { filesAtom } from './0-files-atom';

export const doClearFilesAtom = atom(
    null,
    (get, set) => {
        set(filesAtom, []);
        set(rightPanelData.panelAtom, undefined);
        set(totalManiAtoms.normalAtom, 0);
        set(totalManiAtoms.manualAtom, 0);
        set(totalManiAtoms.emptyAtom, 0);
    }
);
