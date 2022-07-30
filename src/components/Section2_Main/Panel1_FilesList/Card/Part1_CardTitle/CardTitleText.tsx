import React from "react";
import { useAtomValue } from "jotai";
import { FileUs, FileUsAtomType, FileUsStats, formCaption } from "@/store";
import { CardTitleIcon } from "./CardTitleIcon";
import { CardTitleFilename } from "./CardTitleFilename";
import { CardTitleAttension } from "./CardTitleAttension";

function CardCaption({ stats }: { stats: FileUsStats; }) {
    return (
        <div className="ml-1 text-lg uppercase"> {/* overflow-hidden whitespace-nowrap overflow-ellipsis */}
            {formCaption(stats)}
        </div>
    );
}

function CardUsername({fileUs}: {fileUs: FileUs}) {
    const stats = fileUs.stats;
    const fcatLen = fileUs.fcat?.names.length;
    return(
        <div className="ml-0.5 font-light text-sm opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {stats.isCustomization
                ? <span title="This file is for configuring the application">Excluded app</span>
                : stats.isFCat
                    ? <span title="Number of items in the Field Catalog">{fcatLen ? `${fcatLen} item${fcatLen === 1 ? '' : 's'}` : `Empty catalog`}</span>
                    : <span title="Login name">{stats.title || 'No login title'}</span>
            }
        </div>
    )
}

export function CardTitleText({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const stats = fileUs.stats;
    return (<>
        {/* Icon and website/app name */}
        <div className="flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
            <CardTitleIcon stats={stats} />
            <CardCaption stats={stats} />
        </div>

        <CardUsername fileUs={fileUs} />

        <div className="flex items-center justify-between">
            <CardTitleFilename fileUs={fileUs} />

            <div className="flex-none flex items-center space-x-1 mr-1">
                <CardTitleAttension fileUs={fileUs} />
            </div>
        </div>
    </>);
}

//TODO: 'overflow-hidden whitespace-nowrap overflow-ellipsis' is not working
