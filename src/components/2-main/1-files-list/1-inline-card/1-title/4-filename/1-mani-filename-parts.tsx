type ParsedFnameParams = {
    fname: string;
    large?: boolean;
};

const partClasses = {
    classAll: "text-[0.7rem] overflow-hidden whitespace-nowrap overflow-ellipsis", //text-primary-300/80
    classSm: "opacity-50 font-sans text-[0.5rem]",
    classXs: "opacity-30",
    classLg: "px-px text-[0.72rem] text-primary-400 opacity-100 border-b border-dotted border-primary-500",
    classL2: "px-1 text-[.65rem] font-bold text-gray-600 opacity-100", // large for ManiInfoTooltip
};

const reFilenameMatch = /^\{([0-9A-Za-z]{3,3})(.*)([0-9A-Za-z]{3,3})\}\.dpm$/; //TODO: handle '{guid} + extra.dpm' filenames

export function ManiFilenameParts({ fname, large }: ParsedFnameParams) {

    const match = (fname || '').match(reFilenameMatch);
    if (!match) {
        return (
            <div className={partClasses.classAll}>
                <span className={partClasses.classSm}>{fname}</span>
            </div>
        );
    }

    const useLarge = large ? partClasses.classL2 : partClasses.classLg;

    return (
        <div className={partClasses.classAll}>
            <span className={partClasses.classXs}>{'{'}</span>
            <span className={useLarge}>{match[1]}</span>
            <span className={partClasses.classSm}>{match[2]}</span>
            <span className={useLarge}>{match[3]}</span>
            <span className={partClasses.classXs}>{'}.dpm'}</span>
        </div>
    );
}
