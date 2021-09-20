import React from 'react';
import { cpp_restore } from '../../store/manifest/mani-functions';
import { IconFieldText, IconInputFieldChk, IconInputFieldList, IconInputFieldPsw, IconInputFieldText, IconToggleRight } from '../UI/UiIcons';
import { CardData } from './Card';

// Form parts utils

function isObject(value: any): boolean {
    return value && typeof value === 'object';
}

function ObjectTable({ obj = {} }: { obj?: any; }): JSX.Element {
    const values = Object.entries(obj);
    return (
        <div className="grid grid-cols-[minmax(5rem,auto),1fr] items-center gap-x-1 text-xs">
            {values.map((pair) => {
                if (isObject(pair[1])) {
                    return (<React.Fragment key={pair[0]}>
                        <div className="">field {pair[0]}</div>
                        {/* <div className="">field2</div> */}
                        {ObjectTable({ obj: pair[1] })} {/* TODO: we don't need to add grid */}
                    </React.Fragment>);
                } else {
                    return (<React.Fragment key={pair[0]}>
                        <div className="h-6 leading-5">{pair[0]}</div>
                        {/* <div className="border-l border-gray-500 pl-1 smallscroll overflow-x-auto whitespace-nowrap overflow-ellipsis">{`${pair[1]}`}</div> */}
                        {/* <div className="border-l border-gray-500 pl-1 sb overflow-x-auto whitespace-nowrap overflow-ellipsis">{`${pair[1]}`}</div> */}
                        <div className="border-l border-gray-500 pl-1 h-6 leading-5 smallscroll smallscroll-light overflow-x-auto whitespace-nowrap">{`${pair[1]}`}</div>
                    </React.Fragment>);
                }
            })}
        </div>
    );
}

// Form parts

export function PartFormDetection({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    const detection = { ...cardData.fileUs.mani?.forms[formIndex]?.detection || {} };

    /*
   interface Detection {
        caption?: string;
        web_ourl?: string;
        web_murl?: string;
        web_qurl?: string;
        web_checkurl?: boolean; // "1"
        names_ext?: string;
        processname?: string;
        commandline?: string;
    }
    */

    // 2. fix duplicated fields
    let { caption, web_ourl, web_murl, web_qurl, web_checkurl, names_ext, processname, commandline, } = detection;

    // 2.1. urls
    let urlname = '';
    if (web_ourl === web_murl) {
        web_ourl = undefined;
        urlname += '+o';
    }
    if (web_qurl === web_murl) {
        web_qurl = undefined;
        urlname += '+q';
    }

    // 2.2. processnames
    if (processname === commandline) {
        commandline = undefined;
    }

    processname && (processname = decodeURI(processname));
    commandline && (commandline = decodeURI(commandline));

    // 3. fix packed names

    names_ext && (names_ext = decodeURI(cpp_restore(names_ext.replace(/:/g, '●')))); //TODO: decodeURI does not do all % encodings

    let toShow = {
        caption,
        [`url m${urlname}`]: detection.web_murl,
        ...(web_ourl && { web_ourl }),
        ...(web_qurl && { web_qurl }),
        names_ext,
        processname,
        ...(commandline && { commandline }),
        web_checkurl,
    };

    return (
        <div className="">
            <div className="pt-2">detection</div>
            <div className="font-bold border-b border-gray-500"></div>
            <ObjectTable obj={toShow} />
            <div className="font-bold border-t border-gray-500"></div>
        </div>
    );
}

export function PartFormOptions({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    const form = cardData.fileUs.mani?.forms[formIndex];
    return (
        <div className="">
            <div className="">options</div>
            <div className="font-bold border-b border-gray-500"></div>
            <ObjectTable obj={form?.options} />
            <div className="font-bold border-t border-gray-500"></div>
        </div>
    );
}

function ObjectTableFields({ obj = {} }: { obj?: any; }): JSX.Element {
    const values = Object.entries(obj);
    return (
        <div className="grid grid-cols-[minmax(5rem,auto),1fr] items-center gap-x-1 text-xs">
            {values.map(([key, val]) => {
                return (<React.Fragment key={key}>
                    <div className="h-6 leading-5">{key}</div>
                    <div className="border-l border-gray-500 pl-1 h-6 leading-5 smallscroll smallscroll-light overflow-x-auto whitespace-nowrap">{`${val}`}</div>
                </React.Fragment>);
            })}
        </div>
    );
}

export function PartFormFields({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    const form = cardData.fileUs.mani?.forms[formIndex];
    return (
        <div className="">
            <div className="">fields</div>
            <div className="font-bold border-b border-gray-500"></div>
            {form?.fields?.map((field, idx) =>
                <React.Fragment key={idx}>
                    {field.type === "edit" && (field.password ? <IconInputFieldPsw className="w-4 h-4" fill="#38a000" /> : <IconInputFieldText className="w-4 h-4" />)}
                    {field.type === "check" && <IconInputFieldChk className="w-4 h-4" />}
                    {field.type === "list" && <IconInputFieldList className="w-4 h-4" />}
                    {field.type === "text" && <IconFieldText className="w-4 h-4" />}
                    {field.type === "button" && <IconToggleRight className="w-4 h-4" />}
                    <ObjectTableFields obj={field} />
                </React.Fragment>
            )}
            <div className="font-bold border-t border-gray-500"></div>
        </div>
    );
}

//TODO: policy field
//TODO: rfield (in out), rfieldrindex
//TODO: refs @email
//TODO: script
//TODO: 'path_ext' and ignore 'path' but complain about 'path'
