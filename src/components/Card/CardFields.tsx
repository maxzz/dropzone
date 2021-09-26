import React from 'react';
import { cpp_restore, FieldPath } from '../../store/manifest/mani-functions';
import { IconFieldText, IconInputFieldChk, IconInputFieldChkEmpty, IconInputFieldList, IconInputFieldPsw, IconInputFieldText, IconToggleRight } from '../UI/UiIcons';
import { CardData } from './Card';
import UISimpleBar from '../UI/UIScrollbar';
import { useClickAway } from 'react-use';

// Form parts utils

function ObjectTable({ obj = {} }: { obj?: any; }): JSX.Element {
    const values = Object.entries(obj);
    return (
        <div className="grid grid-cols-[minmax(5rem,auto),1fr] items-center text-xs">
            {values.map(([key, val]) => {
                return (<React.Fragment key={key}>
                    <FieldFirstCol>{key}</FieldFirstCol>
                    <FieldSecondCol>{`${val}`}</FieldSecondCol>
                </React.Fragment>);
            })}
        </div>
    );
}

// Form parts

function ButtonFormLockfields({ lockfields }: { lockfields: string | undefined; }) {
    if (!lockfields) {
        return null;
    }
    return (
        <div className="px-2 border border-gray-500 rounded text-xs">
            fields: {lockfields == '1' ? 'lock' : 'don\'t lock'}
        </div>
    );
}

function ButtonFormNames({ names_ext }: { names_ext: string | undefined; }) {
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    useClickAway(containerRef, (event) => {
        if (!(event.target as HTMLElement)?.classList.contains('list-owner')) {
            setOpen(false);
            console.log('away');
        }

    });
    if (!names_ext) {
        return null;
    }
    names_ext && (names_ext = decodeURI(cpp_restore(names_ext.replace(/:/g, '●')))); // fix packed names //TODO: decodeURI does not do all % encodings
    let items = (names_ext || '').split('●');
    return (
        <>
            <button className={`list-owner px-2 border border-gray-500 rounded ${open ? 'bg-gray-300' : ''}`} onClick={() => setOpen((v) => !v)}>names</button>
            {open &&
                <div ref={containerRef} className="absolute top-full overflow-auto left-0 right-0 z-10 py-2 px-2 grid grid-cols-[auto,1fr] gap-x-2 border border-gray-500 rounded bg-gray-300 text-xs">
                    {items.map((item, idx) => <React.Fragment key={idx}>
                        <div className="text-right">{idx}:</div>
                        <div className="">{item}</div>
                    </React.Fragment>)}
                </div>
            }
        </>
    );
}

function PartFormDetection({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    const form = cardData.fileUs.mani?.forms[formIndex];
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

    const toShow = {
        ...(caption && { caption }),
        ...(web_murl && { [`url m${urlname}`]: web_murl }),
        ...(web_ourl && { web_ourl }),
        ...(web_qurl && { web_qurl }),
        ...(processname && { processname }),
        ...(commandline && { commandline }),
        ...(web_checkurl && { checkurl: web_checkurl }),
    };

    return (
        <div className="">
            <div className="pt-2">detection and options</div>
            <div className="font-bold border-b border-gray-500"></div>
            <ObjectTable obj={toShow} />
            {/* <div className="font-bold border-t border-gray-500"></div> */}

            {/* <div className="-mt-2">options</div> */}
            <div className="font-bold border-b border-gray-500"></div>
            <ObjectTable obj={form?.options} />

            <div className="relative flex space-x-1">
                <ButtonFormLockfields lockfields={form?.options.lockfields} />
                <ButtonFormNames names_ext={names_ext} />
            </div>
            <div className="font-bold border-t border-gray-500"></div>
        </div>
    );
}

export function FormDetectioAndOptions({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    return (
        <>
            <PartFormDetection cardData={cardData} formIndex={formIndex} />
        </>
    );
}

function FieldIcon({ field }: { field: Mani.Field; }) {
    const cls = "w-4 h-4 mr-1";
    return (
        <>
            {field.type === "edit" && (field.password ? <IconInputFieldPsw className={cls} fill="#38a000" /> : <IconInputFieldText className={`${cls} opacity-75`} />)}
            {field.type === "check" && <IconInputFieldChk className={cls} />}
            {field.type === "list" && <IconInputFieldList className={cls} />}
            {field.type === "text" && <IconFieldText className="w-4 h-4 mr-1 opacity-75" />} {/* to guaranty than tailwind give us: "w-4 h-4 mr-1" */}
            {field.type === "button" && <IconToggleRight className={cls} />}
        </>
    );
}

function FieldFirstCol({ children, ...rest }: { children?: React.ReactNode; } & React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    const { className, ...attrs } = rest;
    return (
        <div className={`h-5 leading-5 ${className}`} {...attrs}>
            {children}
        </div>
    );
}

function FieldSecondCol({ children, ...rest }: { children?: React.ReactNode; } & React.HTMLAttributes<HTMLDivElement>): JSX.Element {
    const { className, ...attrs } = rest;
    return (
        <UISimpleBar>
            <div className={`border-l border-gray-500 pl-1 h-5 leading-5 whitespace-nowrap ${className}`} {...attrs}>
                {/* <div className={`border-l border-gray-500 pl-1 h-6 leading-6 smallscroll smallscroll-light overflow-x-auto overflow-y-hidden whitespace-nowrap ${className}`} {...attrs}> */}
                {children}
            </div>
        </UISimpleBar>
    );
}

function maxRect(rects: MPath.Chunk_loc[]) {
    let w = 0;
    let h = 0;
    rects.forEach(rect => {
        if (rect.x + rect.w > w) {
            w = rect.x + rect.w;
        }
        if (rect.y + rect.h > h) {
            h = rect.y + rect.h;
        }
    });
    return { w, h };
}

function FieldPreview({ form, field }: { form: Meta.Form; field: Meta.Field; }): JSX.Element {
    let maxSize = maxRect(form.rects);
    let thisRects = [...form.rects];

    let fieldLocs = FieldPath.PathLocations.pathItem_loc2items(field.path.loc || '');
    if (fieldLocs.length) {
        thisRects.push(fieldLocs[fieldLocs.length - 1]);
    }

    return (
        <div className="rects">
            <svg viewBox={`0 0 ${maxSize.w} ${maxSize.h}`}>
                {thisRects.map((item, idx) => (
                    <rect x={item.x} y={item.y} width={item.w} height={item.h} key={idx} className={`${item.f ? 'last-field' : ''}`}>
                        <title>{idx}</title>
                    </rect>
                ))}
            </svg>
        </div >
    );
}


function ObjectTableFields({ form, field }: { form: Meta.Form; field: Meta.Field; }): JSX.Element {
    const { displayname, type, dbname, path_ext, rfield, rfieldindex, password, useit, } = field.mani;
    const toShow = {
        ...(displayname && { displayname }),
        ...(type && { type }),
        ...(dbname && { id: dbname }),
        ...(path_ext && { path: path_ext }),
        ...(rfield && { rfield }),
        ...(rfieldindex && { rfieldindex }),
        ...(password && { password }),
        ...(useit && { useit }),
    };
    const values = Object.entries(toShow);
    return (
        <div className="grid grid-cols-[minmax(5rem,auto),1fr] items-center text-xs">
            {values.map(([key, val], idx) => {
                if (key === 'displayname' || key === 'password' || key === 'useit') {
                    return;
                }
                if (key === 'type') {
                    return (
                        <React.Fragment key={`${key || idx}`}>
                            <FieldFirstCol className="bg-gray-300">
                                <div className="flex items-center justify-between pr-1">
                                    <FieldIcon field={toShow} />
                                    <div className="flex-1">{`${password ? 'psw' : val}`}</div>
                                    {useit
                                        ? <IconInputFieldChk className="w-4 h-4" fill="#38a00040" />
                                        : <IconInputFieldChkEmpty className="w-4 h-4" />
                                    }
                                </div>
                            </FieldFirstCol>
                            <FieldSecondCol className="bg-gray-300">
                                {toShow.displayname}
                            </FieldSecondCol>
                        </React.Fragment>);
                }
                return (
                    <React.Fragment key={`${key || idx}`}>
                        <FieldFirstCol>{key}</FieldFirstCol>
                        <FieldSecondCol>
                            <div className="flex items-center">{`${val}`}</div>
                        </FieldSecondCol>
                    </React.Fragment>);
            })}
        </div>
    );
}

export function PartFormFields({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    const meta = cardData.fileUs.meta?.[formIndex];
    if (!meta) {
        return null;
    }
    return (
        <div className="">
            <div className="">fields</div>
            <div className="font-bold border-b border-gray-500"></div>
            {meta.fields?.map((field, idx) =>
                <React.Fragment key={idx}>
                    <FieldPreview form={meta} field={field} />
                    <ObjectTableFields form={meta} field={field} />
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

// TODO: move left-top to min point, i.e. ignore window position: find min x,y and substract from all location. can be done in meta
// TODO: show one preview per form?
// TODO: checkbox (on form preview) to show individual preview per field or not
