import React, { ChangeEvent, HTMLAttributes, useState } from 'react';
import { FieldTyp, Meta } from '@/store/manifest';
import { atom, useAtom } from 'jotai';

type RadioButtonProps = {
    label: string;
    groupName?: string;
    value?: number;
    checked: boolean;
} & HTMLAttributes<HTMLLabelElement>;

function RadioButton({ label, groupName, value, checked, ...rest }: RadioButtonProps) {
    return (
        <label className="h-6 flex items-center space-x-1.5" {...rest}>
            <input
                className="w-4 h-4 form-radio 
                text-purple-800 bg-yellow-800 
                ring-1 focus:ring-1 ring-orange-600
                focus:ring-offset-red-800
                "
                //
                //focus:ring-primary-400 
                type="radio"
                value={value}
                defaultChecked={checked}
                {...(groupName && { name: groupName })}
            />
            <div >{label}</div>
        </label>
    );
}

function RadioGroup({ items, groupName, value, setValue }: { items: string[]; groupName: string; value: number, setValue: (v: number) => void; }) {
    return (
        <div
            className="px-3 py-2 max-w-max flex flex-col space-y-1 bg-primary-800 rounded"
            onChange={(v: ChangeEvent<HTMLInputElement>) => setValue(+v.target.value)}
        >
            {items.map((item, idx) => (
                <RadioButton groupName={groupName} value={0} checked={value === 0} label={item} key={idx} />
            ))}
        </div>
    );
}


export function Section2_Submit({ form }: { form: Meta.Form | undefined; }) {
    const isWeb = !!form?.mani.detection.web_ourl;
    const ourFields = form?.fields?.filter((field) => field.ftyp === FieldTyp.button) || [];
    const ourFieldNames = ourFields?.map((field) => field.mani.displayname || 'no name');

    const items = ['Do Not Submit', ...(isWeb ? ['Automatically submit login data'] : ourFieldNames)];

    const [value, setValue] = useAtom(useState(atom(0))[0]);
    return (<>
        <RadioGroup items={items} groupName={`submit-form-${form?.type}`} value={value} setValue={setValue} />

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
