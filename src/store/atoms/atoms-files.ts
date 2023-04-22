import { atom } from 'jotai';
import { uuid } from '@/utils';
import { buildCatalogMeta, buildManiMetaForms, Catalog, Mani, Meta, parseXMLFile } from '../manifest';
import { FileUs, FileUsAtomType, FileUsStats, Order, SortBy } from '../store-types';
import { createRegexByFilter, delay, fileUsStats, isAnyCap, isAnyCls, isAnyWeb, isAnyWhy, isEmpty, isManual, textFileReader, useFileUsByFilter } from '../store-utils';
import { busyAtom, orderAtom, searchFilterData, showManiAtoms, sortByAtom, totalManiAtoms, _foldAllCardsAtom } from './atoms-ui-state';
import { rightPanelData } from './atoms-ui-right-panel';
import { FldCatItemsAtom } from './field-catalog/atoms-file-catalog';

// Files

export const filesAtom = atom<FileUsAtomType[]>([]);

export const doSetFilesAtom = atom(
    null,
    (get, set, accepterFiles: File[]) => {
        const droppedIn: FileUsAtomType[] = accepterFiles
            .filter((file) => file.size)
            .map((file, idx) => {
                const path = ((file as any).path as string || '').replace(/^\//, '').split(/[\\\/]/);
                path.pop(); // remove file name as the last item
                const newItem: FileUs = {
                    id: uuid(),
                    idx,
                    fname: file.name,
                    fpath: path.join('/'),
                    fmodi: (file as any).lastModified || 0,
                    modified: file.lastModified,
                    size: file.size,
                    file: file,
                    state: {
                        isGroupAtom: atom<boolean>(false),
                        isCurrentAtom: atom<boolean>(false),
                    },
                    stats: {} as FileUsStats, // the real one will be assigned after caching content
                };
                return atom<FileUs>(newItem);
            });

        set(_foldAllCardsAtom, -1);
        set(filesAtom, droppedIn);
        set(doUpdateCacheAtom);
        set(rightPanelData.panelAtom, undefined);
    }
);

export const doClearFilesAtom = atom(
    null,
    (get, set) => {
        set(filesAtom, []);
        set(rightPanelData.panelAtom, undefined);
        set(totalManiAtoms.normalAtom, 0);
        set(totalManiAtoms.manualAtom, 0);
        set(totalManiAtoms.emptyAtom, 0);
    }
);

export const filteredAtom = atom<FileUsAtomType[]>(
    (get) => {
        const { regex, winOnly, webOnly, whyOnly, capOnly, clsOnly } = createRegexByFilter(get(searchFilterData.textAtom), get(searchFilterData.caseSensitiveAtom));

        const showNormal = get(showManiAtoms.normalAtom);
        const showManual = get(showManiAtoms.manualAtom);
        const showEmpty = get(showManiAtoms.emptyAtom);

        const files = get(filesAtom);

        const isFilesLoading = !!get(busyAtom);
        if (isFilesLoading) {
            return files;
        }

        let result = files.filter((fileAtom: FileUsAtomType) => {
            const fileUs = get(fileAtom);

            if (capOnly) {
                return isAnyCap(fileUs, regex);
            }

            if (clsOnly) {
                return isAnyCls(fileUs, regex);
            }

            const isWeb = isAnyWeb(fileUs);
            if ((winOnly && isWeb) || (webOnly && !isWeb) || (whyOnly && !isAnyWhy(fileUs))) {
                return false;
            }

            let useItNow = isEmpty(fileUs) ? showEmpty : isManual(fileUs) ? showManual : showNormal;
            if (useItNow && regex) {
                useItNow = useFileUsByFilter(fileUs, regex);
            }
            return useItNow;
        });

        const sortBy = get(sortByAtom);
        const order = get(orderAtom);

        if (sortBy === SortBy.index) {
            if (order === Order.highToLow) {
                result.sort((atomA: FileUsAtomType, atomB: FileUsAtomType) => {
                    const fileUsA = get(atomA);
                    const fileUsB = get(atomB);
                    const a = fileUsA.idx;
                    const b = fileUsB.idx;
                    return a < b ? 1 : a > b ? -1 : 0;
                });
            }
        } else if (sortBy === SortBy.url) {
            result.sort((atomA: FileUsAtomType, atomB: FileUsAtomType) => {
                const fileUsA = get(atomA);
                const fileUsB = get(atomB);
                const a = fileUsA?.stats?.domain || 'zz';
                const b = fileUsB?.stats?.domain || 'zz';
                if (order === Order.lowToHigh) {
                    return a < b ? -1 : a > b ? 1 : 0;
                } else {
                    return a < b ? 1 : a > b ? -1 : 0;
                }
            });
        }

        return result;
    }
);

// Cache

const doUpdateCacheAtom = atom(
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
                    let fcat: Catalog.Root | undefined;
                    let meta: Meta.Form[] | undefined;
                    try {
                        const res = parseXMLFile(raw);
                        mani = res.mani;
                        fcat = res.fcat;
                        meta = buildManiMetaForms(mani);

                        if (fcat) {
                            const { items } = buildCatalogMeta(fcat); //TODO: we need to load multiple catalog files
                            set(FldCatItemsAtom, items);
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
