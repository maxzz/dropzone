import React from "react";
import { FileUs } from "@/store";
import { UITooltip, uitooltipSmall } from "@ui/UITooltip";
import { IconFolder } from "@ui/UIIconSymbols";

export type ParsedFnameParams = {
    fname: string;
    styleMisc?: string;
    styleSm?: string;
    styleXs?: string;
    styleLg?: string;
};

export function ManiFilenameParts({
    fname,
    styleMisc = "text-[0.7rem] ", //text-primary-300/80
    styleSm = "opacity-50 font-sans text-[0.5rem]",
    styleXs = "opacity-30",
    styleLg = "px-px text-[0.72rem] text-primary-400 opacity-100 border-b border-dotted border-primary-500"
}: ParsedFnameParams) {
    const match = (fname || '').match(/^\{([0-9A-Za-z]{3,3})(.*)([0-9A-Za-z]{3,3})\}\.dpm$/); //TODO: handle '{id} - extra.dpm' filenames
    return (<>
        {match
            ?
            <div className={styleMisc}>
                <span className={styleXs}>{'{'}</span>
                <span className={styleLg}>{match[1]}</span>

                <span className={styleSm}>{match[2]}</span>

                <span className={styleLg}>{match[3]}</span>
                <span className={styleXs}>{'}.dpm'}</span>
            </div>
            :
            <div className={styleMisc}>
                <span className={styleSm}>{fname}</span>
            </div>
        }
    </>);
}

export function CardTitleFilename({ fileUs }: { fileUs: FileUs; }) {
    const stats = fileUs.stats;

    const FilenameMemo = React.useMemo(() => {
        return (
            <UITooltip trigger={ManiFilenameParts({ fname: fileUs.fname })} {...uitooltipSmall()} >
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

    return FilenameMemo;
}

// export function CardTitleFilename({fileUs}: {fileUs: FileUs}) {
//     const stats = fileUs.stats;

//     const FilenameMemo = React.useMemo(() => {
//         return (
//             <UITooltip trigger={ManiFilenameParts({ fname: fileUs.fname })} {...uitooltipSmall()} >
//                 <div className="p-1 text-xs grid grid-cols-[auto,1fr] gap-x-1 gap-y-1">

//                     {fileUs.fpath && <>
//                         <div className="font-bold">Sub-folder</div>
//                         <div>{fileUs.fpath}</div>
//                     </>}

//                     <div className="font-bold">Filename</div>
//                     <div>{fileUs.fname}</div>

//                     {stats.dateCreated && <>
//                         <div className="font-bold">Created</div>
//                         <div>{stats.dateCreated}</div>
//                     </>}

//                     {stats.dateModified && <>
//                         <div className="font-bold">Modified</div>
//                         <div>{stats.dateModified}</div>
//                     </>}
//                 </div>
//             </UITooltip>
//         );
//     }, [fileUs.fname, fileUs.stats.dateCreated, fileUs.stats.dateModified, fileUs.fpath, fileUs.fname]);

//     return (
//         <div className="font-light text-sm overflow-hidden whitespace-nowrap overflow-ellipsis font-mono flex items-center space-x-2">
//             {FilenameMemo}
//             {stats.isSubFolder && <IconFolder className="w-4 h-4 text-gray-500" title={`Folder: "${stats.subFolder}"`} />}
//         </div>
//     );
// }
