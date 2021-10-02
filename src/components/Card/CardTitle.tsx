import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import React from 'react';
import { FileUsAtom, rightPanelAtom } from '../../store/store';
import { CardDatum } from './CardDatum';
import { IconAppWebIE, IconAppWindows, IconInfo, IconMenuHamburger } from '../UI/UiIcons';
import CardTitleMenu from './CardTitleMenu';

function CardRawInfo({ cardData }: { cardData: CardDatum; }) {
    return (
        <div className="my-2 overflow-auto smallscroll text-xs bg-gray-800 opacity-50 border-4 border-gray-800 shadow-md">
            <pre>{cardData.fileUs.raw}</pre>
        </div>
    );
}

function CardIcon({ isWeb }: { isWeb: boolean; }) {
    const icon = isWeb
        ? <IconAppWebIE className="w-6 h-6" />
        : <IconAppWindows className="w-6 h-6" />;
    return icon;
}

function CardCaption({ domain }: { domain?: string; }) {
    return (
        <span className="ml-1 uppercase">{domain || 'Windows application'}</span>
    );
}

export function CardTitleText({ atom }: { atom: FileUsAtom; }) {
    const fileUs = useAtomValue(atom);
    const title = fileUs.mani?.forms[0]?.options.choosename;
    const domain = fileUs.meta?.[0]?.disp.domain;
    return (
        <>
            <div className="text-lg flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
                <CardIcon isWeb={!!domain} />
                <div className="self-start ml-0.5 text-[.6rem] text-gray-400 bg-gray-800 border-gray-500 border rounded-md w-4 h-4 p-1 flex items-center justify-center">
                    {fileUs.idx + 1}
                </div>
                <CardCaption domain={domain} />
            </div>

            <div className="font-light text-sm opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis" title="Filename">
                {fileUs.fname}
            </div>
            <div className="font-light text-sm opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis" title="Login name">
                {title || 'No title'}
            </div>
        </>
    );
}

function CardTitle({ cardData, atom }: { cardData: CardDatum; atom: FileUsAtom; }) {
    const [open, setOpen] = React.useState(false);
    const setRightPanel = useUpdateAtom(rightPanelAtom);
    return (
        <div className="relative p-2 bg-gray-900 text-gray-100 overflow-hidden whitespace-nowrap overflow-ellipsis">
            <div className="">
                {/* Actions */}
                <div className="absolute top-3 right-2 z-10">
                    {/* Show raw data button */}
                    <button className="w-6 h-6 opacity-60 hover:opacity-100 select-none active:scale-[.97] block" onClick={
                        () => {
                            let newState = !open;
                            setRightPanel(newState ? atom : undefined);
                            setOpen(newState);
                        }}
                    >
                        <IconInfo />
                    </button>
                    {/* Card actions */}
                    <CardTitleMenu icon={
                        <div className="w-6 h-6 opacity-60 hover:opacity-100 select-none active:scale-[.97]">
                            <IconMenuHamburger />
                        </div>}
                    />
                </div>
                {/* All text rows */}
                <div className="mr-8">
                    <CardTitleText atom={atom} />
                </div>
            </div>

            {open && <div className="">
                <CardRawInfo cardData={cardData} />
            </div>}
        </div>
    );
}

export default CardTitle;
