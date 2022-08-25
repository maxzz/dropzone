import React, { InputHTMLAttributes, useState } from 'react';
import { atom, PrimitiveAtom, useAtom } from 'jotai';
import { Meta, TransformValue } from '@/store/manifest';
import { classNames } from '@/utils/classnames';
import { FormRowTypeIcon } from '@/components/Section2_Main/Panel1_FilesList/Card/Part2Card_FormBody/Part2Form_Fields/FieldRowTypeIcon';
import { FieldValue } from './FieldValue';
import { FieldCatalog } from './FieldCatalog';

function InputField({ useItAtom, valueAtom, className, ...rest }: { useItAtom: PrimitiveAtom<boolean>; valueAtom: PrimitiveAtom<string>; } & InputHTMLAttributes<HTMLInputElement>) {
    const [value, setValue] = useAtom(valueAtom);
    const [useIt, setUseIt] = useAtom(useItAtom);
    return (
        <input
            className={classNames(
                "px-2 py-3 h-8",
                "bg-primary-700 text-primary-200 focus:ring-offset-primary-800 ring-primary-600 focus:ring-primary-400",
                "focus:ring-1 focus:ring-offset-1",
                "outline-none rounded",
                !useIt && "opacity-30 cursor-pointer",
                className,
            )}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            autoComplete="off" list="autocompleteOff" spellCheck={false}
            {...rest}
        />
    );
}

function FieldType({ useItAtom, field, className, ...rest }: { useItAtom: PrimitiveAtom<boolean>; field: Meta.Field; } & InputHTMLAttributes<HTMLInputElement>) {
    const { password, type = 'NOTYPE' } = field.mani;
    const [useIt, setUseIt] = useAtom(useItAtom);
    return (
        <div className={classNames("flex items-center space-x-0.5", !useIt && "opacity-30 cursor-pointer", className)} {...rest}>
            <FormRowTypeIcon field={field.mani} className="w-5 h-5 text-primary-500" />
            <div className="text-primary-500">{`${password ? 'psw' : type}`}</div>
        </div>
    );
}

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

    return (<>
        <input
            className="place-self-center w-4 h-4 form-checkbox text-primary-700 bg-primary-800 ring-1 focus:ring-1 focus:ring-offset-primary-800 ring-primary-600 focus:ring-primary-400 rounded"
            type="checkbox"
            checked={useIt}
            onChange={() => setUseIt(v => !v)}
        />

        <InputField useItAtom={state.useItAtom} valueAtom={state.labelAtom} placeholder="Label" onClick={enableRow} />
        <FieldCatalog useItAtom={state.useItAtom} field={field} onClick={enableRow} />

        <FieldValue useItAtom={state.useItAtom} valueLifeAtom={state.valueLifeAtom} field={field} onClick={enableRow} />

        <FieldType useItAtom={state.useItAtom} field={field} onClick={enableRow} />
    </>);
}

const titles = ["Use it", "Label", "Catalog", "Value", "Type"];
function TableHeader() {
    return (<>
        {titles.map((title, idx) => (
            <div className="mb-2 px-1 text-[.65rem] text-primary-400 border-primary-100 border-b" key={idx}>{title}</div>
        ))}
    </>);
}

export function Part1_Fields({ fields }: { fields: Meta.Field[] | undefined; }) {
    return (<>
        {fields
            ? <>
                <div className={classNames(
                    "p-2 grid grid-cols-[max-content_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-x-1 gap-y-1",
                    "bg-primary-800 text-primary-200 rounded-sm"
                )}>
                    <TableHeader />
                    {fields.map((field, idx) => <TableRow field={field} key={idx} />)}
                </div>
            </>
            : <div className="">no fields</div>
        }
    </>);
}
