import React from 'react';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { FileUs, FileUsAtom, rightPanelAtom } from '../../store/store';
//import { IconAppWebIE, IconAppWindows, IconFolder, IconMenuHamburger } from '../UI/UiIcons';
import { IconAttention, IconFolder } from '../UI/UiIcons';
import CardTitleMenu from './CardTitleMenu';
import { IconAppWebIE, IconAppWindows, IconMenuHamburger } from '../UI/UIIconsSymbolsDefs';
import { PopoverMenu } from '../UI/UIDropdownMenuLaag';
import { isAnyWhy } from '../../store/store-functions';
import { usePopper } from 'react-popper';
import { useElementClickAway } from '../../hooks/useElementClickAway';
import { UITooltip, UITooltipInline } from '../UI/UITooltip';

function CardIcon({ isWeb }: { isWeb: boolean; }) {
    const icon = isWeb
        ? <IconAppWebIE /> //TODO: add Chrome trained detection 
        : <IconAppWindows />;
    return <div className="w-6 h-6" title={`${isWeb ? 'Webiste trained with IE' : 'Windows application'} `}>{icon}</div>;
}

function CardCaption({ domain, url }: { domain?: string; url: string | undefined; }) {
    return (
        <div className="ml-1 uppercase">
            {url ? <a href={url} target="_blank" rel="noopener">{domain}</a> : <>{domain || 'Windows application'}</>}
        </div>
    );
}
/*
function CardAttention({ fileUs }: { fileUs: FileUs; }) {
    const hasBailOut = isAnyWhy(fileUs);
    if (!hasBailOut) {
        return null;
    }
    const [referenceElm, setReferenceElm] = React.useState<HTMLDivElement | null>(null);
    const [popperElm, setPopperElm] = React.useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(referenceElm, popperElm, { placement: 'bottom-end', strategy: 'fixed' });
    const [open, setOpen] = React.useState(false);

    useElementClickAway(popperElm, (event) => event.target !== popperElm && !referenceElm?.contains(event.target as HTMLElement) && setOpen(false));
    
    return (
        <div className="">
            <div ref={setReferenceElm} onClick={(event) => { event.stopPropagation(); setOpen((v) => !v); }}>
                <IconAttention className="w-3.5 h-3.5 text-red-500" title="The manifest has problems to check. Click to see issues." />
            </div>

            {open &&
                <div ref={setPopperElm}
                    style={{ ...styles.popper, zIndex: 1 }} {...attributes.popper}
                    className="w-20 h-20 bg-red-500"
                    onClick={() => setOpen((v) => !v)}
                >
                    <div className="">111</div>
                </div>
            }

        </div>
    );
}
*/
/*
        <UITooltipInline trigger={<IconAttention className="w-3.5 h-3.5 text-red-500" />} arrow={false}>
            <div className="">
                <div className="">The manifest has problems to check. Click to see issues.</div>
                <div className="">11</div>
            </div>
        </UITooltipInline>

*/
function CardAttention({ fileUs }: { fileUs: FileUs; }) {
    const hasBailOut = isAnyWhy(fileUs);
    if (!hasBailOut) {
        return null;
    }

    return (
        <UITooltip trigger={<IconAttention className="w-3.5 h-3.5 text-red-500" />} arrow={false}>
            <div className="">
                <div className="bg-red-500">The manifest has problems to check. Click to see issues.</div>
                <div className="">11</div>
            </div>
        </UITooltip>
    );
}

export function CardTitleText({ fileUsAtom }: { fileUsAtom: FileUsAtom; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const domain = fileUs.meta?.[0]?.disp.domain;
    const loginForm = fileUs.mani?.forms[0];
    const title = loginForm?.options.choosename;
    const url = loginForm?.detection.web_ourl;

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
            {/* Icon and caption */}
            <div className="text-lg flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
                <CardIcon isWeb={!!domain} />

                {/* File index in all loaded files */}
                <div className="self-start ml-0.5 text-[.6rem] text-gray-400 bg-gray-800 border-gray-500 border rounded-md w-4 h-4 p-1 flex items-center justify-center select-none cursor-default"
                    title="File index in all loaded files"
                >
                    {fileUs.idx + 1}
                </div>

                <CardCaption domain={domain} url={url} />
            </div>

            {/* Login caption */}
            <div className="font-light text-sm opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis" title="Login name">
                {title || 'No login title'}
            </div>

            {/* Filename */}
            <div className="flex items-center justify-between">
                <div className="font-light text-sm overflow-hidden whitespace-nowrap overflow-ellipsis font-mono" title={`${fileUs.fpath ? `Folder: "${fileUs.fpath}"` : `Filename: ${fileUs.fname}`}`}>
                    {fname}
                </div>
                <div className="flex-none flex items-center space-x-1 mr-1">
                    {/* <UITooltipInline trigger={<IconAttention className="w-3.5 h-3.5 text-red-500" title="The manifest has problems to check. Click to see issues." />} arrow={false}>
                        Body
                    </UITooltipInline> */}

                    <UITooltipInline trigger={<IconAttention className="w-3.5 h-3.5 text-red-500" />} arrow={false}>
                        <div className="">
                            <div className="">The manifest has problems to check. Click to see issues.</div>
                            <div className="">11</div>
                        </div>
                    </UITooltipInline>

                    <UITooltipInline trigger={<IconAttention className="w-3.5 h-3.5 text-red-500" />} arrow={false}>
                        <div className="">
                            <div className="">The manifest has problems to check. Click to see issues.</div>
                        </div>
                    </UITooltipInline>

                    <CardAttention fileUs={fileUs} />
                    {fileUs.fpath && <IconFolder className="w-4 h-4 text-gray-500" title={`Folder: "${fileUs.fpath}"`} />}
                </div>
            </div>
        </>
    );
}

function CardTitleContent({ fileUsAtom }: { fileUsAtom: FileUsAtom; }) {
    return (
        <>
            {/* All text rows */}
            <CardTitleText fileUsAtom={fileUsAtom} />

            {/* Card actions */}
            {/* <div className="absolute top-3 right-2 z-10 flex">
                {/* <PopoverMenu /> * /}
                <CardTitleMenu icon={
                    <div className="w-6 h-6 opacity-60 hover:opacity-100 active:scale-[.97]">
                        <IconMenuHamburger />
                    </div>}
                />
            </div> */}
        </>
    );
}

const CardTitleContent_ = React.memo(CardTitleContent);

function CardTitle({ fileUsAtom }: { fileUsAtom: FileUsAtom; }) {
    const [rightPanel, setRightPanel] = useAtom(rightPanelAtom); //#091e4c
    const isCurrent = fileUsAtom === rightPanel;
    return (
        <div
            className={`relative p-2 ${isCurrent ? 'bg-blue-900' : 'bg-gray-900'} text-gray-100 overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer select-none`}
            onClick={() => setRightPanel(!isCurrent ? fileUsAtom : undefined)}
        >
            <CardTitleContent_ fileUsAtom={fileUsAtom} />
        </div>
    );
}

export default CardTitle;
