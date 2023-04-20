import React from 'react';
import { IconMenuHamburger } from '@ui/icons';
import { FileUsAtomType } from '@/store';
import { ButtonCardEdit, ButtonCardOpenUrl } from './caption-buttons';
import { CardTitleMenu } from './menu';

const iconMenuHamburgerClasses = 'w-8 h-8 p-1 stroke-[0.8] hover:bg-primary-700 rounded opacity-60 hover:opacity-100 active:scale-[.97] outline-none focus:ring-1 ring-primary-400';

export function Body_CaptionActions({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    return (
        <div className="flex items-center">
            <ButtonCardEdit fileUsAtom={fileUsAtom} formIdx={0} />
            <ButtonCardOpenUrl fileUsAtom={fileUsAtom} />

            <CardTitleMenu fileUsAtom={fileUsAtom} icon={<IconMenuHamburger className={iconMenuHamburgerClasses} />} />
        </div>
    );
}
