import { PrimitiveAtom, useAtom } from 'jotai';
import React from 'react';
import { showEmptyManiAtom, showManualManiAtom, showNormalManiAtom, totalEmptyManiAtom, totalManualManiAtom, totalNormalManiAtom } from '../../store/store';
import LabeledSwitch from '../UI/UiSwitch';
import Search from './Search';

function LabeWithNumber({ label, atomCnt }: { label: string; atomCnt: PrimitiveAtom<number>; }) {
    const [total] = useAtom(atomCnt);
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

function AppFilter({ atomShow, atomCnt, label, title }: { atomShow: PrimitiveAtom<boolean>, atomCnt: PrimitiveAtom<number>, label: string, title: string; }) {
    const [show, setShow] = useAtom(atomShow);
    return (
        <LabeledSwitch value={show} onChange={() => setShow(!show)} title={title}>
            <LabeWithNumber label={label} atomCnt={atomCnt} />
        </LabeledSwitch>
    );
}

function Filters() {
    return (
        <div className="p-2 md:p-0 flex flex-col md:flex-row items-end md:items-center space-x-2 space-y-2 md:space-y-0 text-sm text-gray-200">
            <Search />
            <AppFilter atomShow={showNormalManiAtom} atomCnt={totalNormalManiAtom} label="Normal" title="Show normal mode manifests" />
            <AppFilter atomShow={showManualManiAtom} atomCnt={totalManualManiAtom} label="Manual" title="Show manual mode manifests" />
            <AppFilter atomShow={showEmptyManiAtom} atomCnt={totalEmptyManiAtom} label="Empty" title="Show excluded manifests" />
        </div>
    );
}

export default Filters;
