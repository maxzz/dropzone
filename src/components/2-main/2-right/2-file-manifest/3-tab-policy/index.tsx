import { InputHTMLAttributes, useEffect, useState } from 'react';
import { atom, PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { FileUsAtomType, FormIdx } from '@/store';
import { Meta } from '@/store/manifest';
import { PolicyEditorDlg } from './dlg-policy-editor';
import { classNames } from '@/utils';

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

        <div className="px-2 py-1 bg-primary-700 rounded grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2">
            <div className="text-primary-500">Main</div>
            <div className="text-blue-400 text-[.7rem] font-mono">{field.mani.policy}</div>
            {field.mani.policy2 && <div className="text-primary-500">Custom</div>}
            {field.mani.policy2 && <div className="text-blue-400 text-[.7rem] font-mono">{field.mani.policy2}</div>}
        </div>

        <div className="flex items-center">
            <PolicyEditorDlg field={field} />
        </div>
    </>);
}

const tableColumns = [
    ["Field",  /*hint*/ "Field",        /*classes*/ "",],
    ["Policy", /*hint*/ "Field policy", /*classes*/ "col-span-2",],
] as const;

function TableHeader() {
    return (<>
        {tableColumns.map(([title, hint, classes], idx) => (
            <div
                className={classNames("mb-2 px-1 text-[.65rem] text-primary-400 border-primary-100 border-b select-none", classes)}
                title={hint} key={idx}
            >
                {title}
            </div>
        ))}
    </>);
}

export function ManiSection3_Policy({ fileUsAtom, formIdx }: { fileUsAtom: FileUsAtomType; formIdx: FormIdx; }) {
    const policiesAtom = useState(atom<Meta.Field[]>([]))[0];
    const [policies, setPolicies] = useAtom(policiesAtom);

    const fileUs = useAtomValue(fileUsAtom);
    const metaForm = fileUs.meta?.[formIdx];

    useEffect(() => {
        const fieldsWPolicy = metaForm?.fields?.filter((field) => field.mani.policy || field.mani.policy2) || []; // and add psw fields that may have policy
        setPolicies(fieldsWPolicy);
    }, [fileUs]); // TODO: we should monitor current form fields and list here all password fields to allow add to them policy

    return (<>
        {policies?.length
            ?
            <div className="px-3 py-2 grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-1 items-stretch rounded bg-primary-800">
                <TableHeader />

                {policies.map((field, idx) => (
                    <FieldWithPolicy field={field} key={idx} />
                ))}
            </div>
            :
            <div className="">Policy not specified</div>
        }
    </>);
}
