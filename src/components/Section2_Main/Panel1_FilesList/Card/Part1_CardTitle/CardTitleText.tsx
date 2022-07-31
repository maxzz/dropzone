import React from "react";
import { useAtomValue } from "jotai";
import { FileUs, FileUsAtomType, FileUsStats, formCaption } from "@/store";
import { CardTitleIcon } from "./CardTitleIcon";
import { CardTitleFilename } from "./CardTitleFilename";
import { CardTitleAttension } from "./CardTitleAttension";

function CardCaption({ stats }: { stats: FileUsStats; }) {
    return (
        <div className="ml-1 text-lg uppercase overflow-hidden whitespace-nowrap overflow-ellipsis">
            {formCaption(stats)}
        </div>
    );
}

function CardUsername({ fileUs }: { fileUs: FileUs; }) {
    const stats = fileUs.stats;
    const fcatLen = fileUs.fcat?.names.length;
    return (
        <div className="flex-1 min-w-0 ml-0.5 text-sm font-light opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {stats.isCustomization
                ? <span title="This file is for configuring the application">Excluded app</span>
                : stats.isFCat
                    ? <span title="Number of items in the Field Catalog">{fcatLen ? `${fcatLen} item${fcatLen === 1 ? '' : 's'}` : `Empty catalog`}</span>
                    : <span title="Login name">{stats.title || 'No login title'}</span>
            }
        </div>
    );
}

export function CardTitleText({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const stats = fileUs.stats;
    return (<>
        {/* Icon and website/app name */}
        <div className="grid grid-cols-[min-content_minmax(0,min-content)] items-center">
            <CardTitleIcon stats={stats} />
            <CardCaption stats={stats} />
        </div>

        <CardUsername fileUs={fileUs} />

        <div className="flex items-center justify-between">
            <CardTitleFilename fileUs={fileUs} />
            <CardTitleAttension fileUs={fileUs} />
        </div>
    </>);
}
