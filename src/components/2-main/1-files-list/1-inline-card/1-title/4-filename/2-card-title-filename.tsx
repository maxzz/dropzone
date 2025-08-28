import { HTMLAttributes, useMemo } from "react";
import { FileUs } from "@/store";
import { UiTip, tipSmall } from "@ui/ui-tooltip";
import { SymbolFolder } from "@ui/icons";
import { classNames } from "@/utils";
import { ManiFilenameParts } from "./1-mani-filename-parts";

export function CardTitleFilename({ fileUs, className, ...rest }: { fileUs: FileUs; } & HTMLAttributes<HTMLDivElement>) {

    const FilenameTooltipMemo = useMemo(
        () => {
            return (
                <UiTip trigger={<ManiFilenameParts fname={fileUs.fileCnt.fname} />} {...tipSmall()}>
                    <PopupBody fileUs={fileUs} />
                </UiTip>
            );
        }, [fileUs.fileCnt.fname, fileUs.parsedSrc.stats.dateCreated, fileUs.parsedSrc.stats.dateModified, fileUs.fileCnt.fpath, fileUs.fileCnt.fname]
    );

    const stats = fileUs.parsedSrc.stats;

    return (
        <div className={classNames("text-sm font-light font-mono grid grid-cols-[minmax(0,min-content)_auto] items-center gap-x-1", className)} {...rest}>
            {FilenameTooltipMemo}

            {stats.isSubFolder && (
                <SymbolFolder className=" size-4 text-gray-500" title={`Folder: "${stats.subFolder}"`} />
            )}
        </div>
    );
}

function PopupBody({ fileUs }: { fileUs: FileUs; }) {
    const stats = fileUs.parsedSrc.stats;
    return (
        <div className="p-1 text-xs grid grid-cols-[auto_1fr] gap-x-1 gap-y-1">

            {fileUs.fileCnt.fpath && (<>
                <div className="font-bold">Sub-folder</div>
                <div>
                    {fileUs.fileCnt.fpath}
                </div>
            </>)}

            <div className="font-bold">Filename</div>
            <div>
                {fileUs.fileCnt.fname}
            </div>

            {stats.dateCreated && (<>
                <div className="font-bold">Created</div>
                <div>
                    {stats.dateCreated}
                </div>
            </>)}

            {stats.dateModified && (<>
                <div className="font-bold">Modified</div>
                <div>
                    {stats.dateModified}
                </div>
            </>)}

        </div>
    );
}
