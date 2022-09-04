import { Catalog } from "./mani";

// Catalog

export type CatalogItem =
    Catalog.Name
    & {
        index: number; // index in loaded file.
    };

export type FieldCatalog = {
    items: CatalogItem[];
};
