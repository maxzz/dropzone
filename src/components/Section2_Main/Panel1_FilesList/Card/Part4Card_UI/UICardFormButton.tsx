import React, { HTMLAttributes } from 'react';
import { IconAppWebChrome as IconWebCho, IconAppWebIESolid as IconWebIe6, IconAppWindows as IconWinApp, IconFormChange, IconFormLogin, IconManualMode as IconManual } from '@ui/UIIconSymbols';
import { FormIdx, formIdxName } from '@/store';
import { classNames } from '@/utils/classnames';

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

const mediumTags = {
    winApp: <IconWinApp key="winApp" title={tips.winApp} className="w-5 h-5 ml-2 opacity-75" />,
    webIe6: <IconWebIe6 key="webIe6" title={tips.webIe6} className="w-5 h-5 ml-2 fill-transparent stroke-current" />,
    webCho: <IconWebCho key="webCho" title={tips.webCho} className="w-5 h-5 ml-2" strokeWidth={.9} />,
    manual: <IconManual key="manual" title={tips.manual} className="w-5 h-5 ml-2" strokeWidth={.9} />,
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

type UICardFormButtonProps = {
    disp: Meta.Disp | undefined;
    formIdx: FormIdx;
    opened: boolean;
};

export function UICardFormButton({ disp, formIdx, opened, ...rest }: UICardFormButtonProps & HTMLAttributes<HTMLButtonElement>) {
    const icons = dispToIcons(disp, bigTags);
    return (
        <button
            className={classNames("p-2 border border-primary-700 rounded flex items-center shadow-md active:scale-[.97] select-none", opened && 'bg-primary-800 text-primary-100')}
            {...rest}
        >
            <span>{formIdxName(formIdx)}</span>
            {icons}
        </button>
    );
}

export function UICardFormMediumButton({ disp, formIdx, opened, ...rest }: UICardFormButtonProps & HTMLAttributes<HTMLButtonElement>) {
    const icons = dispToIcons(disp, mediumTags);
    return (
        <button
            className={classNames("p-0.5 border border-primary-700 rounded shadow-md active:scale-[.97] select-none", opened && 'bg-primary-800 text-primary-100')}
            title={formIdxName(formIdx)}
            {...rest}
        >
            <div className={classNames("p-px w-4 h-4", !opened && "bg-primary-700")}>
                {formIdx === FormIdx.login
                    ? <IconFormLogin className="w-full h-full" />
                    : <IconFormChange className="w-full h-full" />
                }
            </div>

            <div className="w-1 self-stretch border-r border-primary-700"></div>

            <div className="-mt-1 ml-2">{icons}</div>
        </button>
    );
}
