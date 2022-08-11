import { PrimitiveAtom, WritableAtom } from "jotai";

export type FileUsState = {
    isGroupAtom: PrimitiveAtom<boolean>, // this fileUs selected for bulk group operation
    isCurrentAtom: PrimitiveAtom<boolean>, // this fileUs is current and shown in the right panel
};

export type FileUsStats = {
    domain?: string;
    isWeb: boolean;
    isChrome: boolean;
    isFCat: boolean;
    isCustomization: boolean;
    url?: string;
    title?: string;
    isSubFolder?: boolean;  // Now it's a simple check to see if the path is in front of the filename.
    subFolder?: string;     // This is now the full path available from the browser, i.e. not a subfolder.
    dateCreated?: string;
    dateModified?: string;
};

export type FileUs = {
    id: string;
    idx: number;            // index in the loaded list wo/ counting on filters, i.e. absolute index
    fname: string;          // filename
    fpath: string;          // file relative path to the dropped folder
    fmodi: number;          // lastModified
    modified: number;       // last modified
    size: number;           // file size
    raw?: string;           // raw manifest as it was loaded
    mani?: Mani.Manifest;   // json raw manifest
    meta?: Meta.Form[],     // meta data on manifest
    fcat?: Catalog.Root;    // field catalog
    file?: File;            // file OS handle
    state: FileUsState;     // local state atoms: is currnet; is selected
    stats: FileUsStats;     // quick access statistics
};

// FileUs

export type FileUsAtomType = WritableAtom<FileUs, FileUs>;

export const enum FormIdx {
    login = 0,              // 0 - login (even if login does not exist)
    cpass,                  // 1 - pchange
    both,                   // 2 - both forms
}

export type FileUsFormData = {
    fileUsAtom: FileUsAtomType;
    formIdx: FormIdx;
};

// Fields selection

export type SelectRowType = {
    field: number;
    form: number;
};

export type SelectRowAtomsType = {
    loginAtom: PrimitiveAtom<SelectRowType>;
    cpassAtom: PrimitiveAtom<SelectRowType>;
};

// Files list size

export const enum UISize {
    normal = 0,
    compact,
    minimal,
}

export const uiSizeNames = ["Normal", "Compact", "Minimal"];

// Sort by

export const enum SortBy {
    index,          // load order, i.e. unsorted
    url,            // domain, and then the rest: winapps, non manifest
    group,          // group by categories and inside by domain
}

export const sortByNames = ["Index", "URL", "Group"];

export const enum Order {
    lowToHigh,      // ascending
    highToLow,      // descending
}

export const orderNames = ["ascending", "descending"];
