import React from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { busyAtom, clearFilesAtom, showEmptyManiAtom, showManualManiAtom, showNormalManiAtom, totalEmptyManiAtom, totalManualManiAtom, totalNormalManiAtom } from '../../store/store';
import { IconAppLogo, IconRocket, IconTrash } from '../UI/UiIcons';
import DropzoneArea from './Dropzone';
import LabeledSwitch from '../UI/UiSwitch';
import TopMenu from './TopMenu';
import toast from 'react-hot-toast';
import { useSpring, a } from '@react-spring/web';
import { IconMenuHamburger } from '../UI/UIIconsSymbolsDefs';
import { PopoverMenu } from '../UI/UIDropdownMenuLaag';
import { keyframes } from '@stitches/react';
import Search from './Search';

const rocketAnimation = keyframes({
    '0%': { transform: 'scale(1) translateY(0px)', opacity: 1 },
    '25%': { transform: 'scale(.7) translateY(-2px)', opacity: 0 },
    '50%': { transform: 'scale(1) translateY(2px)', opacity: 0.5 },
    '70%': { transform: 'scale(.8) translateY(0px)', opacity: 0.7 },
});

function BusyIndicator() {
    const [busy] = useAtom(busyAtom); //const busy = 'parsing...';
    const styles = useSpring({ opacity: busy ? 1 : 0, config: { duration: 1250 } });
    return (
        <a.div style={styles} className="grid md:flex md:space-x-1">
            <IconRocket style={{ animation: busy ? `${rocketAnimation} 1.2s infinite` : '' }} className="ml-2 w-5 h-5 -mt-6 md:mt-0" />
            <div
                className={`text-xs text-green-400 rotate-90 ${busy ? 'translate-x-[-3px]' : ''} translate-y-5 md:translate-x-0 md:translate-y-0 md:rotate-0`}
                style={{ transition: 'opacity 1.2s 1s' }}
            >
                {busy}
            </div>
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

                    {/* <PopoverMenu /> */}

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

function HeaderBar(props: React.HTMLAttributes<HTMLElement>) {
    return (
        <header className="" {...props}>
            <LeftInfoBar>
                <div className="p-2 md:p-0 flex flex-col md:flex-row items-end md:items-center space-x-2 space-y-2 md:space-y-0 text-sm text-gray-200">
                    <Search />
                    <AppFilter atomShow={showNormalManiAtom} atomCnt={totalNormalManiAtom} label="Normal" title="Show normal mode manifests" />
                    <AppFilter atomShow={showManualManiAtom} atomCnt={totalManualManiAtom} label="Manual" title="Show manual mode manifests" />
                    <AppFilter atomShow={showEmptyManiAtom} atomCnt={totalEmptyManiAtom} label="Empty" title="Show excluded manifests" />
                </div>
            </LeftInfoBar>
        </header>
    );
}

export default HeaderBar;
