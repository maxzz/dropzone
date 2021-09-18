import React from 'react';
import { useAtom } from 'jotai';
import { FileUs, FileUsAtom } from '../../store/store';
import CardActions from './CardActions';
import { PartFormDetection, PartFormFields, PartFormOptions } from './CardFields';
import { IconAppWebChrome, IconAppWebIE, IconAppWindows, IconAutoMode, IconFormChangePsw, IconFormLogin, IconInfo, IconManualMode, IconMenuHamburger } from '../UI/UiIcons';

type FormData = {
    meta?: Meta.Form;
};

export type CardData = {
    fileUs: FileUs;     // raw data
    fname: string;      // manifest filename
    title?: string;     // title by user
    hasCpass?: boolean; // has change password
    login: FormData;    // login form
    cpass: FormData;    // change password form
};

function buildCardData(fileUs: FileUs): CardData {
    const m: Mani.Manifest = fileUs.mani!;
    //console.log('raw', fileUs.raw);

    let cardData: CardData = {
        fileUs,
        fname: '',
        login: {
            meta: fileUs.meta?.[0],
        },
        cpass: {
            meta: fileUs.meta?.[1],
        },
    };

    cardData.fname = fileUs.fname;
    cardData.title = m.forms[0]?.options.choosename;
    cardData.hasCpass = m.forms?.length > 1;

    return cardData;
}

function CardRawInfo({ cardData }: { cardData: CardData; }) {
    return (
        <div className="my-2 overflow-auto smallscroll text-xs bg-gray-800 opacity-50 border-4 border-gray-800 shadow-md">
            <pre>{cardData.fileUs.raw}</pre>
        </div>
    );
}

function TitleFirstRow({ cardData }: { cardData: CardData; }) {
    const icon = cardData.login.meta?.disp.domain
        ? <IconAppWebIE className="w-6 h-6" />
        : <IconAppWindows className="w-6 h-6" />;
    const text = cardData.login.meta?.disp.domain
        ? <span className="ml-2 uppercase">{cardData.login.meta.disp.domain}</span>
        : <span className="ml-2 uppercase">Windows application</span>;
    return (
        <div className="text-lg flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
            {icon}
            {text}
        </div>
    );
}

function Title({ cardData }: { cardData: CardData; }) {
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
                    <TitleFirstRow cardData={cardData} />
                    <div className="font-light text-sm opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis" title="Filename">
                        {cardData.fname}
                    </div>
                    <div className="font-light text-sm opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis" title="Login name">
                        {cardData.title || 'No title'}
                    </div>
                </div>
            </div>

            {open && <div className="">
                <CardRawInfo cardData={cardData} />
            </div>}
        </div>
    );
}

// Forms

function FormContentLogin({ cardData }: { cardData: CardData; }) {
    return (
        <div className="">
            <div className="pt-2 font-bold border-b border-gray-500">Login form</div>
            <PartFormDetection cardData={cardData} formIndex={0} />
            <PartFormOptions cardData={cardData} formIndex={0} />
            <PartFormFields cardData={cardData} formIndex={0} />
        </div>
    );
}

function FormContentCpass({ cardData }: { cardData: CardData; }) {
    return (
        <div className="">
            <div className="pt-2 font-bold border-b border-gray-500">Password change form</div>
            <PartFormDetection cardData={cardData} formIndex={1} />
            <PartFormOptions cardData={cardData} formIndex={1} />
            <PartFormFields cardData={cardData} formIndex={1} />
        </div>
    );
}

const iconIe = <IconAppWebIE className="w-5 h-5 ml-2" strokeWidth={.9} key="iconIe"/>;
const iconManual = <IconManualMode className="w-5 h-5 ml-2" strokeWidth={.9} key="iconManual"/>;
const iconChrome = <IconAppWebChrome className="w-5 h-5 ml-2" strokeWidth={.9} key="iconChrome"/>;
const iconWin = <IconAppWindows className="w-5 h-5 ml-2 opacity-75" key="iconWin"/>;

function FormButton({ cardData, form, opened, onClick }: { cardData: CardData; form: number; opened: boolean; onClick: () => void; }) {
    const disp = (form === 0 ? cardData.login : cardData.cpass).meta?.disp;
    const isIe = disp?.isIe;
    const isScript = disp?.isScript;
    const isWeb = !!disp?.domain;

    const icons = [];
    icons.push(isWeb ? iconChrome : iconWin);
    isIe && icons.push(iconIe);
    isScript && icons.push(iconManual);

    const label = form === 0 ? 'Login form' : 'Password change form';
    return (
        <button className="p-2 border border-gray-700 rounded flex items-center shadow-md active:scale-[.97]" onClick={onClick}>
            <span className={`${opened ? 'text-gray-900' : ''}`}>{label}</span>
            {icons}
        </button>
    );
}

function CardBody({ cardData }: { cardData: CardData; }) {
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    return (
        <div className="p-2 bg-gray-200 text-gray-800">
            <div className="flex items-center space-x-2 text-sm">
                {/* Login form button */}
                <FormButton cardData={cardData} form={0} opened={open1} onClick={() => setOpen1((v) => !v)} />
                {/* Cpass form button */}
                {cardData.hasCpass && <FormButton cardData={cardData} form={1} opened={open2} onClick={() => setOpen2((v) => !v)} />}
            </div>
            {open1 && (<FormContentLogin cardData={cardData} />)}
            {open2 && (<FormContentCpass cardData={cardData} />)}
        </div>
    );
}

function Card({ atom, ...props }: React.HTMLAttributes<HTMLDivElement> & { atom: FileUsAtom; }) {
    const { className, ...rest } = props;
    const [fileUs] = useAtom(atom);
    const cardData: CardData | undefined = fileUs.mani && buildCardData(fileUs);
    return (<>
        {cardData && <div className={`grid grid-rows-[min-content,minmax(auto,1fr)] ring-4 ring-inset ring-gray-200 overflow-hidden rounded shadow-md ${className}`} {...rest}>{/* select-none */}
            <Title cardData={cardData} />
            <CardBody cardData={cardData} />
        </div>}
    </>);
}

export default Card;
