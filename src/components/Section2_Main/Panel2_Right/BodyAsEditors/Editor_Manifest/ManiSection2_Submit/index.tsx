import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { FieldTyp, Meta, SUBMIT } from '@/store/manifest';

function RadioButton({ label, ...rest }: { label: string; } & InputHTMLAttributes<HTMLElement>) {
    return (
        <label className="h-6 flex items-center space-x-3 cursor-pointer select-none">
            <input className="w-4 h-4 dark-radio" type="radio" {...rest} />
            <div>
                {label}
            </div>
        </label>
    );
}

function RadioGroup({ items, groupName, selected, setSelected }: { items: string[]; groupName: string; selected: number, setSelected: (v: number) => void; }) {
    return (
        <div className="px-3 py-2 max-w-max min-w-[14rem] flex flex-col space-y-1 bg-primary-800 rounded">
            {items.map((item, idx) => (
                <RadioButton name={groupName} label={item} value={idx} checked={selected === idx} onChange={() => setSelected(idx)} key={idx} />
            ))}
        </div>
    );
}

export function ManiSection2_Submit({ form }: { form: Meta.Form | undefined; }) {
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
