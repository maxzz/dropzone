type ParsedFnameParams = {
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
    if (!match) {
        return (
            <div className={classMisc}>
                <span className={classSm}>{fname}</span>
            </div>
        );
    }

    return (
        <div className={classMisc}>
            <span className={classXs}>{'{'}</span>
            <span className={classLg}>{match[1]}</span>
            <span className={classSm}>{match[2]}</span>
            <span className={classLg}>{match[3]}</span>
            <span className={classXs}>{'}.dpm'}</span>
        </div>
    );
}
