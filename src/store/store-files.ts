import { atom } from 'jotai';
import { uuid } from '@/utils/uuid';
import { FileUs, FileUsAtomType, FileUsStats, Order, SortBy } from './store-types';
import { buildManiMetaForms, parseManifest } from './manifest';
import { createRegexByFilter, delay, fileUsStats, isAnyCap, isAnyCls, isAnyWeb, isAnyWhy, isEmpty, isManual, textFileReader, useFileUsByFilter } from './store-utils';
import { busyAtom, orderAtom, rightPanelData, searchFilterData, showMani, sortByAtom, totalMani, _foldAllCardsAtom } from './store-ui-state';

// Files

export const filesAtom = atom<FileUsAtomType[]>([]);

export const setFilesAtom = atom(
    null,
    (get, set, accepterFiles: File[]) => {
        const dropped: FileUsAtomType[] = accepterFiles.filter((file) => file.size).map((file, idx) => {
            const path = ((file as any).path as string || '').replace(/^\//, '').split(/[\\\/]/);
            path.pop(); // remove file name as the last item
            const at: FileUs = {
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
            return atom<FileUs>(at);
        });
        set(_foldAllCardsAtom, -1);
        set(filesAtom, dropped);
        set(updateCacheAtom);
        set(rightPanelData.panelAtom, undefined);
    }
);

export const doClearFilesAtom = atom(
    null,
    (get, set) => {
        set(filesAtom, []);
        set(rightPanelData.panelAtom, undefined);
        set(totalMani.normalAtom, 0);
        set(totalMani.manualAtom, 0);
        set(totalMani.emptyAtom, 0);
    }
);

export const filteredAtom = atom<FileUsAtomType[]>(
    (get) => {
        const { regex, winOnly, webOnly, whyOnly, capOnly, clsOnly } = createRegexByFilter(get(searchFilterData.textAtom), get(searchFilterData.caseSensitiveAtom));

        const showNormal = get(showMani.normalAtom);
        const showManual = get(showMani.manualAtom);
        const showEmpty = get(showMani.emptyAtom);

        const files = get(filesAtom);
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
        if (sortBy !== SortBy.index) {
            const order = get(orderAtom);

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

const updateCacheAtom = atom(
    null,
    async (get, set) => {
        set(totalMani.normalAtom, 0);
        set(totalMani.manualAtom, 0);
        set(totalMani.emptyAtom, 0);
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
                        const res = parseManifest(raw);
                        mani = res.mani;
                        fcat = res.fcat;
                        meta = buildManiMetaForms(mani);
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
                        set(totalMani.emptyAtom, ++total.empty);
                    } else if (isManual(forNewAtom)) {
                        set(totalMani.manualAtom, ++total.manual);
                    } else {
                        set(totalMani.normalAtom, ++total.normal);
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
