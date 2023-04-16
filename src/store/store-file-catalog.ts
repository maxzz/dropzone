import { atom } from "jotai";
import { CatalogItem } from "./manifest";
import { catalogTestNames } from "@/assets/tests/23-0414/test-field-catelog";
import { buildCatalogMetaFromNames } from "./manifest/mani-meta";

export const FieldCatalogItemsAtom = atom<CatalogItem[]>(buildCatalogMetaFromNames(catalogTestNames).items);
export const FieldCatalogTxtItemsAtom = atom<CatalogItem[]>((get) => get(FieldCatalogItemsAtom).filter((item) => !item.password));
export const FieldCatalogPswItemsAtom = atom<CatalogItem[]>((get) => get(FieldCatalogItemsAtom).filter((item) => !!item.password));

export const FieldCatalogItemAtom = atom(
    (get) => (dbid: string | undefined) => {
        if (dbid) {
            const all = get(FieldCatalogItemsAtom);
            const rv = all.find((item) => item.dbname === dbid);
            return rv;
        }
    }
);
