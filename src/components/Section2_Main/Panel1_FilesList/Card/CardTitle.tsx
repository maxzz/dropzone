import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { FileUs, FileUsAtomType, FileUsStats, rightPanelData, doSetCurrentCardAtom } from '@/store';
import { formCaption, isAnyWhy } from '@/store';
import { IconAppWebChrome, IconAppWebIE, IconAppWindows, IconAttention, IconCatalog, IconDot, IconFolder, IconMenuHamburger, IconOpenLink } from '@ui/UIIconSymbols';
import { uitooltipSmall, UITooltip } from '@ui/UITooltip';
import { CardTitleMenu } from './CardTitleMenu';
//import { CardMenu } from './CardMenu';
//import { PopoverMenu } from '@ui/nun/UIDropdownMenuLaag';

function CardIcon({ stats: { isWeb, isChrome, isFCat, isCustomization } }: { stats: FileUsStats; }) {
    if (isFCat) {
        return <div className="w-6 h-6 flex items-center justify-center">
            <IconCatalog className="w-5 h-5 text-gray-200" title="Field catalog" />
        </div>;
    }
    const icon = isChrome ? <IconAppWebChrome /> : isWeb ? <IconAppWebIE /> : <IconAppWindows />;
    const title = isChrome ? 'Webiste trained with Chrome' : isWeb ? 'Webiste trained with IE' : 'Windows application';
    return (
        <div className="w-6 h-6" title={`${title} `}>
            {icon}
        </div>
    );
}

function CardCaption({ stats }: { stats: FileUsStats; }) {
    return (
        <div className="ml-1 uppercase">
            {formCaption(stats)}
        </div>
    );
}

function CardAttention({ fileUs }: { fileUs: FileUs; }) {
    const hasBailOut = isAnyWhy(fileUs);
    if (!hasBailOut) {
        return null;
    }
    const bailOuts = [fileUs.meta?.[0]?.disp.bailOut, fileUs.meta?.[1]?.disp.bailOut];
    return (
        <UITooltip
            trigger={<IconAttention className="w-3.5 h-3.5 text-red-500 cursor-default" onClick={(e) => { e.stopPropagation(); }} />}
            arrow={false}
            popperOptions={{ delayShow: 300 }}
        >
            <div className="max-w-[17rem] text-sm">
                <div className="mt-[-.4rem] mx-[-.4rem] p-[.4rem] py-3 px-2 rounded-sm rounded-b-none bg-gray-900 text-gray-300">
                    There are problems to check why
                </div>
                {bailOuts.map((bailOut, idx) => <React.Fragment key={`bailout${idx}`}>
                    {bailOut &&
                        <div className="pt-1 px-0.5">
                            <div className="font-bold">{idx === 0 ? 'Login:' : 'Password change:'}</div>
                            {bailOut.map((item, key) => (
                                <div className="flex items-top" key={key}>
                                    <IconDot className="mr-0.5 w-4 h-4 flex-none self-start mt-0.5" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    }
                </React.Fragment>)}
            </div>
        </UITooltip>
    );
}

export type ParsedFname = {
    fname: string;
    styleMisc?: string;
    styleSm?: string;
    styleLg?: string;
};

export function parsedFname({
    fname,
    styleMisc = "text-[0.65rem]",
    styleSm = "opacity-75",
    styleLg = "px-1 text-sm text-gray-300 opacity-100"
}: ParsedFname) {
    const match = (fname || '').match(/^\{([0-9A-Za-z]{3,3})(.*)([0-9A-Za-z]{3,3})\}\.dpm$/); //TODO: handle '{id} - extra.dpm' filenames
    const rv = !match
        ? <div className={styleMisc}>
            <span className={styleSm}>{fname}</span>
        </div>
        : <div className={styleMisc}>
            <span className={styleSm}>{'{'}</span>
            <span className={styleLg}>{match[1]}</span>

            <span className={styleSm}>{match[2]}</span>

            <span className={styleLg}>{match[3]}</span>
            <span className={styleSm}>{'}.dpm'}</span>
        </div>;
    return rv;
}

export function CardTitleText({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const stats = fileUs.stats;
    const fcatLen = fileUs.fcat?.names.length;
    const fname = React.useMemo(() => {
        return (
            <UITooltip trigger={parsedFname({ fname: fileUs.fname })} {...uitooltipSmall()} >
                <div className="p-1 text-xs grid grid-cols-[auto,1fr] gap-x-2 gap-y-1">

                    {fileUs.fpath && <>
                        <div className="font-bold">Sub-folder</div>
                        <div>{fileUs.fpath}</div>
                    </>}

                    <div className="font-bold">Filename</div>
                    <div>{fileUs.fname}</div>

                    {stats.dateCreated && <>
                        <div className="font-bold">Created</div>
                        <div>{stats.dateCreated}</div>
                    </>}
                    {stats.dateModified && <>
                        <div className="font-bold">Modified</div>
                        <div>{stats.dateModified}</div>
                    </>}
                </div>
            </UITooltip>
        );
    }, [fileUs.fname, fileUs.stats.dateCreated, fileUs.stats.dateModified, fileUs.fpath, fileUs.fname]);

    return (<>
        {/* Icon and caption */}
        <div className="text-lg flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
            <CardIcon stats={stats} />

            {/* File index in all loaded files */}
            <div
                className="self-start ml-0.5 text-[.6rem] text-gray-400 bg-gray-800 border-gray-500 border rounded-md w-4 h-4 p-1 flex items-center justify-center select-none cursor-default"
                title="File index in all loaded files"
            >
                {fileUs.idx + 1}
            </div>

            <CardCaption stats={stats} />
        </div>

        {/* Login caption */}
        <div className="font-light text-sm opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {stats.isCustomization
                ? <span title="This file is for configuring the application">Excluded app</span>
                : stats.isFCat
                    ? <span title="Number of items in the Field Catalog">{fcatLen ? `${fcatLen} item${fcatLen === 1 ? '' : 's'}` : `Empty catalog`}</span>
                    : <span title="Login name">{stats.title || 'No login title'}</span>
            }
        </div>

        {/* Filename */}
        <div className="flex items-center justify-between">
            <div className="font-light text-sm overflow-hidden whitespace-nowrap overflow-ellipsis font-mono">
                {fname}
            </div>

            <div className="flex-none flex items-center space-x-1 mr-1">
                <CardAttention fileUs={fileUs} />
                {stats.isSubFolder && <IconFolder className="w-4 h-4 text-gray-500" title={`Sub-folder: "${stats.subFolder}"`} />}
            </div>
        </div>
    </>);
}

function CardOpenUrl({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const url = fileUs.mani?.forms[0]?.detection.web_ourl;
    const domain = fileUs.meta?.[0]?.disp.domain;
    if (!url) {
        return null;
    }
    return (
        <a href={url} target="_blank" rel="noopener" title={`Open ${domain}`} onClick={(event) => event.stopPropagation()}>
            <IconOpenLink className="w-4 h-4 mr-2" />
        </a>
    );
}

const CardTitleTextMemo = React.memo(CardTitleText);

export function CardTitle({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const currentCard = useAtomValue(useAtomValue(fileUsAtom).state.isCurrentAtom);
    const doSetCurrentCard = useSetAtom(doSetCurrentCardAtom);
    const setRightPanel = useSetAtom(rightPanelData.panelAtom); //#091e4c
    return (
        <div className={`relative p-2 ${currentCard ? 'bg-blue-900' : 'bg-gray-900'} text-gray-100`}>
            <div
                className="overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer select-none"
                onClick={() => {
                    doSetCurrentCard({ fileUsAtom, setCurrent: !currentCard });
                    setRightPanel(!currentCard ? fileUsAtom : undefined);
                }}
            >
                <CardTitleTextMemo fileUsAtom={fileUsAtom} />
            </div>

            {/* Card actions */}
            {currentCard && <div className="absolute top-3 right-2 z-10 flex items-center">
                {/* <PopoverMenu /> */}
                <CardOpenUrl fileUsAtom={fileUsAtom} />
                <CardTitleMenu fileUsAtom={fileUsAtom} icon={<div className="w-6 h-6 opacity-60 hover:opacity-100 active:scale-[.97]"> <IconMenuHamburger /> </div>} />
                {/* <CardMenu /> */}
            </div>}
        </div>
    );
}
