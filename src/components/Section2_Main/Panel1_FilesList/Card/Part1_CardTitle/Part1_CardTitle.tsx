import React, { ReactNode } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { FileUsAtomType, rightPanelData, doSetCurrentCardAtom } from '@/store';
import { CardCaption, CardUsername } from './CardTitleText';
import { classNames } from '@/utils/classnames';
import { CardTitleIcon } from './CardTitleIcon';
import { CardTitleFilename } from './CardTitleFilename';
import { CardTitleAttension } from './CardTitleAttension';

export function CardTitleText({ fileUsAtom, actions }: { fileUsAtom: FileUsAtomType; actions?: ReactNode; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const stats = fileUs?.stats;
    return (<>
        {stats && <>
            {/* Icon and website/app name */}
            <div className="grid grid-cols-[min-content_minmax(0,min-content)_1fr] items-center gap-x-0.5">
                <CardTitleIcon stats={stats} />
                <CardCaption stats={stats} />
                <div className="justify-self-end">{actions}</div>
            </div>

            <CardUsername fileUs={fileUs} />

            <div className="flex items-center justify-between">
                <CardTitleFilename fileUs={fileUs} />
                <CardTitleAttension fileUs={fileUs} />
            </div>
        </>}
    </>);
}

function CardTitleSelect({ fileUsAtom, children }: { fileUsAtom: FileUsAtomType; children: ReactNode; }) {
    const isCurrentCard = useAtomValue(useAtomValue(fileUsAtom).state.isCurrentAtom);
    const doSetCurrentCard = useSetAtom(doSetCurrentCardAtom);
    const setRightPanel = useSetAtom(rightPanelData.panelAtom);

    function toggleCardSelection() {
        doSetCurrentCard({ fileUsAtom, setCurrent: !isCurrentCard });
        setRightPanel(!isCurrentCard ? fileUsAtom : undefined);
    }

    return (
        <div
            className={classNames(
                "relative p-2 text-primary-100 cursor-pointer select-none",
                isCurrentCard ? "bg-blue-900" : "bg-primary-900",
            )}
            onClick={toggleCardSelection}
        >
            {children}
        </div>
    );
}

export function Part1_CardTitle({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    return (
        <CardTitleSelect fileUsAtom={fileUsAtom}>
            <CardTitleText fileUsAtom={fileUsAtom} />
        </CardTitleSelect>
    );
}
