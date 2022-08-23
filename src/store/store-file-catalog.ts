import { atom } from "jotai";
import { Catalog } from "./manifest";

// Catalog

export type CatalogItem =
    Catalog.Name
    & {
        index: number; // index in loaded file.
    };

export type FieldCatalog = {
    items: CatalogItem[];
};

export const FieldCatalogItemsAtom = atom<Catalog.Name[]>([]);

export function getCatalogName(catalog: Catalog.Name[], isPsw: boolean | undefined, dbid: string | undefined): { name: string; names: string[]; } {
    return {
        name: '',
        names: catalog.filter((item) => item.password === isPsw).map((item) => item.dispname),
    };
}
