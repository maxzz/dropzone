import React from 'react';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { FileUsAtom, rightPanelAtom } from '../../store/store';
import { IconAppWebIE, IconAppWindows, IconInfo, IconMenuHamburger } from '../UI/UiIcons';
import CardTitleMenu from './CardTitleMenu';

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

    const fname = React.useMemo(() => {
        const m = (fileUs.fname || '').match(/^\{([0-9A-Za-z]{3,3})(.*)([0-9A-Za-z]{3,3})\}\.dpm$/);
        const fname = !m ? fileUs.fname : <div className="text-[0.65rem]">
            <span className="opacity-75">{'{'}</span>
            <span className="px-1 text-sm text-gray-300 opacity-100">{m[1]}</span>
            <span className="opacity-75">{m[2]}</span>
            <span className="px-1 text-sm text-gray-300 opacity-100">{m[3]}</span>
            <span className="opacity-75">{'}.dpm'}</span>
        </div>;
        return fname;
    }, [fileUs.fname]);

    return (
        <>
            <div className="text-lg flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
                <CardIcon isWeb={!!domain} />
                <div className="self-start ml-0.5 text-[.6rem] text-gray-400 bg-gray-800 border-gray-500 border rounded-md w-4 h-4 p-1 flex items-center justify-center">
                    {fileUs.idx + 1}
                </div>
                <CardCaption domain={domain} />
            </div>

            <div className="font-light text-sm opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis" title="Login name">
                {title || 'No login title'}
            </div>

            {/* <div className="font-light text-sm opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis font-mono" title="Filename">
                {fileUs.fname}
            </div>
             */}
            <div className="font-light text-sm overflow-hidden whitespace-nowrap overflow-ellipsis font-mono" title="Filename">
                {fname}
            </div>
        </>
    );
}

function CardTitle({ atom }: { atom: FileUsAtom; }) {
    const [rightPanel, setRightPanel] = useAtom(rightPanelAtom); //#091e4c
    const isCurrent = atom === rightPanel;
    return (
        <div
            className={`relative p-2 ${isCurrent ? 'bg-blue-900' : 'bg-gray-900'} text-gray-100 overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer select-none`}
            onClick={() => setRightPanel(!isCurrent ? atom : undefined)}
        >
            {/* All text rows */}
            <div className="">
                <CardTitleText atom={atom} />
            </div>
            
            {/* Actions */}
            <div className="absolute top-3 right-2 z-10 flex">
                {/* Show raw data button */}
                {/* <button
                        className="w-6 h-6 opacity-60 hover:opacity-100 select-none active:scale-[.97] block"
                        //onClick={() => setRightPanel(!isCurrent ? atom : undefined)}
                    >
                        <IconInfo />
                    </button> */}
                {/* Card actions */}
                <CardTitleMenu icon={
                    <div className="w-6 h-6 opacity-60 hover:opacity-100 active:scale-[.97]">
                        <IconMenuHamburger />
                    </div>}
                />
            </div>
        </div>
    );
}

export default CardTitle;
