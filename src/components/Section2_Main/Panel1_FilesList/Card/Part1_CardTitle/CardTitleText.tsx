import React, { ReactNode } from "react";
import { useAtomValue } from "jotai";
import { FileUs, FileUsAtomType, FileUsStats, formCaption } from "@/store";
import { CardTitleIcon } from "./CardTitleIcon";
import { CardTitleFilename } from "./CardTitleFilename";
import { CardTitleAttension } from "./CardTitleAttension";
import { classNames } from "@/utils/classnames";

function CardCaption({ stats }: { stats: FileUsStats; }) {
    return (
        <div className={classNames("text-lg h-7 overflow-hidden whitespace-nowrap overflow-ellipsis", stats.domain && "leading-[26px]")}>
            {formCaption(stats)}
        </div>
    );
}

function CardUsername({ fileUs }: { fileUs: FileUs; }) {
    const stats = fileUs.stats;
    const fcatSize = fileUs.fcat?.names.length;
    return (
        <div className="ml-0.5 text-sm font-light opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {stats.isCustomization
                ? <span title="This file is for configuring the application">Excluded app</span>
                : stats.isFCat
                    ? <span title="Number of items in the Field Catalog">{fcatSize ? `${fcatSize} item${fcatSize === 1 ? '' : 's'}` : `Empty catalog`}</span>
                    : <span title="Login name">{stats.title || 'No login title'}</span>
            }
        </div>
    );
}

export function CardTitleText({ fileUsAtom, actions }: { fileUsAtom: FileUsAtomType; actions?: ReactNode }) {
    const fileUs = useAtomValue(fileUsAtom);
    const stats = fileUs.stats;
    return (<>
        {/* Icon and website/app name */}
        <div className="grid grid-cols-[min-content_minmax(0,min-content)_1fr] items-center gap-x-0.5">
            <CardTitleIcon stats={stats} />
            <CardCaption stats={stats} />
            <div className="justify-self-end">{actions}</div>
        </div>

        <CardUsername fileUs={fileUs} />

        <div className="flex items-center justify-between">
            <CardTitleFilename fileUs={fileUs} />
            <CardTitleAttension fileUs={fileUs} />
        </div>
    </>);
}
