import { atom } from "jotai";
import { type FileContent, type FileUs, type FileUsStats, type ParsedSrc } from "@/store/store-types";
import { buildManiMetaForms, parseXMLFile } from "@/store/manifest";
import { filesAtom } from "../0-files-atom";
import { createFileUsStats } from "@/store/store-utils/5-create-file-us-stats";
import { textFileReader } from "@/store/store-utils/1-text-file-reader";
import { fldCatItemsAtom } from "../../8-field-catalog/0-all-items-atom";
import { addToTotalManis, busyAtom, clearTotalManis } from "../../9-ui-state";

// Cache

export const doUpdateCacheAtom = atom(
    null,
    async (get, set): Promise<void> => {
        clearTotalManis(set);
        set(busyAtom, 'Parsing...');

        const files = get(filesAtom);

        for (let fileAtom of files) {
            try {
                const fileUsItem = get(fileAtom);

                if (fileUsItem.file && !fileUsItem.fileCnt.raw) {
                    fileUsItem.fileCnt.raw = await textFileReader(fileUsItem.file);
                    fileUsItem.parsedSrc = createParsedData(fileUsItem.fileCnt);

                    const forNewAtom: FileUs = {
                        ...fileUsItem,
                        parsedSrc: createParsedData(fileUsItem.fileCnt),
                    };

                    addToTotalManis(forNewAtom, set);
                    set(fileAtom, forNewAtom);
                    //await delay(1000);
                }
            } catch (error) {
                console.log('read file error', error);
            }
        }

        set(busyAtom, '');
    }
);

function createParsedData(fileCnt: FileContent): ParsedSrc {
    const rv: ParsedSrc = {
        mani: undefined,
        meta: undefined,
        fcat: undefined,
        stats: {} as FileUsStats, // the real one will be assigned after parsing content
    };

    try {
        const res = parseXMLFile(fileCnt.raw || '');
        rv.mani = res.mani;
        rv.fcat = res.fcat;
        rv.meta = buildManiMetaForms(res.mani?.forms);

        if (rv.fcat) {
            /**
             * TODO: later. one per root folder including A, B, C subfolders
             *
            const { items } = buildCatalogMeta(fcat); //TODO: we need to load multiple catalog files
            set(fldCatItemsAtom, items);
            */
        }
    } catch (error) {
        const msg = `tm parse error: ${error}\n${fileCnt.fname}\n${fileCnt.raw}`;
        fileCnt.raw = msg;
        // fileCnt.failed = true; //TODO: we don't have this flag yet, but we need it
        console.error(msg);
    }

    rv.stats = createFileUsStats(fileCnt, rv);
    return rv;
}
