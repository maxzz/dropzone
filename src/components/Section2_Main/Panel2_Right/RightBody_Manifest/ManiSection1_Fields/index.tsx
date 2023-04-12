import React, { useEffect, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { FieldTyp, Meta, TransformValue } from '@/store/manifest';
import { classNames } from '@/utils';
import { Column1_UseIt } from './Column1_UseIt';
import { Column2_Label } from './Column2_Label';
import { Column3_Value } from './Column3_Value';
import { Column4_Catalog } from './Column4_Catalog';
import { Column5_Type } from './Column5_Type';

function TableRow({ field }: { field: Meta.Field; }) {
    const { useit, displayname, type: typ, value: val } = field.mani;

    const state = useState({
        useItAtom: atom<boolean>(!!useit),
        labelAtom: atom(displayname || ''),
        typeAtom: atom(''),
        valueAtom: atom<string>(val || ''),
        valueAsAtom: atom(val),

        valueLifeAtom: atom(TransformValue.valueLife4Mani(field.mani)),
    })[0];

    const [useIt, setUseIt] = useAtom(state.useItAtom);
    const [label, setLabel] = useAtom(state.labelAtom);
    const [type, setType] = useAtom(state.typeAtom);
    const [value, setValue] = useAtom(state.valueAtom);
    const [valueAs, setValueAs] = useAtom(state.valueAsAtom);

    //const rowClassName = useIt ? "" : "opacity-30 pointer-events-none";
    const enableRow = () => !useIt && setUseIt(true);

    useEffect(() => {
        setUseIt(!!useit);
        setLabel(displayname || '');
        setType('');
        setValue(val || '');
        setValueAs(val);
    }, [field]);

    return (<>
        <Column1_UseIt useItAtom={state.useItAtom} />
        <Column2_Label useItAtom={state.useItAtom} valueAtom={state.labelAtom} onClick={enableRow} />
        <Column3_Value useItAtom={state.useItAtom} valueLifeAtom={state.valueLifeAtom} choosevalue={field.mani.choosevalue} onClick={enableRow} />
        <Column4_Catalog useItAtom={state.useItAtom} field={field} onClick={enableRow} />
        <Column5_Type useItAtom={state.useItAtom} field={field} onClick={enableRow} />
    </>);
}

const columns = ["Use it", "Label", "Value", "Shared ID (Catalog)", "Type"];
const columnHints = [
    "Use this field or not",
    "The label is shown to the user next to\nthe field for entering a value",
    "Specifies the value to fill out the field\nand how it is stored",
    "The Shared ID determines whether the value\nwill be shared through the field catalog",
    "Type of field"
];
function TableHeader() {
    return (<>
        {columns.map((title, idx) => (
            <div className="mb-2 px-1 text-[.65rem] text-primary-400 border-primary-100 border-b select-none" title={columnHints[idx]} key={idx}>
                {title}
            </div>
        ))}
    </>);
}

export function ManiSection1_Fields({ fields }: { fields: Meta.Field[] | undefined; }) {
    const ourFields = fields?.filter((field) => field.ftyp !== FieldTyp.button);
    return (<>
        {ourFields?.length
            ? <>
                <div className={classNames(
                    "p-2 grid grid-cols-[max-content_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-x-1 gap-y-1",
                    "bg-primary-800 text-primary-200 rounded-sm"
                )}>
                    <TableHeader />
                    {ourFields.map((field, idx) => (
                        <TableRow field={field} key={idx} />
                    ))}
                </div>
            </>
            : <div className="">no fields</div>
        }
    </>);
}
