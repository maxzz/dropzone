import { atom } from "jotai";
import { CatalogItem } from "./manifest";
import { catalogTestNames } from "@/assets/tests/23-0414/test-field-catelog";
import { buildCatalogMetaFromNames } from "./manifest/meta-data";

export const FldCatItemsAtom = atom<CatalogItem[]>(buildCatalogMetaFromNames(catalogTestNames).items);
export const FldCatTxtItemsAtom = atom<CatalogItem[]>((get) => get(FldCatItemsAtom).filter((item) => !item.password));
export const FldCatPswItemsAtom = atom<CatalogItem[]>((get) => get(FldCatItemsAtom).filter((item) => !!item.password));

export const FieldCatalogItemAtom = atom(
    (get) => (dbid: string | undefined) => {
        if (dbid) {
            const all = get(FldCatItemsAtom);
            const rv = all.find((item) => item.dbname === dbid);
            return rv;
        }
    }
);

const mruSize = 7;

export const mruFldCatTxtItemsAtom = atom(
    (get) => {
        let all = get(FldCatTxtItemsAtom);
        all = all.slice(0, mruSize);
        console.log('all txt', JSON.stringify(all.map((item) => `${JSON.stringify(item)}\n`), null, 4));
        return all;
    },
);

export const mruFldCatPswItemsAtom = atom(
    (get) => {
        let all = get(FldCatPswItemsAtom);
        all = all.slice(0, mruSize);
        console.log('all psw', JSON.stringify(all.map((item) => `${JSON.stringify(item)}\n`), null, 4));
        return all;
    },
);

function deleteMruWItem(mru: CatalogItem[], delItem: CatalogItem): CatalogItem[] {
    return mru.filter((item) => item.uuid !== delItem.uuid);
}

export function buildMruWItem(mru: CatalogItem[], item: CatalogItem | undefined): CatalogItem[] {
    let rv = mru;
    if (item) {
        rv = deleteMruWItem(mru, item);
        console.log('after delete', `\n${JSON.stringify(item)}\n\n`, JSON.stringify(rv.map((item) => `${JSON.stringify(item)}\n`), null, 4));

        rv.unshift(item);
        rv.length > mruSize && rv.pop();

        console.log('buildMruWItem', `\n${JSON.stringify(item)}\n\n`, JSON.stringify(rv.map((item) => `${JSON.stringify(item)}\n`), null, 4));
    }
    return rv;
}
