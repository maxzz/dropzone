import React from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { showEmptyManiAtom, showManualManiAtom, showNormalManiAtom, totalEmptyManiAtom, totalManualManiAtom, totalNormalManiAtom } from '../store/store';
import LabeledSwitch from './UI/UiSwitch';
import { DropzoneArea } from './Dropzone';

function LabeWithNumber({ label, atomCnt }: { label: string; atomCnt: PrimitiveAtom<number>; }) {
    const [total] = useAtom(atomCnt);
    return (
        <div className="ml-2 flex items-center">
            <div className="inline-block">{label}</div>
            <div className="inline-block ml-1 pb-3">{total}</div>
        </div>
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

function Header(props: React.HTMLAttributes<HTMLElement>) {
    return (
        <header className="" {...props}>
            <DropzoneArea>
                <div className="p-2 sm:p-0 flex flex-col sm:flex-row items-end sm:items-center space-x-2 space-y-2 sm:space-y-0 text-sm text-gray-200">
                    <AppFilter  atomShow={showNormalManiAtom} atomCnt={totalNormalManiAtom} label="Normal" title="Show normal mode manifests" />
                    <AppFilter  atomShow={showManualManiAtom} atomCnt={totalManualManiAtom} label="Manual" title="Show manual mode manifests" />
                    <AppFilter  atomShow={showEmptyManiAtom} atomCnt={totalEmptyManiAtom} label="Empty" title="Show excluded manifests" />
                </div>
            </DropzoneArea>
        </header>
    );
}

export default Header;
