import { Catalog } from "./mani";

// Catalog

export type CatalogItem =
    Catalog.Name
    & {
        index: number; // index in loaded file.
        uuid: string;  // local (in memory only) unique ID.
    };

export type FieldCatalog = {
    items: CatalogItem[];
};
