import { atom } from "jotai";
import { Catalog } from "./manifest";
import { catalogTestNames } from "@/assets/tests/23-0414/test-field-catelog";

export const FieldCatalogItemsAtom = atom<Catalog.Name[]>(catalogTestNames);

export function getCatalogName(catalog: Catalog.Name[], isPsw: boolean | undefined, dbid: string | undefined): { name: string; names: string[]; } {
    return {
        name: '',
        names: catalog.filter((item) => item.password === isPsw).map((item) => item.dispname),
    };
}
