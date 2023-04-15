import { atom } from "jotai";
import { Catalog } from "./manifest";
import { catalogTestNames } from "@/assets/tests/23-0414/test-field-catelog";
import { buildCatalogMetaFromNames } from "./manifest/mani-functions";

export const FieldCatalogItemsAtom = atom<Catalog.Name[]>(buildCatalogMetaFromNames(catalogTestNames).items);
console.log('--all1', catalogTestNames);

export function getCatalogName(catalog: Catalog.Name[], needPsw: boolean | undefined, dbid: string | undefined): { name: string; names: string[]; } {
    return {
        name: '',
        names: catalog.filter((item) => !!item.password === !!needPsw).map((item) => item.dispname),
    };
}

export const FieldCatalogItemsByTypeAtom = atom(
    (get) => (needPsw: boolean) => {
        const all = get(FieldCatalogItemsAtom);
        console.log('--all2', all);
        const rv = all.filter((item) => !!item.password === needPsw);
        return rv;
    }
);

export const FieldCatalogItemAtom = atom(
    (get) => (needPsw: boolean, dbid: string) => {
        const all = get(FieldCatalogItemsByTypeAtom);
        const rv = all(needPsw);
        return rv;
    }
);
