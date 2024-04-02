import { FileUs } from '@/store';
import { Meta } from '@/store/manifest';
import { SymbolAppWebChrome as IconWebCho, SymbolAppWebIESolid as IconWebIe6, SymbolAppWindows as IconWinApp, SymbolManualMode as IconManual } from '@ui/icons';

const tips = {
    winApp: "Windows application",
    webIe6: "Webiste trained with IE",
    webCho: "Webiste trained with Chrome/Firefox",
    manual: "Manual mode",
};

export const appBigIcons = {
    winApp: <IconWinApp key="winApp" title={tips.winApp} className="size-5 ml-2 opacity-75" />,
    webIe6: <IconWebIe6 key="webIe6" title={tips.webIe6} className="size-5 ml-2 fill-transparent stroke-current" />,
    webCho: <IconWebCho key="webCho" title={tips.webCho} className="size-5 ml-2" strokeWidth={.9} />,
    manual: <IconManual key="manual" title={tips.manual} className="size-5 ml-2" strokeWidth={.9} />,
};

export const appMediumIcons = {
    winApp: <IconWinApp key="winApp" title={tips.winApp} className="size-5 opacity-75" />,
    webIe6: <IconWebIe6 key="webIe6" title={tips.webIe6} className="size-5 fill-transparent stroke-current" />,
    webCho: <IconWebCho key="webCho" title={tips.webCho} className="size-5" strokeWidth={.9} />,
    manual: <IconManual key="manual" title={tips.manual} className="size-5" strokeWidth={.9} />,
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

export type ButtonsDisp = readonly [boolean, Meta.Disp | undefined][];

export function getButtonsDisp(fileUs: FileUs): ButtonsDisp {

    const nForms = fileUs.mani?.forms?.length || 0;
    const hasLogin = nForms > 0;
    const hasCpass = nForms > 1;
    const disp = (type: number) => fileUs?.meta?.[type]?.disp;
    
    return [[hasLogin, disp(0)], [hasCpass, disp(1)]];
}
