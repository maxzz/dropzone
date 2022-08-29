import React, { InputHTMLAttributes } from 'react';
import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { FileUsAtomType, FormIdx } from '@/store';
import { classNames } from '@/utils/classnames';

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

function Popup() {
    return (
        <div className="flex flex-col space-y-4 bg-primary-800">
            <h1>Specify password complexity, history and generation requirements.</h1>
            <label>
                <input type="checkbox" />
                Enable password policy
            </label>

            <h2>Complexity</h2>
            <div className="space-y-4">
                <div className="">
                    <label className="block"> <input type="radio" />Predefined rule</label>
                    <select className="text-primary-800" value={4}>
                        <option value="1">Letters and numbers</option>
                        <option value="2">Numbers only</option>
                        <option value="3">letters only</option>
                        <option value="4">Letters or numbers with special characters</option>
                        <option value="5">Letters or numbers with at least one number</option>
                    </select>
                </div>

                <div className="">
                    <label> <input type="radio" />Custom rule</label>
                    <div className="flex items-center space-x-2">
                        <input type="text" />
                        <button>?</button>
                    </div>
                </div>
            </div>

            <div className="flex items-center">
                <div className="">Length:</div>
                <input />
                <div className="">to</div>
                <input />
            </div>

            <h2>Test complexity</h2>
            <div className="flex items-center space-x-2">
                <input />
                <button>Verify</button>
            </div>
            <div className="flex items-center space-x-2">
                <input />
                <button>Generate</button>
            </div>

            <h2>History</h2>
            <select className="text-primary-800" value={2}>
                <option value="0">None</option>
                <option value="1">Different than the Windows password</option>
                <option value="2">Unique within Password Manager logons</option>
                <option value="3">Different than the current password</option>
            </select>

            <h2>Generation</h2>
            <div className="">
                <label className="block"> <input type="radio" /> By user </label>
                <label className="block"> <input type="radio" /> By system </label>
            </div>
        </div>
    );
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
                : policies.length === 1
                    ? <>
                        <div className="">{policies[0].mani.policy}</div>
                        {policies[0].mani.policy2 && <div className="">{policies[0].mani.policy2}</div>}
                    </>
                    : <>
                        Multiple policies
                    </>
            }
            {/* <hr className="mt-4" />
            <Popup /> */}
        </>
    );
}
