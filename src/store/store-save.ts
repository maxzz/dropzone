import { Getter } from 'jotai';
import { debounce } from '@/utils/debounce';
import { LocalStorage } from './store-localstorage';
import { splitPaneAtom } from './store-ui-state';

// Local storage

export namespace LocalStorageSave {
    export const saveDebounced = debounce(function _save(get: Getter) {
        let newStore: LocalStorage.Store = {
            vSplitPos: get(splitPaneAtom),
        };
        localStorage.setItem(LocalStorage.KEY, JSON.stringify(newStore));
    }, 1000);

    export function save({ get }: { get: Getter; }) {
        saveDebounced(get);
    }
}
