import React from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { busyAtom, clearFilesAtom, showEmptyManiAtom, showManualManiAtom, showNormalManiAtom, totalEmptyManiAtom, totalManualManiAtom, totalNormalManiAtom } from '../store/store';
import { IconAppLogo, IconMenuHamburger, IconRocket, IconTrash } from './UI/UiIcons';
import DropzoneArea from './Dropzone';
import LabeledSwitch from './UI/UiSwitch';
import TopMenu from './TopMenu';
import toast from 'react-hot-toast';
import { useSpring, a } from '@react-spring/web';

function BusyIndicator() {
    const [busy] = useAtom(busyAtom);
    const styles = useSpring({ opacity: busy ? 1 : 0, config: { duration: 1250 } });
    return (
        <a.div style={styles} className="flex items-center">
            <IconRocket className="ml-2 w-5 h-5" />
            <div className={`ml-1 text-xs text-green-400`} style={{ transition: 'opacity .5s 1s' }}>Parsing...</div>
        </a.div>
    );
}

function LeftInfoBar({ children }: { children?: React.ReactNode; }) {
    const [files, clearFiles] = useAtom(clearFilesAtom);
    const total = !!files.length;
    return (
        <div className={`min-h-[40px] flex justify-between bg-gray-700 text-gray-100 ring-2 ring-gray-50 rounded-md`}>

            {/* Left header */}
            <div className="flex items-center my-0.5">
                <DropzoneArea />

                {total && <>
                    <div className="px-2 self-stretch border-l rounded-none border-gray-500 bg-gray-600 flex items-center justify-center cursor-pointer">
                        <TopMenu icon={<IconMenuHamburger className="p-1 w-8 h-8 rounded hover:bg-gray-700" />} />
                    </div>

                    <button className="px-2 self-stretch border-l rounded-none border-gray-500 bg-gray-600 flex items-center justify-center">
                        <IconTrash className="w-8 h-8 p-2 rounded hover:bg-red-500 active:scale-[.97]" onClick={() => clearFiles()} />
                    </button>

                    <BusyIndicator />
                </>}
            </div>

            {/* Right header */}
            <div className="flex items-center justify-between">
                {children}

                <div className="w-7 h-7 mx-4" onClick={(event) => { event.stopPropagation(); toast('again'); }}>
                    <IconAppLogo />
                </div>
            </div>
        </div>
    );
}

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
            <LeftInfoBar>
                <div className="p-2 sm:p-0 flex flex-col sm:flex-row items-end sm:items-center space-x-2 space-y-2 sm:space-y-0 text-sm text-gray-200">
                    <AppFilter atomShow={showNormalManiAtom} atomCnt={totalNormalManiAtom} label="Normal" title="Show normal mode manifests" />
                    <AppFilter atomShow={showManualManiAtom} atomCnt={totalManualManiAtom} label="Manual" title="Show manual mode manifests" />
                    <AppFilter atomShow={showEmptyManiAtom} atomCnt={totalEmptyManiAtom} label="Empty" title="Show excluded manifests" />
                </div>
            </LeftInfoBar>
        </header>
    );
}

export default Header;
