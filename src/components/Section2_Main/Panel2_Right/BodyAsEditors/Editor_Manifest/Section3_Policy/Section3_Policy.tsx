import React, { InputHTMLAttributes } from 'react';
import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { FileUsAtomType, FormIdx } from '@/store';
import { classNames } from '@/utils/classnames';
import { PolicyEditor } from './PolicyEditor';
import { Meta } from '@/store/manifest';

function Input({ valueAtom, className, ...rest }: { valueAtom: PrimitiveAtom<string>; } & InputHTMLAttributes<HTMLInputElement>) {
    const [value, setValue] = useAtom(valueAtom);
    return (
        <input
            className={classNames(
                "px-2 py-3 h-8",
                "bg-primary-700 text-primary-200 focus:ring-offset-primary-800 ring-primary-600 focus:ring-primary-400",
                "focus:ring-1 focus:ring-offset-1",
                "outline-none rounded",
                className,
            )}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            autoComplete="off" list="autocompleteOff" spellCheck={false}
            {...rest}
        />
    );
}

function FieldWithPolicy({ field }: { field: Meta.Field; }) {
    return (<>
        <div className="">{field.mani.policy}</div>
        {field.mani.policy2 && <div className="">{field.mani.policy2}</div>}
    </>);
}

export function Section3_Policy({ fileUsAtom, formType }: { fileUsAtom: FileUsAtomType; formType: FormIdx; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const metaForm = fileUs.meta?.[formType];

    const policies = metaForm?.fields?.filter((field) => field.mani.policy || field.mani.policy2);

    /* // No, keep it simple, just check one at time

    if (formType === FormIdx.login) {
        // check in this form (new addition) and cpass
    } else {
        // check only in this form
    }
    */

    return (
        <>
            {!policies?.length
                ? <div className="">Policy not specified</div>
                :
                <div className="">
                    {policies.map((field, idx) => (
                        <FieldWithPolicy field={field} key={idx} />
                    ))}
                </div>

                // policies.length === 1
                //     ?
                //     <FieldWithPolicy field={policies[0]} />
                //     : <>
                //         Multiple policies
                //     </>
            }
            <hr className="mt-4" />
            <PolicyEditor />
        </>
    );
}
