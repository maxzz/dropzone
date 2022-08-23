import { atom } from "jotai";
import { Catalog } from "./manifest";

// Catalog

export type CatalogItem =
    Catalog.Name
    & {
        index: number; // index in loaded file.
    };

export type FieldCatalog = {
    items: Catalog.Name[];
};

export const FieldCatalogItemsAtom = atom<Catalog.Name[]>([]);

export function getCatalogName(catalogNames: string[], isPsw: boolean | undefined, dbid: string | undefined): string {
    return ''; //TODO: get catalog names atom and check
}
