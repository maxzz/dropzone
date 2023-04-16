import { atom } from "jotai";
import { Catalog, CatalogItem } from "./manifest";
import { catalogTestNames } from "@/assets/tests/23-0414/test-field-catelog";
import { buildCatalogMetaFromNames } from "./manifest/mani-meta";

export const FieldCatalogItemsAtom = atom<CatalogItem[]>(buildCatalogMetaFromNames(catalogTestNames).items);
export const FieldCatalogTxtItemsAtom = atom<CatalogItem[]>((get) => get(FieldCatalogItemsAtom).filter((item) => !item.password));
export const FieldCatalogPswItemsAtom = atom<CatalogItem[]>((get) => get(FieldCatalogItemsAtom).filter((item) => !!item.password));

// export function getCatalogName(catalog: Catalog.Name[], needPsw: boolean | undefined, dbid: string | undefined): { name: string; names: string[]; } {
//     return {
//         name: '',
//         names: catalog.filter((item) => !!item.password === !!needPsw).map((item) => item.dispname),
//     };
// }

// export const FieldCatalogItemsByTypeAtom = atom(
//     (get) => (needPsw: boolean) => {
//         const all = get(FieldCatalogItemsAtom);
//         const rv = all.filter((item) => !!item.password === needPsw);
//         return rv;
//     }
// );

export const FieldCatalogItemAtom = atom(
    (get) => (dbid: string) => {
        const all = get(FieldCatalogItemsAtom);
        const rv = all.find((item) => item.dbname === dbid);
        return rv;
    }
);

export function getFieldCatalogItem(catalogItems: CatalogItem[], dbid: string | undefined) {
    return catalogItems.find((item) => item.dbname === dbid);
}
