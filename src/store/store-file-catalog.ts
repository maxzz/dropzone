import { atom } from "jotai";
import { Catalog } from "./manifest";

export const FieldCatalogItemsAtom = atom<Catalog.Name[]>([]);

export function getCatalogName(catalog: Catalog.Name[], isPsw: boolean | undefined, dbid: string | undefined): { name: string; names: string[]; } {
    return {
        name: '',
        names: catalog.filter((item) => item.password === isPsw).map((item) => item.dispname),
    };
}
