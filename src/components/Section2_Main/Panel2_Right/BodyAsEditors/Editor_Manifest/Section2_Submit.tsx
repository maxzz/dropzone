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
        <label className="h-6 flex items-center space-x-3 select-none" {...rest}>
            <input
                className="w-4 h-4 form-radio
                text-primary-700 bg-primary-800 border-none
                ring-1 focus:ring-1 ring-primary-600 focus:ring-primary-500 checked:ring-primary-600 focus:ring-offset-primary-800
                transition-shadow"
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
    const [selected, setSelected] = useState(0);
    const [items, setitems] = useState<string[]>([]);

    useEffect(() => {
        const isWeb = !!form?.mani.detection.web_ourl;

        const submits = form?.fields?.filter((field) => field.ftyp === FieldTyp.button || field.mani.submit) || [];
        const submitNames = isWeb ? [] : submits.map((field) => field.mani.displayname || 'no name');

        let buttonSelected = -1;
        submits.forEach((field, idx) => field.mani.useit && (buttonSelected = idx));

        const forceSubmit = form?.mani?.options?.submittype === SUBMIT.dosumbit;
        
        let initialSelected = -1;
        if (forceSubmit || buttonSelected !== -1) {
            if (isWeb) {
                initialSelected++;
            } else {
                initialSelected = buttonSelected;
            }
        }
        initialSelected++;

        setitems(['Do Not Submit', ...(isWeb ? ['Automatically submit login data'] : submitNames)]);
        setSelected(initialSelected);
    }, [form]);

    return (
        <RadioGroup items={items} groupName={`submit-form-${form?.type}`} selected={selected} setSelected={setSelected} />
    );
}
