import { FileUs, FileUsStats, formCaption } from "@/store";
import { classNames } from "@/utils";

export function CardCaption({ stats }: { stats: FileUsStats; }) {
    return (
        <div className={classNames("text-lg h-7 overflow-hidden whitespace-nowrap overflow-ellipsis", stats.domain && "leading-[26px]")}>
            {formCaption(stats)}
        </div>
    );
}

export function CardUsername({ fileUs }: { fileUs: FileUs; }) {
    const stats = fileUs.stats;
    const fcatSize = fileUs.fcat?.names.length;
    return (
        <div className="ml-0.5 text-sm font-light opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {stats.isCustomization
                ? (
                    <span title="This file is for configuring the application">
                        Excluded app
                    </span>
                )
                : stats.isFCat
                    ? (
                        <span title="Number of items in the Field Catalog">
                            {fcatSize
                                ? `${fcatSize} item${fcatSize === 1 ? '' : 's'}`
                                : `Empty catalog`
                            }
                        </span>
                    )
                    : (
                        <span title="Login name">
                            {stats.title || 'No login title'}
                        </span>
                    )
            }
        </div>
    );
}
