import { atom } from "jotai";
import { Catalog } from "./manifest";
import { catalogTestNames } from "@/assets/tests/23-0414/test-field-catelog";
import { buildCatalogMetaFromNames } from "./manifest/mani-meta";

export const FieldCatalogItemsAtom = atom<Catalog.Name[]>(buildCatalogMetaFromNames(catalogTestNames).items);

export function getCatalogName(catalog: Catalog.Name[], needPsw: boolean | undefined, dbid: string | undefined): { name: string; names: string[]; } {
    return {
        name: '',
        names: catalog.filter((item) => !!item.password === !!needPsw).map((item) => item.dispname),
    };
}

export const FieldCatalogItemsByTypeAtom = atom(
    (get) => (needPsw: boolean) => {
        const all = get(FieldCatalogItemsAtom);
        const rv = all.filter((item) => !!item.password === needPsw);
        return rv;
    }
);

// export const FieldCatalogItemAtom = atom(
//     (get) => (dbid: string) => {
//         const all = get(FieldCatalogItemsAtom);
//         const rv = all.find((item) => item.dbname === dbid);
//         return rv;
//     }
// );

export function getFieldCatalogItem(catalogItems: Catalog.Name[], dbid: string | undefined) {
    return catalogItems.find((item) => item.dbname === dbid);
}
