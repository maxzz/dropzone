import React from 'react';
import { IconInputFieldChk, IconInputFieldPsw, IconInputFieldText, IconToggleRight } from '../UI/UiIcons';
import { CardData } from './Card';

// Form parts utils

function isObject(value: any): boolean {
    return value && typeof value === 'object';
}

function ObjectTable({ obj = {} }: { obj?: any; }): JSX.Element {
    const values = Object.entries(obj);
    return (
        <div className="grid grid-cols-[minmax(5rem,auto),1fr] gap-x-1 text-xs">
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

export function PartFormDetection({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    const form = cardData.fileUs.mani?.forms[formIndex];
    return (
        <div className="">
            <div className="pt-2">detection</div>
            <div className="font-bold border-b border-gray-500"></div>
            <ObjectTable obj={form?.detection} />
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

export function PartFormFields({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    const form = cardData.fileUs.mani?.forms[formIndex];
    return (
        <div className="">
            <div className="">fields</div>
            <div className="font-bold border-b border-gray-500"></div>
            {/* <ObjectTable obj={form?.fields} /> */}
            {form?.fields.map((field, idx) =>
                <React.Fragment key={idx}>
                    {field.type === "edit" && (field.password ? <IconInputFieldPsw className="w-4 h-4" /> : <IconInputFieldText className="w-4 h-4" />) }
                    {field.type === "button" && <IconInputFieldChk className="w-4 h-4" /> }
                    {/* {field.type === "button" && <IconToggleRight className="w-4 h-4" /> } */}
                    <ObjectTable obj={field} />
                </React.Fragment>
            )}
            <div className="font-bold border-t border-gray-500"></div>
        </div>
    );
}
