import React from 'react';
import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { showMani, totalMani } from '@/store';
import { LabeledSwitch } from '@ui/UiSwitch';
import { Part2_FilterSearch } from './Part2_FilterSearch';

function LabeWithNumber({ label, atomCnt }: { label: string; atomCnt: PrimitiveAtom<number>; }) {
    const total = useAtomValue(atomCnt);
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

function ManiFilter({ atomShow, atomCnt, label, title }: { atomShow: PrimitiveAtom<boolean>, atomCnt: PrimitiveAtom<number>, label: string, title: string; }) {
    const [show, setShow] = useAtom(atomShow);
    return (
        <LabeledSwitch value={show} onChange={() => setShow(!show)} title={title}>
            <LabeWithNumber label={label} atomCnt={atomCnt} />
        </LabeledSwitch>
    );
}

export function Part3_Filters() {
    return (
        <div className="flex-1 p-2 md:p-0 flex flex-col md:flex-row items-end justify-end md:items-center space-x-2 space-y-2 md:space-y-0 text-sm text-gray-200">
            <Part2_FilterSearch />
            <ManiFilter atomShow={showMani.normalAtom} atomCnt={totalMani.normalAtom} label="Normal" title="Show normal mode manifests" />
            <ManiFilter atomShow={showMani.manualAtom} atomCnt={totalMani.manualAtom} label="Manual" title="Show manual mode manifests" />
            <ManiFilter atomShow={showMani.emptyAtom} atomCnt={totalMani.emptyAtom} label="Empty" title="Show excluded manifests" />
        </div>
    );
}
