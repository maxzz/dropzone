import React, { Fragment } from "react";
import { FileUs, FileUsAtomType, FileUsStats, formCaption, isAnyWhy } from "@/store";
import { uitooltipSmall, UITooltip } from '@ui/UITooltip';
import { IconAppWebChrome, IconAppWebIE, IconAppWindows, IconAttention, IconCatalog, IconDot, IconFolder } from "@ui/UIIconSymbols";
import { useAtomValue } from "jotai";
import { CardTitleFilename } from "./CardTitleFilename";
import { classNames } from "@/utils/classnames";

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

function CardTitleFileIndex({ idx, errors }: { idx: number; errors?: boolean; }) {
    return (
        <div
            className={classNames(
                "pb-px w-4 h-4 text-[.6rem] border rounded-md flex items-center justify-center select-none cursor-default",
                errors ? "text-red-100 bg-red-700 border-red-500" : "text-primary-500 border-primary-600",
            )}
            title={errors ? undefined : "File index in the list of all loaded files"}
            onClick={(e) => e.stopPropagation()}
        >
            {idx}
        </div>
    );
}

function CardAttention({ fileUs }: { fileUs: FileUs; }) {
    const hasBailOut = isAnyWhy(fileUs);
    if (!hasBailOut) {
        return <CardTitleFileIndex idx={fileUs.idx + 1} />;
    }
    const bailOuts = [fileUs.meta?.[0]?.disp.bailOut, fileUs.meta?.[1]?.disp.bailOut];
    return (
        <UITooltip
            trigger={
                <CardTitleFileIndex idx={fileUs.idx + 1} errors={true} />
                // <IconAttention
                //     className="w-3.5 h-3.5 text-red-500 cursor-default"
                //     onClick={(e) => e.stopPropagation()}
                // />
            }
            arrow={false}
            popperOptions={{ delayShow: 300 }} // , visible: true
            className="!p-0 !bg-primary-100 !border-primary-100"
        >
            <div className="pb-2 max-w-[17rem] text-sm bg-primary-100 rounded-[2px]">

                <div className="px-3 py-4 bg-red-700 text-primary-100 rounded-sm rounded-b-none">
                    There are problems to check why
                </div>

                {bailOuts.map((bailOut, idx) => (
                    <Fragment key={`bailout${idx}`}>
                        {bailOut &&
                            <div className="px-3 py-1">
                                <div className="font-bold">
                                    {idx === 0 ? 'Login:' : 'Password change:'}
                                </div>

                                {bailOut.map((item, key) => (
                                    <div className="flex items-center" key={key}>
                                        <IconDot className="ml-1 w-4 h-4 flex-none self-start mt-0.5" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        }
                    </Fragment>
                ))}
            </div>
        </UITooltip>
    );
}

export function CardTitleText({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const stats = fileUs.stats;
    const fcatLen = fileUs.fcat?.names.length;

    const FilenameMemo = React.useMemo(() => {
        return (
            <UITooltip trigger={CardTitleFilename({ fname: fileUs.fname })} {...uitooltipSmall()} >
                <div className="p-1 text-xs grid grid-cols-[auto,1fr] gap-x-1 gap-y-1">

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
        <div className="pr-1 flex items-center justify-between">
            <div className="text-lg flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
                <CardIcon stats={stats} />
                <CardCaption stats={stats} />
            </div>
            {/* <CardTitleFileIndex idx={fileUs.idx + 1} /> */}
        </div>

        {/* Login caption */}
        <div className="ml-0.5 font-light text-sm opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {stats.isCustomization
                ? <span title="This file is for configuring the application">Excluded app</span>
                : stats.isFCat
                    ? <span title="Number of items in the Field Catalog">{fcatLen ? `${fcatLen} item${fcatLen === 1 ? '' : 's'}` : `Empty catalog`}</span>
                    : <span title="Login name">{stats.title || 'No login title'}</span>
            }
        </div>

        {/* Filename */}
        <div className="flex items-center justify-between">
            <div className="font-light text-sm overflow-hidden whitespace-nowrap overflow-ellipsis font-mono flex items-center space-x-2">
                {FilenameMemo}
                {stats.isSubFolder && <IconFolder className="w-4 h-4 text-gray-500" title={`Sub-folder: "${stats.subFolder}"`} />}
            </div>

            <div className="flex-none flex items-center space-x-1 mr-1">
                <CardAttention fileUs={fileUs} />
                {/* <CardTitleFileIndex idx={fileUs.idx + 1} /> */}
            </div>
        </div>
    </>);
}

export const CardTitleTextMemo = React.memo(CardTitleText);
