import { atom } from "jotai";
import { CatalogItem } from '@/store/manifest/field-catalog';

import { catalogTestNames } from "@/assets/tests/23-0414/test-field-catelog";
import { buildCatalogMetaFromNames } from "@/store/manifest/meta-data";

export const fldCatItemsAtom = atom<CatalogItem[]>(buildCatalogMetaFromNames(catalogTestNames).items);

export const fldCatTxtItemsAtom = atom<CatalogItem[]>(
    (get) => get(fldCatItemsAtom).filter((item) => !item.password),
);

export const fldCatPswItemsAtom = atom<CatalogItem[]>(
    (get) => get(fldCatItemsAtom).filter((item) => !!item.password),
);

export const fldCatItemAtom = atom(
    (get) => (dbid: string | undefined) => {
        if (dbid) {
            const all = get(fldCatItemsAtom);
            const rv = all.find((item) => item.dbname === dbid);
            return rv;
        }
    }
);
