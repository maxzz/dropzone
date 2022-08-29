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
        <div className="px-2 py-1 text-primary-200 bg-primary-700 rounded flex items-center">
            {field.mani.displayname || 'no name'}
        </div>

        <div className="px-2 py-1 bg-primary-700 rounded grid grid-cols-[auto_minmax(0,1fr)] gap-x-2">
            <div className="text-primary-500">Main</div>
            <div className="text-blue-400 text-[.7rem] font-mono">{field.mani.policy}</div>
            {field.mani.policy2 && <div className="text-primary-500">Custom</div>}
            {field.mani.policy2 && <div className="text-blue-400 text-[.7rem] font-mono">{field.mani.policy2}</div>}
        </div>

        <div className="flex items-center">
            <PolicyEditor />
        </div>
    </>);
}

const columns = ["Field", "Policy"];
const columnHints = [
    "Field",
    "Field policy",
];
const columnClassNames = [
    "",
    "col-span-2",
];
function TableHeader() {
    return (<>
        {columns.map((title, idx) => (
            <div
                className={classNames("mb-2 px-1 text-[.65rem] text-primary-400 border-primary-100 border-b select-none", columnClassNames[idx],)}
                title={columnHints[idx]} key={idx}
            >
                {title}
            </div>
        ))}
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

    return (<>
        {!policies?.length ? <div className="">Policy not specified</div> :
            <div className="px-3 py-2 grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-1 items-stretch rounded bg-primary-800">
                <TableHeader />
                {policies.map((field, idx) => (
                    <FieldWithPolicy field={field} key={idx} />
                ))}
            </div>
        }
    </>);
}
