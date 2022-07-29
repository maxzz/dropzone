import React from "react";
import { useAtomValue } from "jotai";
import { FileUsAtomType, FileUsStats, formCaption } from "@/store";
import { uitooltipSmall, UITooltip } from '@ui/UITooltip';
import { IconFolder } from "@ui/UIIconSymbols";
import { CardTitleIcon } from "./CardTitleIcon";
import { CardTitleFilename } from "./CardTitleFilename";
import { CardAttention } from "./CardTitleAttension";

function CardCaption({ stats }: { stats: FileUsStats; }) {
    return (
        <div className="ml-1 uppercase">
            {formCaption(stats)}
        </div>
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
                <CardTitleIcon stats={stats} />
                <CardCaption stats={stats} />
            </div>
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
            </div>
        </div>
    </>);
}

export const CardTitleTextMemo = React.memo(CardTitleText);
