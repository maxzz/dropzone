import React, { ReactNode } from 'react';
import { PrimitiveAtom, useAtomValue, useSetAtom } from 'jotai';
import { FileUsAtomType, rightPanelData, doSetCurrentCardAtom, uiSizeAtom, UISize } from '@/store';
import { CardCaption, CardUsername } from './CardTitleText';
import { classNames } from '@/utils/classnames';
import { CardTitleIcon } from './CardTitleIcon';
import { CardTitleFilename } from './CardTitleFilename';
import { CardTitleAttension } from './CardTitleAttension';
import { CardMediumButtons } from './CardButtons';

export function CardTitleTextMinimal({ fileUsAtom, openAtom }: { fileUsAtom: FileUsAtomType; openAtom: PrimitiveAtom<boolean>; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const stats = fileUs?.stats;
    return (<>
        {stats && <>
            {/* Icon and website/app name */}
            <div className="grid grid-cols-[min-content_minmax(0,min-content)_1fr] items-center gap-x-0.5">
                <CardTitleIcon stats={stats} />
                <CardCaption stats={stats} />
            </div>

            <CardUsername fileUs={fileUs} />

            <div className="flex items-center justify-between">
                <CardTitleFilename fileUs={fileUs} />
                <CardTitleAttension fileUs={fileUs} />
            </div>
        </>}
    </>);
}

export function CardTitleTextCompact({ fileUsAtom, openAtom }: { fileUsAtom: FileUsAtomType; openAtom: PrimitiveAtom<boolean>; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const stats = fileUs?.stats;




    const nForms = fileUs.mani?.forms?.length || 0;
    const hasLogin = nForms > 0;
    const hasCpass = nForms > 1;
    const disp = (type: number) => fileUs?.meta?.[type]?.disp;


    return (<>
        {stats && <div className="grid grid-cols-[minmax(0,1fr)_auto]">
            <div>
                {/* Icon and website/app name */}
                <div className="grid grid-cols-[min-content_minmax(0,min-content)_1fr] items-center gap-x-0.5">
                    <CardTitleIcon stats={stats} />
                    <CardCaption stats={stats} />
                </div>

                <CardUsername fileUs={fileUs} />

                <div className="flex items-center justify-between">
                    <CardTitleFilename fileUs={fileUs} />

                </div>
            </div>

            <div className="grid">
                <CardMediumButtons hasLogin={hasLogin} hasCpass={hasCpass} disp={[disp(0), disp(1)]} openAtom={openAtom} />
                <div className="place-self-end">
                    <CardTitleAttension fileUs={fileUs} />
                </div>
            </div>
        </div>}
    </>);
}

export function CardTitleTextNormal({ fileUsAtom, actions }: { fileUsAtom: FileUsAtomType; actions?: ReactNode; }) {
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
            className={`relative p-2 text-primary-100 ${isCurrentCard ? "bg-blue-900" : "bg-primary-900"} cursor-pointer select-none`}
            onClick={toggleCardSelection}
        >
            {children}
        </div>
    );
}

export function Part1_CardTitle({ fileUsAtom, openAtom }: { fileUsAtom: FileUsAtomType; openAtom: PrimitiveAtom<boolean>; }) {
    const uiSize = useAtomValue(uiSizeAtom);
    return (
        <CardTitleSelect fileUsAtom={fileUsAtom}>
            {uiSize === UISize.minimal
                ? <CardTitleTextMinimal fileUsAtom={fileUsAtom} openAtom={openAtom} />
                : uiSize === UISize.compact
                    ? <CardTitleTextCompact fileUsAtom={fileUsAtom} openAtom={openAtom} />
                    : <CardTitleTextNormal fileUsAtom={fileUsAtom} />
            }
        </CardTitleSelect>
    );
}
