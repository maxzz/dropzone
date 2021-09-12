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
    fname: string;      // manifest filename
    title?: string;     // title by user
    hasCpass?: boolean; // has change password
    login: CardForm;    // login form
    cpass: CardForm;    // change password form
};

function repackManifest(fileUs: FileUs): CardLogin {
    let login: CardLogin = {
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

    login.fname = fileUs.fname;
    login.title = m.forms[0]?.detection?.caption;
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
    return (1);
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
                <div className="">detection</div>
            </div>}

        </div>
    );
}

function FormLogin({ login }: { login: CardLogin; }) {
    return (
        <div className="">
            <div className="">detection</div>
            <div className="">options</div>
            <div className="">fields</div>
        </div>
    );
}

function FormCpass({ login }: { login: CardLogin; }) {
    return (
        <div className="">
            <div className="">detection</div>
            <div className="">options</div>
            <div className="">fields</div>
        </div>
    );
}

function CardBody({ login }: { login: CardLogin; }) {
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    return (
        <div className="flex items-center text-xs">
            <div className="p-2 border border-gray-700 rounded" onClick={() => setOpen1((v) => !v)}>
                Login form
            </div>
            {login.hasCpass &&
                <div className="p-2 border border-gray-700 rounded ml-2" onClick={() => setOpen2((v) => !v)}>
                    Password change form
                </div>
            }
            {open1 && (<FormLogin login={login} />)}
            {open2 && (<FormCpass login={login} />)}
        </div>
    );
}

function ManifestCard({ atom }: { atom: FileUsAtom; }) {
    const [fileUs] = useAtom(atom);
    const login: CardLogin = repackManifest(fileUs);
    return (
        <div className="min-w-[450px] max-w-[560px] grid grid-rows-[auto,1fr] ring-2 ring-gray-500 overflow-hidden rounded shadow-md select-none">

            {/* Card title */}
            <Title login={login} />

            {/* Card body */}
            <div className="p-2 grid grid-cols-[auto,1fr] gap-2 bg-gray-200 text-gray-800">

                {/* Card body 1st col */}
                <div className="flex flex-col items-center">
                    <div className="w-5 h-5">
                        {/* {fileUs.cnt && <IconAppWindows />} */}
                        {fileUs.raw && <IconAppWebIE />}
                        {/* {fileUs.cnt && <IconManualMode />} */}
                    </div>
                    <div className="w-4 h-4">
                        {fileUs.raw && <IconAppWebChrome strokeWidth={.9} />}
                        {/* {fileUs.cnt && <IconAutoMode />} */}
                    </div>
                </div>

                {/* Card body 2nd col */}
                <div className="">
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
                </div>
                {/* <div className="">{fileUs.cnt}</div> */}
            </div>
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
