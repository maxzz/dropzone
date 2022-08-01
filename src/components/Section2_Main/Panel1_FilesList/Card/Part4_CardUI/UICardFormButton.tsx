import React, { Fragment } from 'react';
import { IconAppWebChrome as IconWebCho, IconAppWebIESolid as IconWebIe6, IconAppWindows as IconWinApp, IconManualMode as IconManual } from '@ui/UIIconSymbols';

const tips = {
    winApp: "Windows application",
    webIe6: "Webiste trained with IE",
    webCho: "Webiste trained with Chrome/Firefox",
    manual: "Manual mode",
};

const bigTags = {
    winApp: <IconWinApp key="winApp" title={tips.winApp} className="w-5 h-5 ml-2 opacity-75" />,
    webIe6: <IconWebIe6 key="webIe6" title={tips.webIe6} className="w-5 h-5 ml-2 fill-transparent stroke-current" />,
    webCho: <IconWebCho key="webCho" title={tips.webCho} className="w-5 h-5 ml-2" strokeWidth={.9} />,
    manual: <IconManual key="manual" title={tips.manual} className="w-5 h-5 ml-2" strokeWidth={.9} />,
};

type UICardFormButtonProps = {
    disp: Meta.Disp | undefined;
    label: string;
    opened: boolean;
    onClick: () => void;
};

function dispToIcons(disp: Meta.Disp | undefined, tags: Record<string, JSX.Element>): (false | JSX.Element | undefined)[] {
    const isIe = disp?.isIe;
    const isScript = disp?.isScript;
    const isWeb = !!disp?.domain;
    return [
        isWeb ? isIe ? tags.webIe6 : tags.webCho : tags.winApp,
        !isWeb && isIe && tags.webIe6,
        isScript && tags.manual
    ];
}

export function UICardFormButton({ disp, label, opened, onClick }: UICardFormButtonProps) {
    const icons = dispToIcons(disp, bigTags);
    return (
        <button
            className={`p-2 border border-gray-700 rounded flex items-center shadow-md active:scale-[.97] select-none ${opened ? 'bg-gray-800 text-gray-100' : ''}`}
            onClick={onClick}
        >
            <span>{label}</span>
            {icons}
        </button>
    );
}
