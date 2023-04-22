import { atom } from "jotai";
import { CatalogItem } from '@/store/manifest/field-catalog';
import { FieldCatalogItemAtom, FldCatPswItemsAtom, FldCatTxtItemsAtom } from "./atoms-file-catalog";

// MRU - most recently used items

const mruSize = 7;

const mruFldCatTxtItemsAtom = atom(
    (get) => {
        let all = get(FldCatTxtItemsAtom);
        all = all.slice(0, mruSize);
        //console.log('all txt', mruToString(all));
        return all;
    },
);

const mruFldCatPswItemsAtom = atom(
    (get) => {
        let all = get(FldCatPswItemsAtom);
        all = all.slice(0, mruSize);
        //console.log('all psw', mruToString(all));
        return all;
    },
);

function deleteMruWItem(mru: CatalogItem[], delItem: CatalogItem): CatalogItem[] {
    return mru.filter((item) => item.uuid !== delItem.uuid);
}

function buildMruWItem(mru: CatalogItem[], item: CatalogItem | undefined): CatalogItem[] {
    let rv = mru;
    if (item) {
        rv = deleteMruWItem(mru, item);
        rv.unshift(item);
        rv.length > mruSize && rv.pop();
    }
    return rv;
}

export const getMruFldCatForItemAtom = atom(
    (get) => (isPsw: boolean | undefined, dbname: string | undefined) => {
        const catalogItem = get(FieldCatalogItemAtom)(dbname);
        let catalogItemsByType = get(isPsw ? mruFldCatPswItemsAtom : mruFldCatTxtItemsAtom);
        catalogItemsByType = buildMruWItem(catalogItemsByType, catalogItem);
        return {
            catalogItemsByType,
            catalogItem,
        };
    }
);
