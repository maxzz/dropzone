import React, { HTMLAttributes, InputHTMLAttributes, useState } from 'react';
import { atom, PrimitiveAtom, useAtom } from 'jotai';
import * as se from '../UISelect';
import { ChevronDownIcon, ChevronUpIcon, DotIcon } from '@radix-ui/react-icons';
import { FormRowTypeIcon } from '@/components/Section2_Main/Panel1_FilesList/Card/Part2Card_FormBody/Part2Form_Fields/FieldRowTypeIcon';

import * as primitiveSe from '@radix-ui/react-select';
import * as menu from '@radix-ui/react-dropdown-menu';
import { DropdownMenu } from '../../../../UI/nun/dmtest';
import { classNames, tw } from '@/utils/classnames';
import { Meta, references, valueAsNames } from '@/store/manifest';
import { IconChevronDown, IconDot } from '@ui/UIIconSymbols';

function Trigger<T>(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <primitiveSe.SelectTrigger className="w-6 h-6 bg-orange-800 text-primary-800">
            {props.children}
        </primitiveSe.SelectTrigger>
    );
}

const cnames2 = classNames(
    tw("relative pl-8 pr-4 py-2 text-xs flex items-center cursor-default select-none rounded-md outline-none"),
    tw("text-primary-700 data-highlighted:bg-primary-700 data-highlighted:text-primary-100"),
);

function ValueDropdown({ field }: { field: Meta.Field; }) {
    const [value, setValue] = useState(0);
    const textAtom = useState(atom(''))[0];
    const [text, setText] = useAtom(textAtom);
    function onSelectAsk(idx: number) {
        setValue(idx);
        setText(valueAsNames[idx]);
    }
    const fieldRefs = Object.entries(field.mani.password ? references.psw : references.txt);
    function onSelectRef(idx: number) {
        setValue(idx);
        setText(fieldRefs[idx][1]);
    }
    return (
        <div
            className={classNames(
                "grid grid-cols-[minmax(0,1fr)_auto] bg-primary-700 rounded overflow-hidden",
                "focus-within:ring-1 focus-within:ring-offset-1",
                "focus-within:ring-offset-primary-800 focus-within:ring-primary-400 ring-primary-600",
            )}
        >
            <input
                className={classNames(
                    "px-2 py-3 h-8 !bg-primary-700 !text-primary-200 outline-none",
                )}
                value={text}
                onChange={(event) => setText(event.target.value)}
                autoComplete="off" list="autocompleteOff" spellCheck={false}
            />

            <menu.Root>
                <menu.Trigger asChild>
                    <button className="px-2 border-l border-primary-800 outline-none group">
                        <IconChevronDown className="w-4 h-4 border-primary-500 rounded group-focus-within:border" />
                    </button>
                </menu.Trigger>

                <menu.Portal container={document.getElementById('portal')}>
                    <menu.Content
                        className={classNames(
                            "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
                            "px-1.5 py-1 grid grid-cols-1 rounded-lg shadow-md",
                            "bg-white dark:bg-gray-800"
                        )}
                    // "px-1.5 py-1 w-48 md:w-56 rounded-lg shadow-md",
                    // "px-1.5 py-1 grid grid-cols-1 rounded-lg shadow-md",
                    >
                        {valueAsNames.map((item, idx) =>
                            <menu.Item className={classNames(cnames2, value === idx && "bg-primary-200")}
                                //onClick={() => setValue(idx)} 
                                //onClick={(event) => { console.log('sel', event); }}
                                onSelect={() => onSelectAsk(idx)}
                                key={idx}
                            >
                                {value === idx && <IconDot className="absolute left-2 w-5 h-5 fill-primary-700" />}
                                <span className="flex-grow">{item}</span>
                            </menu.Item>
                        )}

                        <menu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />

                        {fieldRefs.map(([key, val], idx) =>
                            <menu.Item className={classNames(cnames2, value === idx && "bg-primary-200")}
                                onSelect={() => onSelectRef(idx)}
                                key={idx}
                            >
                                {value === idx && <IconDot className="absolute left-2 w-5 h-5 fill-primary-700" />}
                                <span className="flex-grow">{val}</span>
                            </menu.Item>
                        )}

                    </menu.Content>
                </menu.Portal>
            </menu.Root>

        </div>
    );
}

function InputField({ valueAtom, className, ...rest }: { valueAtom: PrimitiveAtom<string>; } & InputHTMLAttributes<HTMLInputElement>) {
    const [value, setValue] = useAtom(valueAtom);
    return (
        <input
            className={classNames(
                "px-2 py-3 h-8",
                "focus:ring-1 focus:ring-offset-1",
                "bg-primary-700 text-primary-200",
                "focus:ring-offset-primary-800 ring-primary-600 focus:ring-primary-400",
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

// function FieldValue({ isPsw, value }: { isPsw: boolean; value: number; }) {
//     return (
//         <>
//             <se.Select>
//                 <se.SelectTrigger aria-label="Food">
//                     <se.SelectValue /> <se.SelectIcon> <ChevronDownIcon /> </se.SelectIcon>
//                 </se.SelectTrigger>

//                 <se.SelectContent>
//                     <se.SelectScrollUpButton>
//                         <ChevronUpIcon />
//                     </se.SelectScrollUpButton>

//                     <se.SelectViewport>
//                         <se.SelectGroup>
//                             <se.SelectLabel>Fruits</se.SelectLabel>
//                             <SeGroupItem label="Ask - Resuse" value="1" />
//                             <SeGroupItem label="Ask - Confirm" value="2" />
//                             <SeGroupItem label="Ask Always" value="3" />
//                         </se.SelectGroup>

//                         {/* <se.SelectSeparator />

//                         <se.SelectGroup>
//                         </se.SelectGroup> */}

//                     </se.SelectViewport>

//                     <se.SelectScrollDownButton>
//                         <ChevronDownIcon />
//                     </se.SelectScrollDownButton>

//                 </se.SelectContent>
//             </se.Select>

//             {/* {isPsw
//                 ? <>
//                     <div className="">Windows Password</div>
//                 </>
//                 : <>
//                     <div className="">Windows User Name</div>
//                     <div className="">Windows User Principal Name</div>
//                     <div className="">Windows Domain\User Name</div>
//                     <div className="">Windows Domain</div>
//                     <div className="">Windows E-mail Address</div>
//                 </>
//             } */}
//         </>
//     );
// }

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
            className="place-self-center w-4 h-4 form-checkbox text-primary-700 bg-primary-800
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

        <ValueDropdown field={field} />

        {/* <FieldValue isPsw={false} value={2} /> */}
        <FieldType field={field} />
    </>);
}

const titles = ["Use it", "Label", "Catalog", "Value", "Type"];
function TableHeader() {
    return (<>
        {titles.map((title, idx) => (
            <div className="px-2 text-[.65rem] text-primary-400 border-primary-100 border-b mb-2" key={idx}>{title}</div>
        ))}
    </>);
}

export function Part1_Fields({ fields }: { fields: Meta.Field[] | undefined; }) {
    return (<>
        {fields
            ? <>
                <div className={classNames(
                    "p-2 grid grid-cols-[max-content_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-x-1 gap-y-1",
                    "bg-primary-800 text-primary-200 rounded-sm"
                )}>
                    <TableHeader />
                    {fields.map((field, idx) => <InputRow field={field} key={idx} />)}
                </div>
            </>
            : <div className="">no fields</div>
        }
        {/* <DropdownMenu /> */}
    </>);
}
