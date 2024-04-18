import { ReactNode } from 'react';
import { Meta } from '@/store/manifest';
import { SymbolAppWebChrome as IconWebCho, SymbolAppWebIESolid as IconWebIe6, SymbolAppWindows as IconWinApp, SymbolManualMode as IconManual } from '@ui/icons';

const tips = {
    winApp: "Windows application",
    webIe6: "Webiste trained with IE",
    webCho: "Webiste trained with Chrome/Firefox",
    manual: "Manual mode",
};

const appBigIcons = {
    winApp: <IconWinApp key="winApp" title={tips.winApp} className="ml-2 size-5 opacity-75" />,
    webIe6: <IconWebIe6 key="webIe6" title={tips.webIe6} className="ml-2 size-5 fill-transparent stroke-current" />,
    webCho: <IconWebCho key="webCho" title={tips.webCho} className="ml-2 size-5 stroke-[.9]" />,
    manual: <IconManual key="manual" title={tips.manual} className="ml-2 size-5 stroke-[.9]" />,
};

const appMediumIcons = {
    winApp: <IconWinApp key="winApp" title={tips.winApp} className="size-5 opacity-75" />,
    webIe6: <IconWebIe6 key="webIe6" title={tips.webIe6} className="size-5 fill-transparent stroke-current" />,
    webCho: <IconWebCho key="webCho" title={tips.webCho} className="size-5 stroke-[.9]" />,
    manual: <IconManual key="manual" title={tips.manual} className="size-5 stroke-[.9]" />,
};

/**
 * We can show up to 3 icons for the form: windows/browser, not web by IE, manual mode
 * @returns always 3 icon entries, but React will render only those that are not undefined
 */
export function getUpToTreeIconsForForm(disp: Meta.Disp | undefined, useSmallIcons: boolean): readonly [ReactNode, ReactNode, ReactNode] {
    const isIe = disp?.isIe;
    const isScript = disp?.isScript;
    const isWeb = !!disp?.domain;

    const icn = useSmallIcons ? appMediumIcons : appBigIcons;

    const rv: readonly [ReactNode, ReactNode, ReactNode] = [
        isWeb
            ? isIe
                ? icn.webIe6
                : icn.webCho
            : icn.winApp,

        !isWeb && isIe && icn.webIe6,

        isScript && icn.manual,
    ];

    return rv;
}
