import React, { HTMLAttributes, ReactNode, useState } from 'react';
import { atom, PrimitiveAtom, useAtom } from 'jotai';
import { FileUsAtomType } from '@/store';
import SelectDemo from './UISelect';
import { UIArrow } from '@ui/UIArrow';
import { UIAccordion } from '@ui/UIAccordion';
import { classNames } from '@/utils/classnames';

function Separator({ label, tall = true, className, ...rest }: { label?: ReactNode; tall?: boolean; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("relative select-none", className)} {...rest}>

            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                {/* <div className="w-full border-t-primary-300 border-t"></div> */}{/* wiredjs.com */}
                <svg className="stroke-transparent fill-primary-500" viewBox="0 0 600 6">
                    <path d="M.72 2.21c142.84.73 287.01.51 598.74 1M.01 3.09C214.67 4.2 428.48 4.18 600 2.6" />
                </svg>
            </div>

            <div className={tall ? "relative flex justify-center" : "absolute inset-0 flex items-center justify-center"}>
                {label}
            </div>
        </div>
    );
}

function SubSection({ label, openAtom, children }: { label: ReactNode; openAtom: PrimitiveAtom<boolean>; } & HTMLAttributes<HTMLDivElement>) {
    const [open, setOpen] = useAtom(openAtom);
    return (<>
        <Separator
            label={
                <div className="flex items-center cursor-pointer px-2 pb-1 bg-primary-100">
                    <div className="text-red-500">
                        <span className="">
                            {label}
                        </span>
                    </div>
                    <UIArrow className="w-4 h-4 pt-1 text-primary-500" open={open} />
                </div>
            }
            onClick={() => setOpen(v => !v)}
        />
        <UIAccordion open={open}>
            {children}
        </UIAccordion>
    </>);
}


function LoginFields({ }: {}) {
    return (<>
        <div className="">User name</div>
        <div className="">Password</div>
    </>);
}

function Values({ isPsw }: { isPsw: boolean; }) {
    return (<>
        <div className="">Ask - Resuse</div>
        <div className="">Ask - Confirm</div>
        <div className="">Ask always</div>
        {isPsw
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
        }
    </>);
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
        fieldsAtom: atom<boolean>(false),
        submitAtom: atom<boolean>(false),
        optionsAtom: atom<boolean>(false),
    });
    return (<>
        <div className="text-lg border-red-500 border-b">Login</div>
        <div className="pl-4">
            <SubSection label="Fields" openAtom={atoms.fieldsAtom}>
                <div className="pl-4">
                    <LoginFields />
                </div>
            </SubSection>

            <SubSection label="Submit options" openAtom={atoms.submitAtom}>
                <div className="pl-4">
                    <SubmitOptions />
                </div>
            </SubSection>

            <SubSection label="Form options" openAtom={atoms.optionsAtom}>
                <div className="pl-4">
                    <div className="">General</div>
                    <div className="">Quick link</div>
                    <div className="">Screen detection</div>
                    <div className="">Authentication</div>
                </div>
            </SubSection>
        </div>
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

            <SelectDemo />
        </div>
    );
}
