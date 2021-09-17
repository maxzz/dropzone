import React from 'react';
import { useAtom } from 'jotai';
import { showEmptyManiAtom, showManualManiAtom, showNormalManiAtom, totalEmptyManiAtom, totalManualManiAtom, totalNormalManiAtom } from '../store/store';
import LabeledSwitch from './UI/UiSwitch';
import { DropzoneArea } from './Dropzone';

function LabeWithNumber({ label, value }: { label: string; value: number; }) {
    return (
        <div className="ml-2 flex items-center">
            <div className="inline-block">{label}</div>
            <div className="inline-block ml-1 pb-3">{value}</div>
        </div>
    );
}

function AppFilters() {
    const [showNormalMani, setShowNormalMani] = useAtom(showNormalManiAtom);
    const [showManualMani, setShowManualMani] = useAtom(showManualManiAtom);
    const [showEmptyMani, setShowEmptyMani] = useAtom(showEmptyManiAtom);

    const [totalNormalMani] = useAtom(totalNormalManiAtom);
    const [totalManualMani] = useAtom(totalManualManiAtom);
    const [totalEmptyMani] = useAtom(totalEmptyManiAtom);
    return (<>
        <LabeledSwitch label={<LabeWithNumber label={'Normal'} value={totalNormalMani} />} value={showNormalMani} onChange={() => setShowNormalMani(!showNormalMani)} title="Show normal mode manifests" />
        <LabeledSwitch label={<LabeWithNumber label={'Manual'} value={totalManualMani} />} value={showManualMani} onChange={() => setShowManualMani(!showManualMani)} title="Show manual mode manifests" />
        <LabeledSwitch label={<LabeWithNumber label={'Empty'} value={totalEmptyMani} />} value={showEmptyMani} onChange={() => setShowEmptyMani(!showEmptyMani)} title="Show excluded manifests" />
    </>);
}

function Header() {
    return (
        <header className="">
            <DropzoneArea>
                <div className="p-2 sm:p-0 flex flex-col sm:flex-row items-end sm:items-center space-x-2 space-y-2 sm:space-y-0 text-sm text-gray-200">
                    <AppFilters />
                </div>
            </DropzoneArea>
        </header>
    );
}

export default Header;
