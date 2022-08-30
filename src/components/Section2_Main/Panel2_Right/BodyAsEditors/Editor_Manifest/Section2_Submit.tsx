import React, { HTMLAttributes, useEffect, useState } from 'react';
import { FieldTyp, Meta, SUBMIT } from '@/store/manifest';

type RadioButtonProps = {
    label: string;
    groupName: string;
    value?: number;
    checked: boolean;
} & HTMLAttributes<HTMLElement>;

function RadioButton({ label, groupName, value, checked, onChange, ...rest }: RadioButtonProps) {
    return (
        <label className="h-6 flex items-center space-x-3 cursor-pointer select-none" {...rest}>
            <input
                className="w-4 h-4 dark-radio"
                type="radio"
                name={groupName}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <div >{label}</div>
        </label>
    );
}

function RadioGroup({ items, groupName, selected, setSelected }: { items: string[]; groupName: string; selected: number, setSelected: (v: number) => void; }) {
    return (
        <div className="px-3 py-2 max-w-max min-w-[14rem] flex flex-col space-y-1 bg-primary-800 rounded">
            {items.map((item, idx) => (
                <RadioButton groupName={groupName} value={idx} checked={selected === idx} label={item} key={idx} onChange={() => setSelected(idx)} />
            ))}
        </div>
    );
}

export function Section2_Submit({ form }: { form: Meta.Form | undefined; }) {
    const [items, setItems] = useState<string[]>([]);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        const isWeb = !!form?.mani.detection.web_ourl;

        const submits = form?.fields?.filter((field) => field.ftyp === FieldTyp.button || field.mani.submit) || [];
        const submitNames = isWeb ? [] : submits.map((field) => field.mani.displayname || 'no name');

        let buttonSelected = -1;
        submits.forEach((field, idx) => field.mani.useit && (buttonSelected = idx));

        const forceSubmit = form?.mani?.options?.submittype === SUBMIT.dosumbit;
        const initialSelected = (forceSubmit || buttonSelected !== -1 ? isWeb ? 0 : buttonSelected : -1) + 1;

        setItems(['Do Not Submit', ...(isWeb ? ['Automatically submit login data'] : submitNames)]);
        setSelected(initialSelected);
    }, [form]);

    return (
        <RadioGroup items={items} groupName={`submit-form-${form?.type}`} selected={selected} setSelected={setSelected} />
    );
}
