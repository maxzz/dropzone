import { atom } from "jotai";
import { CatalogItem } from '@/store/manifest/field-catalog';

import { catalogTestNames } from "@/assets/tests/23-0414/test-field-catelog";
import { buildCatalogMetaFromNames } from "@/store/manifest/meta-data";

export const FldCatItemsAtom = atom<CatalogItem[]>(buildCatalogMetaFromNames(catalogTestNames).items);

export const FldCatTxtItemsAtom = atom<CatalogItem[]>(
    (get) => get(FldCatItemsAtom).filter((item) => !item.password),
);

export const FldCatPswItemsAtom = atom<CatalogItem[]>(
    (get) => get(FldCatItemsAtom).filter((item) => !!item.password),
);

export const FieldCatalogItemAtom = atom(
    (get) => (dbid: string | undefined) => {
        if (dbid) {
            const all = get(FldCatItemsAtom);
            const rv = all.find((item) => item.dbname === dbid);
            return rv;
        }
    }
);
