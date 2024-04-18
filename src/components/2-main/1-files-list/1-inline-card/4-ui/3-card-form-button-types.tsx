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

export function dispToIcons(disp: Meta.Disp | undefined, useSmallIcons: boolean): ReactNode[] {
    const isIe = disp?.isIe;
    const isScript = disp?.isScript;
    const isWeb = !!disp?.domain;

    const tags = useSmallIcons ? appMediumIcons : appBigIcons;

    return [
        isWeb
            ? isIe
                ? tags.webIe6
                : tags.webCho
            : tags.winApp,
        !isWeb && isIe && tags.webIe6,
        isScript && tags.manual,
    ];
}
