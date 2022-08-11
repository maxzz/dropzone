import { SortBy, UISize } from "./store-types";

export namespace LocalStorage {
    export const KEY = 'pmit-01';

    export type Store = {
        vSplitPos: number;
        uiSize: UISize;
        sortBy: SortBy;
    };

    export let initialData: Store = {
        vSplitPos: 44,
        uiSize: UISize.minimal,
        sortBy: SortBy.url,
    };

    function load() {
        const s = localStorage.getItem(KEY);
        if (s) {
            try {
                let obj = JSON.parse(s) as Store;
                initialData = {...initialData, ...obj};
            } catch (error) {
            }
        }
    }
    load();

} //namespace LocalStorage
