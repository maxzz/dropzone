import React from 'react';
import { useAtom } from 'jotai';
import { busyAtom, clearFilesAtom } from '../../store/store';
import { IconAppLogoMicroscope, IconRocket, IconTrash } from '../UI/UiIcons';
import DropzoneArea from './Dropzone';
import TopMenu from './TopMenu';
import toast from 'react-hot-toast';
import { useSpring, a } from '@react-spring/web';
import { IconMenuHamburger } from '../UI/UIIconsSymbolsDefs';
import { PopoverMenu } from '../UI/UIDropdownMenuLaag';
import { keyframes } from '@stitches/react';
import Filters from './Filters';

import { BUILD_DATE } from '../../utils/utils-build';
console.log({'b': BUILD_DATE});


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

function LeftHeader() {
    const [files, clearFiles] = useAtom(clearFilesAtom);
    const total = !!files.length;
    return (
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
    );
}

function HeaderBar(props: React.HTMLAttributes<HTMLElement>) {
    //const buildDate = __BUILD_DATE__;

    return (
        <header className="" {...props}>
            <div className={`min-h-[40px] flex justify-between bg-gray-700 text-gray-100 ring-2 ring-gray-50 rounded-md`}>
                <LeftHeader />

                {/* Right header */}
                <div className="flex-1 flex items-center justify-end">
                    <Filters />
                    <IconAppLogoMicroscope
                        className="w-7 h-7 mx-4"
                        title="__BUILD_DATE__"
                        onClick={(event) => {
                            event.stopPropagation(); toast('again', { style: { backgroundColor: 'tomato' } });
                        }} />
                </div>

            </div>
        </header>
    );
}

export default HeaderBar;
