import React from 'react';
import { FormDatum } from '../CardDatum';
import { IconAppWebChrome, IconAppWebIE, IconAppWindows, IconAutoMode, IconFormChangePsw, IconFormLogin, IconManualMode } from '../../UI/UiIcons';

const TagWinApp = <div key="TagWinApp" title="Windows application"><IconAppWindows className="w-5 h-5 ml-2 opacity-75" /></div>;
const TagWebIe = <div key="TagWebIe" title="Webiste trained with IE"><IconAppWebIE className="w-5 h-5 ml-2" strokeWidth={.9} /></div>;
const TagWeb = <div key="TagWeb" title="Webiste trained with Chrome/Firefox"><IconAppWebChrome className="w-5 h-5 ml-2" strokeWidth={.9} /></div>;
const TagModeNormal = <div key="TagModeNormal" title="Normal mode"><IconAutoMode className="w-5 h-5 ml-2 opacity-75" /></div>;
const TagModeManual = <div key="TagModeManual" title="Manual mode"><IconManualMode className="w-5 h-5 ml-2" strokeWidth={.9} /></div>;
const TagChgPsw = <div key="TagChgPsw" title="Password change form"><IconFormChangePsw className="w-5 h-5 ml-2 opacity-75" /></div>;
const TagLogin = <div key="TagLogin" title="Login form"><IconFormLogin className="w-5 h-5 ml-2 opacity-75" /></div>;

function UICardFormButton({ formDatum: { cardDatum, formIndex }, opened, onClick }: { formDatum: FormDatum; opened: boolean; onClick: () => void; }) {
    const disp = (formIndex === 0 ? cardDatum.login : cardDatum.cpass).meta?.disp;
    const isIe = disp?.isIe;
    const isScript = disp?.isScript;
    const isWeb = !!disp?.domain;

    const icons = [
        isWeb ? isIe ? TagWebIe : TagWeb : TagWinApp,
        !isWeb && isIe && TagWebIe,
        isScript && TagModeManual
    ];

    const label = formIndex === 0 ? 'Login form' : 'Password change form';
    return (
        <button className={`p-2 border border-gray-700 rounded flex items-center shadow-md active:scale-[.97] select-none ${opened ? 'bg-gray-800 text-gray-100' : ''}`} onClick={onClick}>
            <span className="">{label}</span>
            {icons}
        </button>
    );
}

export default UICardFormButton;
