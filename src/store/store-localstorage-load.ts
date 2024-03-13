import { Order, SortBy } from "./store-types/4-file-list-sort-by";
import { UISize } from "./store-types/3-file-list-size";

export namespace LocalStorage {
    export const KEY = 'pmit-01';

    export type Store = {
        vSplitPos: number;
        uiSize: UISize;
        sortBy: SortBy;
        order: Order;
    };

    export let initialData: Store = {
        vSplitPos: 44,
        uiSize: UISize.minimal,
        sortBy: SortBy.url,
        order: Order.lowToHigh,
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
