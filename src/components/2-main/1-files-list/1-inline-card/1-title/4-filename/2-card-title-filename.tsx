import { HTMLAttributes, useMemo } from "react";
import { FileUs } from "@/store";
import { UiTip, tipSmall } from "@ui/ui-tooltip";
import { SymbolFolder } from "@ui/icons";
import { classNames } from "@/utils";
import { ManiFilenameParts } from "./1-mani-filename-parts";

function PopupBody({ fileUs }: { fileUs: FileUs; }) {
    const stats = fileUs.stats;
    return (
        <div className="p-1 text-xs grid grid-cols-[auto,1fr] gap-x-1 gap-y-1">

            {fileUs.fpath && (<>
                <div className="font-bold">Sub-folder</div>
                <div>
                    {fileUs.fpath}
                </div>
            </>)}

            <div className="font-bold">Filename</div>
            <div>
                {fileUs.fname}
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

export function CardTitleFilename({ fileUs, className, ...rest }: { fileUs: FileUs; } & HTMLAttributes<HTMLDivElement>) {

    const FilenameTooltipMemo = useMemo(
        () => {
            return (
                <UiTip trigger={<ManiFilenameParts fname={fileUs.fname} />} {...tipSmall()}>
                    <PopupBody fileUs={fileUs} />
                </UiTip>
            );
        }, [fileUs.fname, fileUs.stats.dateCreated, fileUs.stats.dateModified, fileUs.fpath, fileUs.fname]
    );

    const stats = fileUs.stats;

    return (
        <div className={classNames("text-sm font-light font-mono grid grid-cols-[minmax(0,min-content)_auto] items-center gap-x-1", className)} {...rest}>
            {FilenameTooltipMemo}

            {stats.isSubFolder && (
                <SymbolFolder className=" size-4 text-gray-500" title={`Folder: "${stats.subFolder}"`} />
            )}
        </div>
    );
}
