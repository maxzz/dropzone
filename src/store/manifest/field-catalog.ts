import { Catalog } from "./mani";

// Catalog

export type CatalogItem =
    Catalog.Name
    & {
        index: number; // index in loaded file.
        uuid: number;  // local (in memory only) unique ID (not updated through one session).
        mru: number;   // most recently used timestamp (as uuid but updated on each use through one session)
    };

export type FieldCatalog = {
    items: CatalogItem[];
};
