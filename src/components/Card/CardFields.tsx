import React from 'react';
import ReactDOM from 'react-dom';
import { cpp_restore, FieldPath } from '../../store/manifest/mani-functions';
import { IconChevronDown, IconChevronUp, IconFieldText, IconInputFieldChk, IconInputFieldChkEmpty, IconInputFieldList, IconInputFieldPsw, IconInputFieldText, IconPreview, IconToggleRight } from '../UI/UiIcons';
import { CardData } from './Card';
import UISimpleBar from '../UI/UIScrollbar';
import { usePopper } from 'react-popper';
import { useClickAway, useElementClickAway } from '../../hooks/useElementClickAway';
import { useClientRect } from '../../hooks/useClientRect';
import { FieldPreview } from './CardFieldPreview';
import { OptionPool } from './FormOptionPool';
import { FieldFirstCol, FieldSecondCol, TableFromObject } from './UITableFromObject';
import FormOptionDetection from './FormOptionDetection';

// Form parts utils

function ButtonWithChildrenPortal({ name, children, toggle }: { name: string | undefined; children: React.ReactNode; toggle?: React.ReactNode; }) {
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const [buttonPosRef, rect] = useClientRect<HTMLDivElement>();

    const posStyles = rect ? {
        left: rect.x,
        top: rect.y + rect.height + 4,
    } : {};

    useClickAway(containerRef, (event) => event.target !== containerRef.current && !buttonRef.current?.contains(event.target as HTMLElement) && setOpen(false));

    if (!name) {
        return null;
    }
    return (
        <>
            <div ref={buttonPosRef} className="flex items-center">
                {toggle
                    ? <button ref={buttonRef} onClick={() => setOpen((v) => !v)}> {toggle} </button>
                    : <button
                        ref={buttonRef}
                        className={`pl-2 pr-1 text-xs border border-gray-500 rounded ${open ? 'bg-gray-300' : ''} flex items-center`}
                        onClick={() => setOpen((v) => !v)}
                    >
                        <div className="pb-1 mr-1">{name}</div>
                        {open ? <IconChevronUp className="w-4 h-4" /> : <IconChevronDown className="list-owner w-4 h-4" />}
                    </button>
                }
            </div>

            {/* <button
                ref={buttonRef}
                className={`pl-2 pr-1 text-xs border border-gray-500 rounded ${open ? 'bg-gray-300' : ''} flex items-center`}
                onClick={() => setOpen((v) => !v)}
            >
                <div className="pb-1 mr-1">{name}</div>
                {open ? <IconChevronUp className="w-4 h-4" /> : <IconChevronDown className="list-owner w-4 h-4" />}
            </button> */}

            {open && ReactDOM.createPortal(
                <div
                    ref={containerRef} className="absolute z-10 px-2 border border-gray-500 rounded bg-gray-300 text-xs"
                    style={posStyles}
                >
                    {children}
                </div>
                , document.getElementById('portal')!)
            }

            {/* {open &&
                <div ref={containerRef} className="absolute top-[110%] left-0 right-0 z-10 px-2 border border-gray-500 rounded bg-gray-300 text-xs">
                    {children}
                </div>
            } */}
        </>
    );
}

function ToggleWithPortal({ children, toggle }: { children?: React.ReactNode; toggle?: React.ReactNode; }) {
    const [referenceElm, setReferenceElm] = React.useState<HTMLButtonElement | null>(null);
    const [popperElm, setPopperElm] = React.useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(referenceElm, popperElm, { placement: 'bottom-end' });
    const [open, setOpen] = React.useState(false);

    useElementClickAway(popperElm, (event) => event.target !== popperElm && !referenceElm?.contains(event.target as HTMLElement) && setOpen(false));

    return (
        <>
            <button type="button" ref={setReferenceElm} onClick={() => setOpen((v) => !v)}> {toggle} </button>
            {open && ReactDOM.createPortal(
                <div ref={setPopperElm} style={styles.popper} {...attributes.popper} onClick={() => setOpen((v) => !v)}>
                    {/* <div className="w-[100px] h-[200px] bg-red-500">Popper</div> */}
                    {children}
                </div>
                , document.getElementById('portal')!
            )}
        </>
    );
}

// Form parts

function OptionLockFields({ lockfields }: { lockfields: string | undefined; }) {
    if (!lockfields) {
        return null;
    }
    return (
        <div className="px-2 border border-gray-500 rounded text-xs">
            fields: {lockfields == '1' ? 'lock' : 'don\'t lock'}
        </div>
    );
}

function OptionUseQuickLink({ usequicklink }: { usequicklink: string | undefined; }) {
    if (!usequicklink) {
        return null;
    }
    return (
        <div className="px-2 border border-gray-500 rounded text-xs">
            quick link{usequicklink == '1' ? '' : usequicklink == '2' ? ': don\'t use' : { usequicklink }}
        </div>
    );
}

function FormOptions({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    const form = cardData.fileUs.mani?.forms[formIndex];

    const detection = form?.detection || {};
    // const toShowDetection = filterDetection(detection);

    const options = form?.options || {};
    // const toShowOptions = filterOptions(options);

    return (
        <div className="">
            <div className="relative my-1 flex space-x-1">
                <FormOptionDetection cardData={cardData} formIndex={formIndex} />

                {/* <ButtonWithChildren name="detection">
                    {/* <div className="font-bold border-b border-gray-500"></div> * /}
                    <TableFromObject obj={toShowDetection} />
                    {/* <div className="font-bold border-b border-gray-500"></div> * /}
                    <TableFromObject obj={toShowOptions} />
                </ButtonWithChildren> */}

                <OptionUseQuickLink usequicklink={options.usequicklink} />
                <OptionLockFields lockfields={options.lockfields} />
                <OptionPool names_ext={detection.names_ext} />
            </div>
            <div className="font-bold border-t border-gray-500"></div>
        </div>
    );
}

export function FormDetectioAndOptions({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    return (
        <>
            <FormOptions cardData={cardData} formIndex={formIndex} />
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

function TableField({ metaForm, field }: { metaForm: Meta.Form; field: Meta.Field; }): JSX.Element {
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
        // <div className="relative">
        //     <div className="absolute z-10 right-0">
        //         <ButtonWithChildren name="preview">
        //             <FieldPreview form={metaForm} field={field} />
        //         </ButtonWithChildren>
        //     </div>


        <div className="grid grid-cols-[minmax(7rem,auto),1fr] items-center text-xs">


            {values.map(([key, val], idx) => {
                if (key === 'displayname' || key === 'password' || key === 'useit') {
                    return;
                }
                if (key === 'type') {
                    return (
                        <React.Fragment key={`${key || idx}`}>
                            <FieldFirstCol className="bg-gray-300 relative">
                                <div className="flex items-center justify-between pr-1">
                                    <FieldIcon field={toShow} />
                                    <div className="flex-1">{`${password ? 'psw' : val}`}</div>

                                    {/* <div className="" title="Preview">
                                        <IconPreview className="w-[14px] h-[14px]" />
                                    </div> */}

                                    {/* <ButtonWithChildrenPortal name="preview" toggle={<IconPreview className="w-[14px] h-[14px]" />}>
                                        <FieldPreview form={metaForm} field={field} />
                                    </ButtonWithChildrenPortal> */}

                                    {/* <ToggleWithPortal toggle={<div className="w-[14px] h-[14px]">text</div>}> */}
                                    <ToggleWithPortal toggle={<IconPreview className="w-[14px] h-[14px]" />}>
                                        <FieldPreview form={metaForm} field={field} />
                                    </ToggleWithPortal>

                                    {/* <div className="flex items-center">
                                        <ButtonWithChildren name="preview" toggle={ <IconPreview className="w-[14px] h-[14px]" /> }>
                                            <FieldPreview form={metaForm} field={field} />
                                        </ButtonWithChildren>
                                    </div> */}

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
        // </div>
    );
}

export function PartFormFields({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    const metaForm = cardData.fileUs.meta?.[formIndex];
    if (!metaForm) {
        return null;
    }
    return (
        <div className="">
            <div className="">fields</div>
            {/* <div className="font-bold border-b border-gray-500"></div> */}
            {metaForm.fields?.map((field, idx) =>
                <React.Fragment key={idx}>
                    {/* <FieldPreview form={metaForm} field={field} /> */}
                    <TableField metaForm={metaForm} field={field} />
                </React.Fragment>
            )}
            {/* <div className="font-bold border-t border-gray-500"></div> */}
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

//TODO: use hover over preview icon instead of click
