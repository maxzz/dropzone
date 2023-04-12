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

    const rowAtoms = useState({
        useItAtom: atom<boolean>(!!useit),
        labelAtom: atom(displayname || ''),
        typeAtom: atom(''),
        valueAtom: atom<string>(val || ''),
        valueAsAtom: atom(val),

        valueLifeAtom: atom(TransformValue.valueLife4Mani(field.mani)),
    })[0];

    const [useIt, setUseIt] = useAtom(rowAtoms.useItAtom);
    const [label, setLabel] = useAtom(rowAtoms.labelAtom);
    const [type, setType] = useAtom(rowAtoms.typeAtom);
    const [value, setValue] = useAtom(rowAtoms.valueAtom);
    const [valueAs, setValueAs] = useAtom(rowAtoms.valueAsAtom);

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
        <Column1_UseIt useItAtom={rowAtoms.useItAtom} />
        <Column2_Label useItAtom={rowAtoms.useItAtom} valueAtom={rowAtoms.labelAtom} onClick={enableRow} />
        <Column3_Value useItAtom={rowAtoms.useItAtom} valueLifeAtom={rowAtoms.valueLifeAtom} choosevalue={field.mani.choosevalue} onClick={enableRow} />
        <Column4_Catalog useItAtom={rowAtoms.useItAtom} field={field} onClick={enableRow} />
        <Column5_Type useItAtom={rowAtoms.useItAtom} field={field} onClick={enableRow} />
    </>);
}

const rowColumns = [
    ['Use it',              /**/ 'Use this field or not'],
    ['Label',               /**/ 'The label is shown to the user next to\nthe field for entering a value'],
    ['Value',               /**/ 'Specifies the value to fill out the field\nand how it is stored'],
    ['Shared ID (Catalog)', /**/ 'The Shared ID determines whether the value\nwill be shared through the field catalog'],
    ['Type',                /**/ 'Type of field'],
];

function TableHeader() {
    return (<>
        {rowColumns.map(([title, hint], idx) => (
            <div className="mb-2 px-1 text-[.65rem] text-primary-400 border-primary-100 border-b select-none" title={hint} key={idx}>
                {title}
            </div>
        ))}
    </>);
}

export function ManiSection1_Fields({ fields }: { fields: Meta.Field[] | undefined; }) {
    const nonButtonFields = fields?.filter((field) => field.ftyp !== FieldTyp.button); // buttons are shown on another section
    return (<>
        {nonButtonFields?.length
            ? (
                <div className={classNames(
                    "p-2 grid grid-cols-[max-content_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-x-1 gap-y-1",
                    "bg-primary-800 text-primary-200 rounded-sm"
                )}>
                    <TableHeader />

                    {nonButtonFields.map((field, idx) => (
                        <TableRow field={field} key={idx} />
                    ))}
                </div>
            )
            : <div className="">no fields</div>
        }
    </>);
}
