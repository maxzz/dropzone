import React, { HTMLAttributes } from "react";
import { FileUs } from "@/store";
import { UITooltip, optionsUITooltipSmall } from "@ui/UITooltip";
import { IconFolder } from "@ui/UIIconSymbols";
import { classNames } from "@/utils/classnames";

export type ParsedFnameParams = {
    fname: string;
    classAll?: string;
    classSm?: string;
    classXs?: string;
    classLg?: string;
};

export function ManiFilenameParts({
    fname,
    classAll: classMisc = "text-[0.7rem] overflow-hidden whitespace-nowrap overflow-ellipsis", //text-primary-300/80
    classSm = "opacity-50 font-sans text-[0.5rem]",
    classXs = "opacity-30",
    classLg = "px-px text-[0.72rem] text-primary-400 opacity-100 border-b border-dotted border-primary-500"
}: ParsedFnameParams) {
    const match = (fname || '').match(/^\{([0-9A-Za-z]{3,3})(.*)([0-9A-Za-z]{3,3})\}\.dpm$/); //TODO: handle '{id} - extra.dpm' filenames
    return (<>
        {match
            ?
            <div className={classMisc}>
                <span className={classXs}>{'{'}</span>
                <span className={classLg}>{match[1]}</span>

                <span className={classSm}>{match[2]}</span>

                <span className={classLg}>{match[3]}</span>
                <span className={classXs}>{'}.dpm'}</span>
            </div>
            :
            <div className={classMisc}>
                <span className={classSm}>{fname}</span>
            </div>
        }
    </>);
}

export function CardTitleFilename({ fileUs, className, ...rest }: { fileUs: FileUs; } & HTMLAttributes<HTMLDivElement>) {
    const stats = fileUs.stats;

    const FilenameMemo = React.useMemo(() => {
        return (
            <UITooltip
                trigger={
                    <ManiFilenameParts fname={fileUs.fname} />
                }
                {...optionsUITooltipSmall()}
            >
                {/* Popup content */}
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

    return (
        <div className={classNames("text-sm font-light font-mono grid grid-cols-[minmax(0,min-content)_auto] items-center gap-x-1", className)} {...rest}>
            {FilenameMemo}
            {stats.isSubFolder && <IconFolder className=" w-4 h-4 text-gray-500" title={`Folder: "${stats.subFolder}"`} />}
        </div>
    );
}
