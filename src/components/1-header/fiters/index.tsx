import React, { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { useSpring, a } from '@react-spring/web';
import { hasFilesAtom, showManiAtoms, totalManiAtoms } from '@/store';
import { FilterSearch } from './1-filter-search';
import { FilterManiCounter } from './FilterManiCounter';
import { classNames } from '@/utils';
import { SimpleToogle } from './SimpleToogle';

const containerClasses = "p-2 md:p-0 flex flex-col md:flex-row items-end justify-end md:items-center space-x-2 space-y-2 md:space-y-0 text-sm text-gray-200";

export function Part3_Filters({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const hasFiles = useAtomValue(hasFilesAtom);
    const styles = useSpring({
        opacity: hasFiles ? 1 : 0,
    });
    return (
        <a.div style={styles} className={classNames(containerClasses, className)} {...rest}>
            <FilterSearch />

            <FilterManiCounter showAtom={showManiAtoms.normalAtom} counterAtom={totalManiAtoms.normalAtom} label="Normal" title="Show normal mode manifests" />
            <FilterManiCounter showAtom={showManiAtoms.manualAtom} counterAtom={totalManiAtoms.manualAtom} label="Manual" title="Show manual mode manifests" />
            <FilterManiCounter showAtom={showManiAtoms.emptyAtom} counterAtom={totalManiAtoms.emptyAtom} label="Empty" title="Show excluded manifests" />

            {/* Very good alternative for future use but no need it now */}
            {/* <SimpleToogle /> */}
        </a.div>
    );
}
