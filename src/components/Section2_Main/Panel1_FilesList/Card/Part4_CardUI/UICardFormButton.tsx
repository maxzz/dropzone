import React from 'react';
import { IconAutoMode, IconBtnFormChangePsw, IconBtnFormLogin } from '@ui/UIIcons';
import { IconAppWebChrome, IconAppWebIE, IconAppWebIESolid, IconAppWindows, IconManualMode } from '@ui/UIIconSymbols';

/*
const TagWinApp =     <IconAppWindows    key="TagWinApp"     title="Windows application"                  className="w-5 h-5 ml-2 opacity-75" />      ;
// const TagWebIe =      <IconAppWebIE      key="TagWebIe"      title="Webiste trained with IE"              className="w-4 h-4 ml-2" strokeWidth={.9} />;
const TagWebIe =      <IconAppWebIESolid key="TagWebIe"      title="Webiste trained with IE"              className="w-5 h-5 ml-2 fill-transparent stroke-primary-900" />;
const TagWeb =        <IconAppWebChrome  key="TagWeb"        title="Webiste trained with Chrome/Firefox"  className="w-5 h-5 ml-2" strokeWidth={.9} />;
const TagModeNormal = <IconAutoMode      key="TagModeNormal" title="Normal mode"                          className="w-5 h-5 ml-2 opacity-75" />      ;
const TagModeManual = <IconManualMode    key="TagModeManual" title="Manual mode"                          className="w-5 h-5 ml-2" strokeWidth={.9} />;
*/
const TagLogin =      <IconBtnFormLogin     key="TagLogin"      title="Login form"                           className="w-5 h-5 ml-2 opacity-75" />      ;
const TagChgPsw =     <IconBtnFormChangePsw key="TagChgPsw"     title="Password change form"                 className="w-5 h-5 ml-2 opacity-75" />      ;

const tags = {
    TagWinApp:
        <IconAppWindows key="TagWinApp" title="Windows application" className="w-5 h-5 ml-2 opacity-75" />,
    // TagWebIe:
    //     <IconAppWebIE key="TagWebIe" title="Webiste trained with IE" className="w-4 h-4 ml-2" strokeWidth={.9} />,
    TagWebIe:
        <IconAppWebIESolid key="TagWebIe" title="Webiste trained with IE" className="w-5 h-5 ml-2 fill-transparent stroke-primary-900" />,
    TagWeb:
        <IconAppWebChrome key="TagWeb" title="Webiste trained with Chrome/Firefox" className="w-5 h-5 ml-2" strokeWidth={.9} />,
    // TagModeNormal:
    //     <IconAutoMode key="TagModeNormal" title="Normal mode" className="w-5 h-5 ml-2 opacity-75" />,
    TagModeManual:
        <IconManualMode key="TagModeManual" title="Manual mode" className="w-5 h-5 ml-2" strokeWidth={.9} />,
    // TagLogin:
    //     <IconBtnFormLogin key="TagLogin" title="Login form" className="w-5 h-5 ml-2 opacity-75" />,
    // TagChgPsw:
    //     <IconBtnFormChangePsw key="TagChgPsw" title="Password change form" className="w-5 h-5 ml-2 opacity-75" />,
};

type UICardFormButtonProps = {
    disp: Meta.Disp | undefined;
    label: string;
    opened: boolean;
    onClick: () => void;
};

export function UICardFormButton({ disp, label, opened, onClick }: UICardFormButtonProps) {
    const isIe = disp?.isIe;
    const isScript = disp?.isScript;
    const isWeb = !!disp?.domain;

    const icons = [
        isWeb ? isIe ? tags.TagWebIe : tags.TagWeb : tags.TagWinApp,
        !isWeb && isIe && tags.TagWebIe,
        isScript && tags.TagModeManual
    ];

    return (
        <button
            className={`p-2 border border-gray-700 rounded flex items-center shadow-md active:scale-[.97] select-none ${opened ? 'bg-gray-800 text-gray-100' : ''}`}
            onClick={onClick}
        >
            <span className="">{label}</span>
            {icons}
            {[TagLogin, TagChgPsw]}
        </button>
    );
}
