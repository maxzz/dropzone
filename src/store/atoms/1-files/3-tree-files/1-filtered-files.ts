import { atom } from 'jotai';
import { filesAtom } from '../0-files-atom';
import { FileUsAtomType } from "@/store/store-types";
import { useFileUsByFilter } from '@/store/store-utils';
import { createRegexByFilter } from "@/store/store-utils/3-filters";
import { isAnyCap, isAnyCls, isAnyWeb, isAnyWhy, isEmpty, isManual } from 'pm-manifest';
import { busyAtom, orderAtom, searchFilterData, showManiAtoms, sortByAtom } from '../../9-ui-state';
import { sortResult } from './2-filtered-sort';

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

        const rv = files.filter(
            (fileAtom: FileUsAtomType) => {
                const fileUs = get(fileAtom);
                const mani = fileUs.mani;
                const meta = fileUs.meta;

                if (capOnly) {
                    return isAnyCap(mani, regex);
                }

                if (clsOnly) {
                    return isAnyCls(mani, regex);
                }

                const isWeb = isAnyWeb(meta);
                if ((winOnly && isWeb) || (webOnly && !isWeb) || (whyOnly && !isAnyWhy(meta))) {
                    return false;
                }

                let useItNow = isEmpty(meta) ? showEmpty : isManual(meta) ? showManual : showNormal;
                if (useItNow && regex) {
                    useItNow = useFileUsByFilter(fileUs, regex);
                }
                return useItNow;
            }
        );

        const sortBy = get(sortByAtom);
        const order = get(orderAtom);

        sortResult(sortBy, order, rv, get);

        return rv;
    }
);
