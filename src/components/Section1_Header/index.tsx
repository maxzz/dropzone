import React, { useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { doClearFilesAtom, fldCatOpenAtom, hasFilesAtom } from '@/store';
import { IconTrash } from '@ui/UIIcons';
import { Part0_TopMenu } from './Part0_TopMenu';
import { Part1_DropzoneArea } from './Part1_DropzoneArea';
import { Part3_Filters } from './Part3_Filters';
import { IconCatalog, IconMenuHamburger } from '@ui/UIIconSymbols';
//import { PopoverMenu } from '@ui/UIDropdownMenuLaag';
import { SimpleToogle } from './SimpleToogle';
import { AppLogo, BusyIndicator } from './header-controls';

const buttonClasses = "px-2 self-stretch border-primary-500 bg-primary-600 border-l rounded-none flex items-center justify-center";

function MenuTrigger() {
    return (
        <div className={`${buttonClasses} cursor-pointer`}>
            <Part0_TopMenu icon={<IconMenuHamburger className="p-1 w-8 h-8 hover:bg-primary-700 rounded" />} />
        </div>
    );
}

function FldCatTrigger() {
    const setOpen = useSetAtom(fldCatOpenAtom);
    return (
        <button className={buttonClasses}>
            <IconCatalog className="p-2 w-8 h-8 hover:bg-red-500 rounded active:scale-[.97]" onClick={() => setOpen(v => !v)} />
        </button>
    );
}

function ClearLoadedTrigger() {
    const clearFiles = useSetAtom(doClearFilesAtom);
    return (
        <button className={buttonClasses}>
            <IconTrash className="p-2 w-8 h-8 hover:bg-red-500 rounded active:scale-[.97]" onClick={() => clearFiles()} />
        </button>
    );
}

function TopMenuItems() {
    const hasFiles = useAtomValue(hasFilesAtom);
    return (<>
        {hasFiles &&
            <>
                <MenuTrigger />
                <FldCatTrigger />
                <ClearLoadedTrigger />
                {/* <PopoverMenu /> */}
            </>
        }
    </>);
}

export function Section1_Header(props: React.HTMLAttributes<HTMLElement>) {
    return (
        <header {...props}>
            <div className={`min-h-[40px] flex justify-between bg-primary-700 text-primary-200 ring-1 ring-primary-500 rounded`}>
                <div className="flex-1 flex items-center my-0.5">
                    <Part1_DropzoneArea />
                    <TopMenuItems />
                    <BusyIndicator />
                </div>

                {/* OK but no need now */}
                {/* <SimpleToogle /> */}

                {/* Right header */}
                <div className="flex items-center justify-end">
                    <Part3_Filters className="flex-1" />
                    <AppLogo />
                </div>
            </div>
        </header>
    );
}
