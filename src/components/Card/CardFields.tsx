import React from 'react';
import { cpp_restore } from '../../store/manifest/mani-functions';
import { IconFieldText, IconInputFieldChk, IconInputFieldList, IconInputFieldPsw, IconInputFieldText, IconToggleRight } from '../UI/UiIcons';
import { CardData } from './Card';

// Form parts utils

function ObjectTable({ obj = {} }: { obj?: any; }): JSX.Element {
    const values = Object.entries(obj);
    return (
        <div className="grid grid-cols-[minmax(5rem,auto),1fr] items-center gap-x-1 text-xs">
            {values.map(([key, val]) => {
                return (<React.Fragment key={key}>
                    <div className="h-6 leading-5">{key}</div>
                    <div className="border-l border-gray-500 pl-1 h-6 leading-5 smallscroll smallscroll-light overflow-x-auto overflow-y-hidden whitespace-nowrap">{`${val}`}</div>
                </React.Fragment>);
            })}
        </div>
    );
}

// Form parts

export function PartFormDetection({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    const detection = cardData.fileUs.mani?.forms[formIndex]?.detection || {};
    let { caption, web_ourl, web_murl, web_qurl, web_checkurl, names_ext, processname, commandline, } = detection;

    // 1. fix duplicated urls
    let urlname = '';
    if (web_ourl === web_murl) {
        web_ourl = undefined;
        urlname += '+o';
    }
    if (web_qurl === web_murl) {
        web_qurl = undefined;
        urlname += '+q';
    }

    // 2. fix duplicated processnames
    if (processname === commandline) {
        commandline = undefined;
    }

    processname && (processname = decodeURI(processname));
    commandline && (commandline = decodeURI(commandline));

    // 3. fix packed names
    names_ext && (names_ext = decodeURI(cpp_restore(names_ext.replace(/:/g, '●')))); //TODO: decodeURI does not do all % encodings

    const toShow = {
        ...(caption && { caption }),
        ...(web_murl && {[`url m${urlname}`]: web_murl}),
        ...(web_ourl && { web_ourl }),
        ...(web_qurl && { web_qurl }),
        ...(names_ext && { names_ext }),
        ...(processname && { processname }),
        ...(commandline && { commandline }),
        ...(web_checkurl && { web_checkurl }),
    };

    return (
        <div className="">
            <div className="pt-2">detection and options</div>
            <div className="font-bold border-b border-gray-500"></div>
            <ObjectTable obj={toShow} />
            {/* <div className="font-bold border-t border-gray-500"></div> */}
        </div>
    );
}

export function PartFormOptions({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    const form = cardData.fileUs.mani?.forms[formIndex];
    return (
        <div className="">
            {/* <div className="-mt-2">options</div> */}
            <div className="font-bold border-b border-gray-500"></div>
            <ObjectTable obj={form?.options} />
            <div className="font-bold border-t border-gray-500"></div>
        </div>
    );
}

function FieldIcon({ field }: { field: Mani.Field; }) {
    const cls = "w-4 h-4 mr-1";
    return (
        <>
            {field.type === "edit" && (field.password ? <IconInputFieldPsw className={cls} fill="#38a000" /> : <IconInputFieldText className={cls} />)}
            {field.type === "check" && <IconInputFieldChk className={cls} />}
            {field.type === "list" && <IconInputFieldList className={cls} />}
            {field.type === "text" && <IconFieldText className={cls} />}
            {field.type === "button" && <IconToggleRight className={cls} />}
        </>
    );
}

function ObjectTableFields({ field }: { field: Mani.Field; }): JSX.Element {
    const values = Object.entries(field);
    return (
        <div className="grid grid-cols-[minmax(5rem,auto),1fr] items-center gap-x-1 text-xs">
            {values.map(([key, val], idx) => (
                <React.Fragment key={`${key || idx}`}>
                    {key !== 'password' && <>
                        <div className="h-6 leading-5">{key}</div>
                        <div className="border-l border-gray-500 pl-1 h-6 leading-5 smallscroll smallscroll-light overflow-x-auto overflow-y-hidden whitespace-nowrap">
                            <div className="flex items-center">
                                {key === 'type' && <FieldIcon field={field} />}
                                {`${val}`}
                            </div>
                        </div>
                    </>}
                </React.Fragment>)
            )}
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
                    <ObjectTableFields field={field} />
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
