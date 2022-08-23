import { atom } from "jotai";
import { Catalog } from "./manifest";

// Catalog

export type FieldCatalog = {
    items: Catalog.Name[];
};

export const FieldCatalogItemsAtom = atom<Catalog.Name[]>([]);
