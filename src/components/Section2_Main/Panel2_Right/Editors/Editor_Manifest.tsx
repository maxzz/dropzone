import React, { HTMLAttributes, InputHTMLAttributes, ReactNode, useState } from 'react';
import { atom, PrimitiveAtom, useAtom } from 'jotai';
import { FileUsAtomType } from '@/store';
import * as se from './UISelect';
import { UIArrow } from '@ui/UIArrow';
import { UIAccordion } from '@ui/UIAccordion';
import { classNames } from '@/utils/classnames';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, DotIcon } from '@radix-ui/react-icons';

function SubSection({ label, openAtom, children }: { label: ReactNode; openAtom: PrimitiveAtom<boolean>; } & HTMLAttributes<HTMLDivElement>) {
    const [open, setOpen] = useAtom(openAtom);
    return (<>
        <div className="pb-1 text-base flex items-center select-none cursor-pointer text-[#32ffdaa0]" onClick={() => setOpen(v => !v)}>
            <UIArrow className="w-4 h-4 pt-1" open={open} />
            {label}
        </div>

        <UIAccordion open={open}>
            <div className="ml-4 py-2">
                {children}
            </div>
        </UIAccordion>
    </>);
}

function InputField({ value, placeholder }: InputHTMLAttributes<HTMLInputElement>) {
    const [value1, setValue] = useState(value);
    return (
        <input
            className="px-2 py-3 min-w-[5rem] h-8 bg-primary-800 text-primary-200 rounded"
            placeholder={placeholder}
            value={value1}
            onChange={(event) => setValue(event.target.value)}
        />
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
        <input type="checkbox" checked={useIt} onChange={()=>setUseIt(v=>!v)} />
        <InputField value="Username" placeholder="Label" />
        <FieldType value={1} /> {/* <div className="px-2 border-primary-800 border-l border-r">text</div> */}
        <InputField value="" placeholder="Username" />
        <FieldValue isPsw={false} value={2} />
    </>);
}

function LoginFields({ }: {}) {
    return (<>
        <div className="p-2 w-min grid grid-cols-[auto_minmax(5rem,1fr)_auto_minmax(5rem,1fr)_max-content] items-center gap-x-2 gap-y-1 bg-primary-800 text-primary-200 rounded-sm">

            <div className="text-[.65rem] text-primary-400 border-primary-100 border-b mb-2">Use it</div>
            <div className="text-[.65rem] text-primary-400 border-primary-100 border-b mb-2">Label</div>
            <div className="text-[.65rem] text-primary-400 border-primary-100 border-b mb-2">Type</div>
            <div className="text-[.65rem] text-primary-400 border-primary-100 border-b mb-2">Value</div>
            <div className="text-[.65rem] text-primary-400 border-primary-100 border-b mb-2">Value type</div>

            {/* <input type="checkbox" />
            <InputField value="Username" placeholder="Label" />
            <FieldType value={1} /> {/* <div className="px-2 border-primary-800 border-l border-r">text</div> * /}
            <InputField value="" placeholder="Username" />
            <FieldValue isPsw={false} value={2} /> */}
            <InputRow />

            <input type="checkbox" />
            <InputField value="Password" placeholder="Label" />
            <FieldType value={2} />  {/* <div className="px-2 border-primary-800 border-l border-r">password</div> */}
            <InputField value={"123"} />
            <FieldValue isPsw={false} value={1} />
        </div>
    </>);
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

function SubmitOptions({ }: {}) {
    return (<>
        <div className="">Do Not Submit</div>
        <div className="">Automatically submit login data</div>
    </>);
}

function QL({ }: {}) {
    return (<>
        <div className="">Display on mini-dashboard</div>
        <div className="">Quick Link Name</div>
        <div className="">Quick Link URL</div>
    </>);
}

function ScreenDetection({ }: {}) {
    return (<>
        <div className="">Windows Caption</div>
        <div className="">Monitor screen changes</div>
        <div className="">URL</div>
    </>);
}

function Authentication({ }: {}) {
    return (<>
        <div className="">Start authentication immediately</div>
        <div className="">Lock out login fields</div>
    </>);
}

function PasswordManagerIcon({ }: {}) {
    return (<>
        <div className="">Location ID</div>
        <div className="">Location</div>
    </>);
}

function Form_Login() {
    const [atoms] = useState({
        loginAtom: atom<boolean>(true),
        fieldsAtom: atom<boolean>(true),
        submitAtom: atom<boolean>(false),
        policyAtom: atom<boolean>(false),
        optionsAtom: atom<boolean>(false),
    });
    return (<>
        <SubSection label={<div className="text-lg">Login</div>} openAtom={atoms.loginAtom}>

            <SubSection label="Fields" openAtom={atoms.fieldsAtom}>
                <LoginFields />
            </SubSection>

            <SubSection label="Submit options" openAtom={atoms.submitAtom}>
                <SubmitOptions />
            </SubSection>

            <SubSection label="Policy" openAtom={atoms.policyAtom}>
                <div className="">Policy</div>
            </SubSection>

            <SubSection label="Form options" openAtom={atoms.optionsAtom}>
                <div className="">General</div>
                <div className="">Quick link</div>
                <div className="">Screen detection</div>
                <div className="">Authentication</div>
            </SubSection>


        </SubSection>
    </>);
}

function Form_PChange() {
    return (<>
        <div className="text-lg border-red-500 border-b">Password change</div>

        <div className="">Fields</div>

        <div className="">Submit options</div>

        <div className="">Form options</div>
        <div className="">
            <div className="">General</div>
            <div className="">Quick link</div>
            <div className="">Screen detection</div>
            <div className="">Authentication</div>
        </div>
    </>);
}

export function Editor_Manifest({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const [fileUs] = useAtom(fileUsAtom);
    return (
        <div>
            <Form_Login />
            <Form_PChange />

            <se.SelectDemo />
        </div>
    );
}
