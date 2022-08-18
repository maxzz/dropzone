import React, { InputHTMLAttributes, useState } from 'react';
import { atom, PrimitiveAtom, useAtom } from 'jotai';
import * as se from '../UISelect';
import { ChevronDownIcon, ChevronUpIcon, DotIcon } from '@radix-ui/react-icons';

function InputField({ valueAtom, placeholder }: { valueAtom: PrimitiveAtom<string>; } & InputHTMLAttributes<HTMLInputElement>) {
    const [value1, setValue] = useAtom(valueAtom);
    return (
        <input
            className="px-2 py-3 min-w-[5rem] h-8 bg-primary-700 text-primary-200
            focus:ring-1 focus:ring-offset-1 
            
            data-state-open:bg-red-500
            data-placeholder:bg-green-500
            
            focus:ring-offset-primary-800 ring-primary-600 focus:ring-primary-400
            outline-none rounded"
            
            data-state="open"
            data-placeholder
            
            placeholder={placeholder}
            value={value1}
            onChange={(event) => setValue(event.target.value)}
        />
    );
}

function SeGroupItem({ label, value }: { label: string; value: string; }) {
    return (
        <se.SelectItem value={value}>
            <se.SelectItemText>{label}</se.SelectItemText>
            <se.SelectItemIndicator>
                <DotIcon />
            </se.SelectItemIndicator>
        </se.SelectItem>
    );
}

function FieldType({ value }: { value: number; }) {
    return (
        <se.Select>
            <se.SelectTrigger aria-label="Food">
                <se.SelectValue /> <se.SelectIcon> <ChevronDownIcon /> </se.SelectIcon>
            </se.SelectTrigger>

            <se.SelectContent>
                <se.SelectScrollUpButton>
                    <ChevronUpIcon />
                </se.SelectScrollUpButton>

                <se.SelectViewport>
                    <se.SelectGroup>
                        <se.SelectLabel>Fruits</se.SelectLabel>
                        <SeGroupItem label="Text" value="1" />
                        <SeGroupItem label="Password" value="2" />
                        <SeGroupItem label="Checkbox" value="3" />
                        {/* ... and so on but should not be changed by user */}
                    </se.SelectGroup>

                </se.SelectViewport>

                <se.SelectScrollDownButton>
                    <ChevronDownIcon />
                </se.SelectScrollDownButton>

            </se.SelectContent>
        </se.Select>
    );
}

function FieldValue({ isPsw, value }: { isPsw: boolean; value: number; }) {
    return (
        <>
            <se.Select>
                <se.SelectTrigger aria-label="Food">
                    <se.SelectValue /> <se.SelectIcon> <ChevronDownIcon /> </se.SelectIcon>
                </se.SelectTrigger>

                <se.SelectContent>
                    <se.SelectScrollUpButton>
                        <ChevronUpIcon />
                    </se.SelectScrollUpButton>

                    <se.SelectViewport>
                        <se.SelectGroup>
                            <se.SelectLabel>Fruits</se.SelectLabel>
                            <SeGroupItem label="Ask - Resuse" value="1" />
                            <SeGroupItem label="Ask - Confirm" value="2" />
                            <SeGroupItem label="Ask Always" value="3" />
                        </se.SelectGroup>

                        {/* <se.SelectSeparator />

                        <se.SelectGroup>
                        </se.SelectGroup> */}

                    </se.SelectViewport>

                    <se.SelectScrollDownButton>
                        <ChevronDownIcon />
                    </se.SelectScrollDownButton>

                </se.SelectContent>
            </se.Select>

            {/* {isPsw
                ? <>
                    <div className="">Windows Password</div>
                </>
                : <>
                    <div className="">Windows User Name</div>
                    <div className="">Windows User Principal Name</div>
                    <div className="">Windows Domain\User Name</div>
                    <div className="">Windows Domain</div>
                    <div className="">Windows E-mail Address</div>
                </>
            } */}
        </>
    );
}

function InputRow() {
    const state = useState({
        useItAtom: atom<boolean>(true),
        labelAtom: atom(''),
        typeAtom: atom(1),
        valueAtom: atom(''),
        valueAsAtom: atom(''),
    })[0];
    const [useIt, setUseIt] = useAtom(state.useItAtom);
    const [label, setLabel] = useAtom(state.labelAtom);
    const [type, setType] = useAtom(state.typeAtom);
    const [value, setValue] = useAtom(state.valueAtom);
    const [valueAs, setValueAs] = useAtom(state.valueAsAtom);
    return (<>
        <input
            className="place-self-center w-5 h-5 form-checkbox text-primary-700 bg-primary-800
            ring-1
            focus:ring-1
            focus:ring-offset-primary-800 ring-primary-600 focus:ring-primary-400
            rounded"
            type="checkbox"
            checked={useIt}
            onChange={() => setUseIt(v => !v)}
        />
        <InputField valueAtom={state.labelAtom} placeholder="Label" />
        <FieldType value={1} /> {/* <div className="px-2 border-primary-800 border-l border-r">text</div> */}
        <InputField valueAtom={state.valueAtom} placeholder="Username" />
        <FieldValue isPsw={false} value={2} />
    </>);
}

export function Part1_Fields({ }: {}) {
    return (<>
        <div className="p-2 w-min grid grid-cols-[max-content_minmax(5rem,1fr)_auto_minmax(5rem,1fr)_max-content] items-center gap-x-2 gap-y-1 bg-primary-800 text-primary-200 rounded-sm">

            <div className="px-2 text-[.65rem] text-primary-400 border-primary-100 border-b mb-2">Use it</div>
            <div className="px-2 text-[.65rem] text-primary-400 border-primary-100 border-b mb-2">Label</div>
            <div className="px-2 text-[.65rem] text-primary-400 border-primary-100 border-b mb-2">Type</div>
            <div className="px-2 text-[.65rem] text-primary-400 border-primary-100 border-b mb-2">Value</div>
            <div className="px-2 text-[.65rem] text-primary-400 border-primary-100 border-b mb-2">Value type</div>

            <InputRow />
            <InputRow />
            <InputRow />

        </div>
    </>);
}
