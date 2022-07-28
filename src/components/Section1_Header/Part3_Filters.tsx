import React from 'react';
import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { hasFilesAtom, showMani, totalMani } from '@/store';
import { LabeledSwitch } from '@ui/UiSwitch';
import { Part2_FilterSearch } from './Part2_FilterSearch';
import { classNames } from '@/utils/classnames';
import { a, useSpring } from '@react-spring/web';

function LabeWithNumber({ label, counterAtom }: { label: string; counterAtom: PrimitiveAtom<number>; }) {
    const total = useAtomValue(counterAtom);
    return (
        <div className="ml-2 flex items-center">
            <div className="inline-block">{label}</div>
            <div className="inline-block ml-1 pb-3">{total}</div>
        </div>
        // version w/ frames
        // <div className="ml-2 flex items-center">
        //     <div className="inline-block">{label}</div>
        //     <div className="inline-block ml-1 pb-3"><div className="border leading-3 text-[9px] px-1 py-[2px] rounded">{total}</div></div>
        // </div>
    );
}

function ManiFilter({ showAtom, counterAtom, label, title }: { showAtom: PrimitiveAtom<boolean>, counterAtom: PrimitiveAtom<number>, label: string, title: string; }) {
    const [show, setShow] = useAtom(showAtom);
    return (
        <LabeledSwitch value={show} onChange={() => setShow(!show)} title={title}>
            <LabeWithNumber label={label} counterAtom={counterAtom} />
        </LabeledSwitch>
    );
}

export function Part3_Filters() {
    const hasFiles = useAtomValue(hasFilesAtom);
    const styles = useSpring({ opacity: hasFiles ? 1 : 0 });
    return (
        <a.div style={styles} className={classNames(
            "flex-1 p-2 md:p-0 flex flex-col md:flex-row items-end justify-end md:items-center space-x-2 space-y-2 md:space-y-0 text-sm text-gray-200",
            //hasFiles ? "opacity-100" : "opacity-0",
        )}>
            <Part2_FilterSearch />
            <ManiFilter showAtom={showMani.normalAtom} counterAtom={totalMani.normalAtom} label="Normal" title="Show normal mode manifests" />
            <ManiFilter showAtom={showMani.manualAtom} counterAtom={totalMani.manualAtom} label="Manual" title="Show manual mode manifests" />
            <ManiFilter showAtom={showMani.emptyAtom} counterAtom={totalMani.emptyAtom} label="Empty" title="Show excluded manifests" />
        </a.div>
    );
}
