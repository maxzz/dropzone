import { atom } from 'jotai';
import { FileUs } from "@/store/store-types/0-file-us-type";
import { filesAtom } from './0-files-atom';
import { buildCatalogMeta, buildManiMetaForms, CatalogFile, Mani, Meta, parseXMLFile } from '../../manifest';
import { fileUsStats, isEmpty, isManual, textFileReader } from '../../store-utils';
import { busyAtom, totalManiAtoms } from '../atoms-ui-state';
import { fldCatItemsAtom } from '../field-catalog/all-items';

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
                const file = get(fileAtom);

                if (file.file && !file.raw) {
                    const raw = await textFileReader(file.file);

                    let mani: Mani.Manifest | undefined;
                    let fcat: CatalogFile.Root | undefined;
                    let meta: Meta.Form[] | undefined;
                    try {
                        const res = parseXMLFile(raw);
                        mani = res.mani;
                        fcat = res.fcat;
                        meta = buildManiMetaForms(mani);

                        if (fcat) {
                            const { items } = buildCatalogMeta(fcat); //TODO: we need to load multiple catalog files
                            set(fldCatItemsAtom, items);
                        }
                    } catch (error) {
                        console.log('%ctm parse error', 'color: red', error, '\n', file.fname, raw);
                    }

                    const forNewAtom: FileUs = {
                        ...file,
                        raw,
                        mani,
                        fcat,
                        meta,
                    };
                    forNewAtom.stats = fileUsStats(forNewAtom);
                    set(fileAtom, forNewAtom);

                    if (isEmpty(forNewAtom)) {
                        set(totalManiAtoms.emptyAtom, ++total.empty);
                    } else if (isManual(forNewAtom)) {
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
