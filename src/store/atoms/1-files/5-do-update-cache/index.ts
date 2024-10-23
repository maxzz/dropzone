import { atom } from 'jotai';
import { FileContent, FileUs, FileUsStats, ParsedSrc } from "@/store/store-types";
import { filesAtom } from '../0-files-atom';
import { buildCatalogMeta, buildManiMetaForms, parseXMLFile } from '@/store/manifest';
import { fileUsStats } from "@/store/store-utils/5-file-us-stats";
import { isEmpty, isManual } from "pm-manifest";
import { textFileReader } from "@/store/store-utils/1-text-file-reader";
import { fldCatItemsAtom } from '../../8-field-catalog/0-all-items-atom';
import { busyAtom, totalManiAtoms } from '../../9-ui-state';

// Cache

export const doUpdateCacheAtom = atom(
    null,
    async (get, set) => {
        set(totalManiAtoms.normalAtom, 0);
        set(totalManiAtoms.manualAtom, 0);
        set(totalManiAtoms.emptyAtom, 0);
        set(busyAtom, 'Parsing...');

        const total = { normal: 0, manual: 0, empty: 0 };

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

                    set(fileAtom, forNewAtom);

                    if (isEmpty(forNewAtom.parsedSrc.meta)) {
                        set(totalManiAtoms.emptyAtom, ++total.empty);
                    } else if (isManual(forNewAtom.parsedSrc.meta)) {
                        set(totalManiAtoms.manualAtom, ++total.manual);
                    } else {
                        set(totalManiAtoms.normalAtom, ++total.normal);
                    }

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
        rv.meta = buildManiMetaForms(res.mani);

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

    rv.stats = fileUsStats(fileCnt, rv);
    return rv;
}
