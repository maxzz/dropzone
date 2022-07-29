import React from "react";

export type ParsedFnameParams = {
    fname: string;
    styleMisc?: string;
    styleSm?: string;
    styleXs?: string;
    styleLg?: string;
};

export function CardTitleFilename({
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
