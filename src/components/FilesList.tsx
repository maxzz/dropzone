import { useAtom } from 'jotai';
import React from 'react';
import { removeQuery, urlDomain } from '../store/manifest/url';
import { filesAtom, FileUs, FileUsAtom } from '../store/store';
import { IconAppWebChrome, IconAppWebIE, IconAppWindows, IconAutoMode, IconFormChangePsw, IconFormLogin, IconInfo, IconManualMode } from './Icons';

type CardForm = {
    domain?: string;    // domain if web app
    isIE?: boolean;     // was trained with IE or Chrome
    isManual?: boolean; // is manual mode
};

type CardLogin = {
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
    console.log('raw', fileUs.raw);

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

function CardInfo({ login }: { login: CardLogin; }) {
    return (
        <div className="h-[70vh] my-2 overflow-auto smallscroll text-xs bg-gray-800 border-4 border-gray-800 shadow-md">
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
        <div className={`relative p-2 ${open ? 'bg-transparent' : 'bg-gray-900'} text-gray-100 overflow-hidden whitespace-nowrap overflow-ellipsis`}>
        {/* <div className="relative p-2 bg-gray-900 text-gray-100 overflow-hidden whitespace-nowrap overflow-ellipsis"> */}
            <div className="absolute top-3 right-2 w-6 h-6 opacity-50 hover:opacity-100" onClick={() => setOpen((v) => !v)}>
                <IconInfo />
            </div>
            <div className="">
                <TitleFirstRow login={login} />
                <div className="font-light text-sm opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis" title="Filename">
                    {login.fname}
                </div>
                <div className="font-light text-sm opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis" title="Login name">
                    {login.title || 'No title'}
                </div>
            </div>
            {open && <div className="">
                <CardInfo login={login} />
            </div>}
        </div>
    );
}

// Form parts utils

function isObject(value: any): boolean {
    return value && typeof value === 'object';
}

function ObjectTable({ obj = {} }: { obj?: any; }): JSX.Element {
    const values = Object.entries(obj);
    return (
        <div className="grid grid-cols-[auto,1fr] gap-x-1 text-xs">
            {values.map((pair) => {
                if (isObject(pair[1])) {
                    return (<React.Fragment key={pair[0]}>
                        <div className="">field {pair[0]}</div>
                        {/* <div className="">field2</div> */}
                        {ObjectTable({ obj: pair[1] })} {/* TODO: we don't need to add grid */}
                    </React.Fragment>);
                } else {
                    return (<React.Fragment key={pair[0]}>
                        <div className="">{pair[0]}</div>
                        {/* <div className="border-l border-gray-500 pl-1 smallscroll overflow-x-auto whitespace-nowrap overflow-ellipsis">{`${pair[1]}`}</div> */}
                        {/* <div className="border-l border-gray-500 pl-1 sb overflow-x-auto whitespace-nowrap overflow-ellipsis">{`${pair[1]}`}</div> */}
                        <div className="border-l border-gray-500 pl-1 smallscroll smallscroll-light overflow-x-auto whitespace-nowrap">{`${pair[1]}`}</div>
                    </React.Fragment>);
                }
            })}
        </div>
    );
}

// Form parts

function PartFormDetection({ login, formIndex }: { login: CardLogin; formIndex: number; }) {
    const form = login.fileUs.mani?.forms[formIndex];
    return (
        <div className="">
            <div className="pt-2">detection</div>
            <div className="font-bold border-b border-gray-500"></div>
            <ObjectTable obj={form?.detection} />
            <div className="font-bold border-t border-gray-500"></div>
        </div>
    );
}

function PartFormOptions({ login, formIndex }: { login: CardLogin; formIndex: number; }) {
    const form = login.fileUs.mani?.forms[formIndex];
    return (
        <div className="">
            <div className="">options</div>
            <div className="font-bold border-b border-gray-500"></div>
            <ObjectTable obj={form?.options} />
            <div className="font-bold border-t border-gray-500"></div>
        </div>
    );
}

function PartFormFields({ login, formIndex }: { login: CardLogin; formIndex: number; }) {
    const form = login.fileUs.mani?.forms[formIndex];
    return (
        <div className="">
            <div className="">fields</div>
            <div className="font-bold border-b border-gray-500"></div>
            <ObjectTable obj={form?.fields} />
            <div className="font-bold border-t border-gray-500"></div>
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
        <div className="min-w-[450px] max-w-[560px] grid grid-rows-[auto,1fr] ring-2 ring-gray-500 overflow-hidden rounded shadow-md">{/* select-none */}

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

function FilesList() {
    const [files] = useAtom(filesAtom);
    return (
        <div className="grid auto-cols-auto gap-4 text-sm">
            {files.map((atom) =>
                <ManifestCard atom={atom} key={`${atom}`} />
            )}
        </div>
    );
}
export default FilesList;
