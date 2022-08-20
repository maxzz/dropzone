import React, { HTMLAttributes, InputHTMLAttributes, useState } from 'react';
import { atom, PrimitiveAtom, useAtom } from 'jotai';
import * as se from '../UISelect';
import { ChevronDownIcon, ChevronUpIcon, DotIcon } from '@radix-ui/react-icons';
import { FormRowTypeIcon } from '@/components/Section2_Main/Panel1_FilesList/Card/Part2Card_FormBody/Part2Form_Fields/FieldRowTypeIcon';

import * as primitiveSe from '@radix-ui/react-select';
import * as menu from '@radix-ui/react-dropdown-menu';
import { DropdownMenu } from './dmtest';
import { classNames } from '@/utils/classnames';

function Trigger<T>(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <primitiveSe.SelectTrigger className="w-6 h-6 bg-orange-800 text-primary-800">
            {props.children}
        </primitiveSe.SelectTrigger>
    );
}

function ValueDropdown() {
    const cnames = "px-2 py-2 text-xs flex items-center cursor-default select-none rounded-md outline-none";
    const cnames2 = "data-highlighted:bg-red-200";
    return (<>
        <menu.Root>
            <menu.Trigger asChild>
                <button>OK</button>
            </menu.Trigger>

            <menu.Portal container={document.getElementById('portal')}>
                <menu.Content
                    className={classNames(
                        // "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
                        "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
                        "w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56",
                        "bg-white dark:bg-gray-800"
                    )}
                    radix-side-top={true}
                    onClick={() => {
                        console.log('click')}
                    }
                >
                    <menu.Item className={classNames(cnames, cnames2)}>
                        <DotIcon />
                        <span className="flex-grow text-gray-700">Label</span>
                    </menu.Item>

                </menu.Content>
            </menu.Portal>
        </menu.Root>
        {/* <se.Select>
            <Trigger>
                <se.SelectValue />
                <se.SelectIcon>
                    <ChevronDownIcon />
                </se.SelectIcon>
            </Trigger>

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

                </se.SelectViewport>

                <se.SelectScrollDownButton>
                    <ChevronDownIcon />
                </se.SelectScrollDownButton>

            </se.SelectContent>

        </se.Select> */}
    </>);
}

function InputField({ valueAtom, placeholder }: { valueAtom: PrimitiveAtom<string>; } & InputHTMLAttributes<HTMLInputElement>) {
    const [value1, setValue] = useAtom(valueAtom);
    return (
        <input
            className="px-2 py-3 min-w-[5rem] h-8 bg-primary-700 text-primary-200
            focus:ring-1 focus:ring-offset-1 
            
            data-state-open:bg-red-500
            group-data-placeholder:bg-green-500
            group-data-highlighted:bg-orange-500
            
            focus:ring-offset-primary-800 ring-primary-600 focus:ring-primary-400
            outline-none rounded"

            data-state="open"
            // data-placeholder
            // data-highlighted

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
/*
function FieldTypeOld({ value }: { value: number; }) {
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
                        {/* ... and so on but should not be changed by user * /}
                    </se.SelectGroup>

                </se.SelectViewport>

                <se.SelectScrollDownButton>
                    <ChevronDownIcon />
                </se.SelectScrollDownButton>

            </se.SelectContent>
        </se.Select>
    );
}
*/
function FieldType({ field }: { field: Meta.Field; }) {
    const { password, type = 'NOTYPE' } = field.mani;
    return (
        <div className="flex items-center space-x-0.5">
            <FormRowTypeIcon field={field.mani} className="w-5 h-5 text-primary-500" />
            <div className="text-primary-500">{`${password ? 'psw' : type}`}</div>
        </div>
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

function InputRow({ field }: { field: Meta.Field; }) {
    const { useit, displayname, type: typ, value: val } = field.mani;

    const state = useState({
        useItAtom: atom<boolean>(!!useit),
        labelAtom: atom(displayname || ''),
        typeAtom: atom(''),
        valueAtom: atom<string>(val || ''),
        valueAsAtom: atom(val),
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
        <InputField valueAtom={state.labelAtom} placeholder="Catalog" />
        <InputField valueAtom={state.valueAtom} placeholder="Username" />
        <FieldValue isPsw={false} value={2} />
        <FieldType field={field} /> {/* <div className="px-2 border-primary-800 border-l border-r">text</div> */}
    </>);
}

function TableHeader() {
    return (<>
        <div className="px-2 text-[.65rem] text-primary-400 border-primary-100 border-b mb-2">Use it</div>
        <div className="px-2 text-[.65rem] text-primary-400 border-primary-100 border-b mb-2">Label</div>
        <div className="px-2 text-[.65rem] text-primary-400 border-primary-100 border-b mb-2">Catalog</div>
        <div className="px-2 text-[.65rem] text-primary-400 border-primary-100 border-b mb-2">Value</div>
        <div className="px-2 text-[.65rem] text-primary-400 border-primary-100 border-b mb-2">Value type</div>
        <div className="px-2 text-[.65rem] text-primary-400 border-primary-100 border-b mb-2">Type</div>
    </>);
}

export function Part1_Fields({ fields }: { fields: Meta.Field[] | undefined; }) {
    return (<>
        {fields
            ? <>
                <div className="
                group
                p-2 w-min grid grid-cols-[max-content_minmax(5rem,1fr)_minmax(5rem,1fr)_minmax(5rem,1fr)_max-content_auto] items-center gap-x-2 gap-y-1 bg-primary-800 text-primary-200 rounded-sm"
                // data-highlighted
                >
                    <TableHeader />

                    {fields.map((field, idx) => <InputRow field={field} key={idx} />)}

                </div>
            </>
            :
            <div className="">no fields</div>
        }
        <ValueDropdown />
        {/* <DropdownMenu /> */}
    </>);
}
