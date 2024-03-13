import { atom } from 'jotai';
import { Order, SortBy } from "@/store/store-types/4-file-list-sort-by";
import { FileUsAtomType } from "@/store/store-types/0-file-us-type";
import { filesAtom } from './0-files-atom';
import { createRegexByFilter, isAnyCap, isAnyCls, isAnyWeb, isAnyWhy, isEmpty, isManual, useFileUsByFilter } from '../../store-utils';
import { busyAtom, orderAtom, searchFilterData, showManiAtoms, sortByAtom } from '../atoms-ui-state';

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
