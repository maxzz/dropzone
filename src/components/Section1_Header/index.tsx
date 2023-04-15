import React, { useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { busyAtom, doClearFilesAtom, hasFilesAtom } from '@/store';
import { useSpring, a } from '@react-spring/web';
import { IconAppLogoMicroscope, IconRocket, IconTrash } from '@ui/UIIcons';
import { Part0_TopMenu } from './Part0_TopMenu';
import { Part1_DropzoneArea } from './Part1_DropzoneArea';
import { Part3_Filters } from './Part3_Filters';
import { IconMenuHamburger } from '@ui/UIIconSymbols';
//import { PopoverMenu } from '@ui/UIDropdownMenuLaag';
import { keyframes } from '@stitches/react';
import toast from 'react-hot-toast';
import { SimpleToogle } from './SimpleToogle';

const rocketAnimation = keyframes({
    '0%': { transform: 'scale(1) translateY(0px)', opacity: 1 },
    '25%': { transform: 'scale(.7) translateY(-2px)', opacity: 0 },
    '50%': { transform: 'scale(1) translateY(2px)', opacity: 0.5 },
    '70%': { transform: 'scale(.8) translateY(0px)', opacity: 0.7 },
});

function BusyIndicator() {
    const busyText = useAtomValue(busyAtom);
    const styles = useSpring({ opacity: busyText ? 1 : 0, config: { duration: 1250 } });
    return (
        <a.div style={styles} className="grid md:flex md:space-x-1">
            {/* Busy icon animation */}
            <IconRocket
                className="ml-2 w-5 h-5 -mt-6 md:mt-0"
                style={{ animation: busyText ? `${rocketAnimation} 1.2s infinite` : '' }}
            />
            {/* Busy explanation text */}
            <div
                className={`text-xs text-green-400 rotate-90 ${busyText ? 'translate-x-[-3px]' : ''} translate-y-5 md:translate-x-0 md:translate-y-0 md:rotate-0`}
                style={{ transition: 'opacity 1.2s 1s' }}
            >
                {busyText}
            </div>
        </a.div>
    );
}

function LeftHeader() {
    const hasFiles = useAtomValue(hasFilesAtom);
    const clearFiles = useSetAtom(doClearFilesAtom);
    return (
        <div className="flex-1 flex items-center my-0.5">
            <Part1_DropzoneArea />

            {hasFiles && <>
                <div className="px-2 self-stretch border-primary-500 bg-primary-600 border-l rounded-none flex items-center justify-center cursor-pointer">
                    <Part0_TopMenu icon={<IconMenuHamburger className="p-1 w-8 h-8 rounded hover:bg-primary-700" />} />
                </div>

                <button className="px-2 self-stretch border-l rounded-none border-primary-500 bg-primary-600 flex items-center justify-center">
                    <IconTrash className="w-8 h-8 p-2 rounded hover:bg-red-500 active:scale-[.97]" onClick={() => clearFiles()} />
                </button>

                {/* <PopoverMenu /> */}
                <BusyIndicator />
            </>}
        </div>
    );
}

function AppLogo() {
    function doClick(event: React.MouseEvent) {
        event.stopPropagation();
        if (event.ctrlKey) {
            window.open('https://github.com/maxzz/dropzone', '_blank');
        } else {
            toast('again', { style: { backgroundColor: 'tomato' } });
        }
    }
    const title = "Ctrl+Click - Open source code at GitHub\nApp build version: __BUILD_DATE__";
    return (
        <IconAppLogoMicroscope className="w-7 h-7 mx-4 text-primary-300 cursor-pointer" title={title} onClick={doClick} />
    );
}

export function Section1_Header(props: React.HTMLAttributes<HTMLElement>) {
    return (
        <header {...props}>
            <div className={`min-h-[40px] flex justify-between bg-primary-700 text-primary-200 ring-1 ring-primary-500 rounded`}>
                <LeftHeader />

                <SimpleToogle />

                {/* Right header */}
                <div className="flex items-center justify-end">
                    <Part3_Filters className="flex-1" />
                    <AppLogo />
                </div>
            </div>
        </header>
    );
}
