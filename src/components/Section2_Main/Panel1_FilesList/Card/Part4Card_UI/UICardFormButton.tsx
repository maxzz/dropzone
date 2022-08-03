import React from 'react';
import { IconAppWebChrome as IconWebCho, IconAppWebIESolid as IconWebIe6, IconAppWindows as IconWinApp, IconManualMode as IconManual } from '@ui/UIIconSymbols';

const tips = {
    winApp: "Windows application",
    webIe6: "Webiste trained with IE",
    webCho: "Webiste trained with Chrome/Firefox",
    manual: "Manual mode",
};

export const appBigIcons = {
    winApp: <IconWinApp key="winApp" title={tips.winApp} className="w-5 h-5 ml-2 opacity-75" />,
    webIe6: <IconWebIe6 key="webIe6" title={tips.webIe6} className="w-5 h-5 ml-2 fill-transparent stroke-current" />,
    webCho: <IconWebCho key="webCho" title={tips.webCho} className="w-5 h-5 ml-2" strokeWidth={.9} />,
    manual: <IconManual key="manual" title={tips.manual} className="w-5 h-5 ml-2" strokeWidth={.9} />,
};

export const appMediumIcons = {
    winApp: <IconWinApp key="winApp" title={tips.winApp} className="w-5 h-5 ml-2 opacity-75" />,
    webIe6: <IconWebIe6 key="webIe6" title={tips.webIe6} className="w-5 h-5 ml-2 fill-transparent stroke-current" />,
    webCho: <IconWebCho key="webCho" title={tips.webCho} className="w-5 h-5 ml-2" strokeWidth={.9} />,
    manual: <IconManual key="manual" title={tips.manual} className="w-5 h-5 ml-2" strokeWidth={.9} />,
};

export function dispToIcons(disp: Meta.Disp | undefined, tags: Record<string, JSX.Element>): (false | JSX.Element | undefined)[] {
    const isIe = disp?.isIe;
    const isScript = disp?.isScript;
    const isWeb = !!disp?.domain;
    return [
        isWeb ? isIe ? tags.webIe6 : tags.webCho : tags.winApp,
        !isWeb && isIe && tags.webIe6,
        isScript && tags.manual
    ];
}
