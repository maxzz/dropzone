import { atom } from "jotai";
import { CatalogItem } from "../manifest";
import { catalogTestNames } from "@/assets/tests/23-0414/test-field-catelog";
import { buildCatalogMetaFromNames } from "../manifest/meta-data";

export const FldCatItemsAtom = atom<CatalogItem[]>(buildCatalogMetaFromNames(catalogTestNames).items);

const FldCatTxtItemsAtom = atom<CatalogItem[]>(
    (get) => get(FldCatItemsAtom).filter((item) => !item.password),
);

const FldCatPswItemsAtom = atom<CatalogItem[]>(
    (get) => get(FldCatItemsAtom).filter((item) => !!item.password),
);

const FieldCatalogItemAtom = atom(
    (get) => (dbid: string | undefined) => {
        if (dbid) {
            const all = get(FldCatItemsAtom);
            const rv = all.find((item) => item.dbname === dbid);
            return rv;
        }
    }
);

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

function mruToString(items: CatalogItem[]) {
    return JSON.stringify(items.map((item) => `${JSON.stringify(item)}\n`), null, 4);
    //console.log('buildMruWItem', `\n${JSON.stringify(item)}\n\n`, mruToString(rv));
}

// Field catalog dialog UI state

export const fldCatOpenAtom = atom(false);
