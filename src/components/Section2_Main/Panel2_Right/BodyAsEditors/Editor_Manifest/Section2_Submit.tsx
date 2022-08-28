import React, { ChangeEvent, HTMLAttributes, useMemo, useState } from 'react';
import { FieldTyp, Meta } from '@/store/manifest';
import { atom, useAtom } from 'jotai';

type RadioButtonProps = {
    label: string;
    groupName?: string;
    value?: number;
    checked: boolean;
} & HTMLAttributes<HTMLElement>;

function RadioButton({ label, groupName, value, checked, onChange, ...rest }: RadioButtonProps) {
    //console.log('radio render', value, checked);
    return (
        <label className="h-6 flex items-center space-x-3 select-none" {...rest}>
            <input
                className="w-4 h-4 form-radio
                text-primary-700 bg-primary-800 border-none
                ring-1 focus:ring-1 ring-primary-600 focus:ring-primary-500 checked:ring-primary-600 focus:ring-offset-primary-800
                transition-shadow"
                type="radio"
                value={value}
                checked={checked}
                onChange={onChange}
                //defaultChecked={checked}
                {...(groupName && { name: groupName })}
            />
            <div >{label}</div>
        </label>
    );
}

function RadioGroup({ items, groupName, selected, setSelected }: { items: string[]; groupName: string; selected: number, setSelected: (v: number) => void; }) {
    console.log(`group render: selected=${selected}`);

    return (
        <div
            className="px-3 py-2 max-w-max flex flex-col space-y-1 bg-primary-800 rounded"
        //onChange={(v: ChangeEvent<HTMLInputElement>) => setSelected(+v.target.value)}
        >
            {items.map((item, idx) => (
                <RadioButton groupName={groupName} value={idx} checked={selected === idx} label={item} key={idx} onChange={() => {
                    console.log(`DOM selected change: selected=${idx}`);

                    setSelected(idx);
                }} />
                // <RadioButton groupName={groupName} value={idx} checked={value === idx} label={item} key={idx} />
            ))}
        </div>
    );
}


export function Section2_Submit({ form }: { form: Meta.Form | undefined; }) {
    const isWeb = !!form?.mani.detection.web_ourl;

    const [valueAtom] = useState(atom(0));
    const [value, setValue] = useAtom(valueAtom);
    function setValue2(v: number) {
        console.log(`setValue2: selected=${v} atom=%c'${valueAtom}'%c`, 'color: royalblue', 'color: gray');

        setValue(v);
    }

    console.log(`render main atom=%c'${valueAtom}'%c selected=${value} form ${(form?.mani?.detection?.web_ourl || '').substring(0, 30)}`, 'color: royalblue', 'color: gray');

    const { initialSelected, ourFieldNames } = useMemo(() => {
        let initialSelected = -1;
        const ourFields = form?.fields?.filter((field) => field.ftyp === FieldTyp.button) || [];
        const ourFieldNames = ourFields?.map((field, idx) => {
            field.mani.useit && (initialSelected = idx);
            return field.mani.displayname || 'no name';
        });
        initialSelected++;
        console.log(`%cinitial reCal: select=${initialSelected} atom=%c'${valueAtom}'%c`, 'color: orange', 'color: royalblue', 'color: gray');
        setValue2(initialSelected);
        return { initialSelected, ourFieldNames };
    }, [form]);

    const items = ['Do Not Submit', ...(isWeb ? ['Automatically submit login data'] : ourFieldNames)];

    return (<>
        <RadioGroup items={items} groupName={`submit-form-${form?.type}`} selected={value} setSelected={setValue2} />

        {/* <div className="">Do Not Submit</div>

        {isWeb
            ? <div className="">Automatically submit login data</div>
            : <>
                <hr />
                {ourFields?.map((field, idx) => (
                    <div className="" key={idx}>
                        {field.mani.displayname}
                    </div>
                ))}
            </>
        } */}
    </>);
}
