import { type PrimitiveAtom, type WritableAtom } from "jotai";
import { type CatalogFile, type Mani, type Meta } from "../manifest";

export type FileUsUiState = {
    isGroupAtom: PrimitiveAtom<boolean>;    // this fileUs selected for bulk group operation
    isCurrentAtom: PrimitiveAtom<boolean>;  // this fileUs is current and shown in the right panel
};

export type FileUsStats = {
    domain?: string;                    // fileUs.meta?.[0]?.disp.domain

    isWeb: boolean;                     // is web apploication
    isChrome: boolean;                  // is web apploication and not IE; isWeb && !fileUs.meta?.[0]?.disp.isIe
    isFCat: boolean;                    // is field catalog
    isCustomization: boolean;           // !fileUs.meta?.length && !!fileUs.mani?.options

    url?: string;                       // loginForm?.detection.web_ourl
    title?: string;                     // loginForm?.options.choosename
    
    isSubFolder?: boolean;              // Now it's a simple check to see if the path is in front of the filename.
    subFolder?: string;                 // This is now the full path available from the browser, i.e. not a subfolder.
    
    dateCreated?: string;               // TimeUtils.dpTimeToShow(fileUs.mani?.descriptor?.created)
    dateModified?: string;              // TimeUtils.dpTimeToShow(fileUs.mani?.descriptor?.modified)
};

export type ParsedSrc = {
    mani: Mani.Manifest | undefined;    // for manifest raw json
    meta: Meta.Form[] | undefined;      // for manifest file parsed content and meta forms
    fcat: CatalogFile.Root | undefined; // for field catalog file parsed content
    stats: FileUsStats;                 // quick access statistics
};

export type FileContent = {
    unid: string;                       // unique number ID (as relative time from the start of the app).
    idx: number;                        // index in the loaded list wo/ counting on filters, i.e. absolute index

    fname: string;                      // filename
    fpath: string;                      // file relative path to the dropped folder
    fmodi: number;                      // file.lastModified
    size: number;                       // file size
    raw?: string;                       // raw manifest as it was loaded
}

export type FileUs = FileContent & {
    parsedSrc: ParsedSrc;               // parsed content from the file
    uiState: FileUsUiState;             // local state atoms: is currnet; is selected

    file?: File;                        // file OS handle
};

export type FileUsAtomType = WritableAtom<FileUs, [FileUs], void>;
