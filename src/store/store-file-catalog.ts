import { atom } from "jotai";
import { Catalog } from "./manifest";
import { catalogTestNames } from "@/assets/tests/23-0414/test-field-catelog";

export const FieldCatalogItemsAtom = atom<Catalog.Name[]>(catalogTestNames);

export function getCatalogName(catalog: Catalog.Name[], needPsw: boolean | undefined, dbid: string | undefined): { name: string; names: string[]; } {
    console.log('catalog', catalog);
    return {
        name: '',
        names: catalog.filter((item) => !!item.password === !!needPsw).map((item) => item.dispname),
    };
}

export const FieldCatalogItemsByTypeAtom = atom(
    (get) => (needPsw: boolean) => {
        const all = get(FieldCatalogItemsAtom);
        const rv = all.filter((item) => !!item.password === needPsw).map((item) => item.dispname);
        return rv;
    }
);
