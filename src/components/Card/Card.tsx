import { useAtom } from 'jotai';
import React from 'react';
import { removeQuery, urlDomain } from '../../store/manifest/url';
import { FileUs, FileUsAtom } from '../../store/store';
import CardActions from './CardActions';
import { PartFormDetection, PartFormFields, PartFormOptions } from './CardFields';
import { IconAppWebChrome, IconAppWebIE, IconAppWindows, IconAutoMode, IconFormChangePsw, IconFormLogin, IconInfo, IconManualMode, IconMenuHamburger } from '../UI/UiIcons';

type CardForm = {
    domain?: string;    // domain if web app
    isIE?: boolean;     // was trained with IE or Chrome
    isManual?: boolean; // is manual mode
};

export type CardLogin = {
    fileUs: FileUs;     // raw data
    fname: string;      // manifest filename
    title?: string;     // title by user
    hasCpass?: boolean; // has change password
    login: CardForm;    // login form
    cpass: CardForm;    // change password form
};

function repackManifest(fileUs: FileUs): CardLogin {
    let login: CardLogin = {
        fileUs,
        fname: '',
        login: {
        },
        cpass: {
        },
    };
    if (!fileUs.mani) {
        return login;
    }
    const m: Mani.Manifest = fileUs.mani;
    //console.log('raw', fileUs.raw);

    login.fname = fileUs.fname;
    login.title = m.forms[0]?.options.choosename;
    login.hasCpass = m.forms?.length > 1;

    m.forms?.forEach((mform, idx) => {
        const form = idx === 0 ? login.login : idx === 1 ? login.cpass : undefined;
        if (!form) {
            return;
        }
        form.domain = urlDomain(removeQuery(mform.detection?.web_ourl));
    });

    return login;
}

function CardRawInfo({ login }: { login: CardLogin; }) {
    return (
        <div className="my-2 overflow-auto smallscroll text-xs bg-gray-800 opacity-50 border-4 border-gray-800 shadow-md">
            <pre>{login.fileUs.raw}</pre>
        </div>
    );
}

function TitleFirstRow({ login }: { login: CardLogin; }) {
    const icon = login.login.domain
        ? <IconAppWebIE className="w-6 h-6" />
        : <IconAppWindows className="w-6 h-6" />;
    const text = login.login.domain
        ? <span className="ml-2 uppercase">{login.login.domain}</span>
        : <span className="ml-2 uppercase">Windows application</span>;
    return (
        <div className="text-lg flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
            {icon}
            {text}
        </div>
    );
}

function TitleSecondRow({ login }: { login: CardLogin; }) {
    return (1);
}

function Title({ login }: { login: CardLogin; }) {
    const [open, setOpen] = React.useState(false);
    return (
        <div className="relative p-2 bg-gray-900 text-gray-100 overflow-hidden whitespace-nowrap overflow-ellipsis">
            <div className="">
                <div className="absolute top-3 right-2 z-10">
                    <button className="w-6 h-6 opacity-60 hover:opacity-100 select-none active:scale-[.97] block" onClick={() => setOpen((v) => !v)}>
                        <IconInfo />
                    </button>
                    <CardActions icon={<div className="w-6 h-6 opacity-60 hover:opacity-100 select-none active:scale-[.97]">
                        <IconMenuHamburger />
                    </div>} />
                </div>
                <div className="mr-8">
                    <TitleFirstRow login={login} />
                    <div className="font-light text-sm opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis" title="Filename">
                        {login.fname}
                    </div>
                    <div className="font-light text-sm opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis" title="Login name">
                        {login.title || 'No title'}
                    </div>
                </div>
            </div>

            {open && <div className="">
                <CardRawInfo login={login} />
            </div>}
        </div>
    );
}

// Forms

function FormLogin({ login }: { login: CardLogin; }) {
    return (
        <div className="">
            <div className="pt-2 font-bold border-b border-gray-500">Login form</div>
            <PartFormDetection login={login} formIndex={0} />
            <PartFormOptions login={login} formIndex={0} />
            <PartFormFields login={login} formIndex={0} />
        </div>
    );
}

function FormCpass({ login }: { login: CardLogin; }) {
    return (
        <div className="">
            <div className="pt-2 font-bold border-b border-gray-500">Password change form</div>
            <PartFormDetection login={login} formIndex={1} />
            <PartFormOptions login={login} formIndex={1} />
            <PartFormFields login={login} formIndex={1} />
        </div>
    );
}

function CardBody({ login }: { login: CardLogin; }) {
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    return (
        <div className="p-2 bg-gray-200 text-gray-800">
            <div className="flex items-center space-x-2 text-sm">
                {/* Login form button */}
                <button
                    className="p-2 border border-gray-700 rounded flex items-center shadow-md active:scale-[.97]"
                    onClick={() => setOpen1((v) => !v)}
                >
                    <span className={`${open1 ? 'text-gray-900' : ''}`}>Login form</span>
                    <IconAppWindows className="w-5 h-5 ml-2 opacity-75" />
                </button>
                {/* Cpass form button */}
                {login.hasCpass && <button
                    className="p-2 border border-gray-700 rounded flex items-center shadow-md active:scale-[.97]"
                    onClick={() => setOpen2((v) => !v)}
                >
                    <span className={`${open2 ? 'text-gray-900' : ''}`}>Password change form </span>
                    <IconAppWebChrome className="w-5 h-5 ml-2" strokeWidth={.9} />
                </button>}
            </div>
            {open1 && (<FormLogin login={login} />)}
            {open2 && (<FormCpass login={login} />)}

        </div>
    );
}

function ManifestCard({ atom }: { atom: FileUsAtom; }) {
    const [fileUs] = useAtom(atom);
    const login: CardLogin = repackManifest(fileUs);
    return (
        <div className="mr-2 grid grid-rows-[min-content,minmax(auto,1fr)] ring-4 ring-inset ring-gray-200 overflow-hidden rounded shadow-md">{/* select-none */}
            {/* min-w-[450px] max-w-[560px] */}

            {/* Card title */}
            <Title login={login} />

            {/* Card body */}
            {/* <div className=""> */}

            {/* Card body 1st col */}
            {/* <div className="flex flex-col items-center">
                    <div className="w-5 h-5">
                        {/* {fileUs.cnt && <IconAppWindows />} * /}
                        {fileUs.raw && <IconAppWebIE />}
                        {/* {fileUs.cnt && <IconManualMode />} * /}
                    </div>
                    <div className="w-4 h-4">
                        {fileUs.raw && <IconAppWebChrome strokeWidth={.9} />}
                        {/* {fileUs.cnt && <IconAutoMode />} * /}
                    </div>
                </div> */}

            {/* Card body 2nd col */}
            {/* <div className="p-2 grid grid-cols-[auto,1fr] gap-2 bg-gray-200 text-gray-800"> */}
            {/* Card body 2nd col: filename */}
            {/* <div className="">{fileUs.fname}</div> */}

            {/* Card body 2nd col: forms */}
            <CardBody login={login} />

            {/* <div className="overflow-hidden">
                        {login.forms && login.forms.map((f, idx) => (
                            <div className="flex" key={idx}>
                                <div className="w-4 h-4 p-0.5 mr-1 flex-none">
                                    {idx === 0 ? <IconFormLogin /> : <IconFormChangePsw />}
                                </div>
                                <div className="overflow-x-auto smallscroll">{f}</div>
                            </div>)
                        )}
                    </div>
                     */}

            {/* <div className="">{fileUs.size} bytes</div> */}
            {/* </div> */}
            {/* <div className="">{fileUs.cnt}</div> */}
            {/* </div> */}
        </div>
    );
}

export default ManifestCard;
