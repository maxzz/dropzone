import { atom, Getter, PrimitiveAtom } from 'jotai';
import { atomWithCallback } from '@/hooks/atomsX';
import { debounce } from '@/utils/debounce';
import { uuid } from '@/utils/uuid';
import { LocalStorage } from './store-localstorage';
import { FileUs, FileUsAtomType, FileUsStats } from './store-types';
import { buildManiMetaForms, parseManifest } from './manifest';
import { createRegexByFilter, delay, fileUsStats, isAnyCap, isAnyCls, isAnyWeb, isAnyWhy, isEmpty, isManual, textFileReader, useFileUsByFilter } from './store-functions';
import { rightPanelAtom, searchFilterAtom, searchFilterCaseSensitiveAtom, showEmptyManiAtom, showManualManiAtom, showNormalManiAtom, totalEmptyManiAtom, totalManualManiAtom, totalNormalManiAtom } from './store-filters';
import { busyAtom, splitPaneAtom, _foldAllCardsAtom } from './store-ui-state';

// Local storage

export namespace LocalStorageSave {
    export const saveDebounced = debounce(function _save(get: Getter) {
        let newStore: LocalStorage.Store = {
            vSplitPos: get(splitPaneAtom),
        };
        localStorage.setItem(LocalStorage.KEY, JSON.stringify(newStore));
    }, 1000);

    export const save = ({ get }: { get: Getter; }) => saveDebounced(get);
}
