import React, { HTMLAttributes, ReactNode, useState } from 'react';
import { atom, PrimitiveAtom, useAtom } from 'jotai';
import { FileUsAtomType } from '@/store';
import SelectDemo from './UISelect';
import { UIArrow } from '@ui/UIArrow';
import { UIAccordion } from '@ui/UIAccordion';
import { classNames } from '@/utils/classnames';

function SubSection({ label, openAtom, children }: { label: ReactNode; openAtom: PrimitiveAtom<boolean>; } & HTMLAttributes<HTMLDivElement>) {
    const [open, setOpen] = useAtom(openAtom);
    return (<>
        <div className="flex items-center cursor-pointer px-2 pb-1" onClick={() => setOpen(v => !v)}>
            <UIArrow className="w-4 h-4 pt-1 text-red-500" open={open} />
            <div className="text-base text-red-500">
                {label}
            </div>
        </div>
        <UIAccordion open={open}>
            <div className="ml-12">
                {children}
            </div>
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
        loginAtom: atom<boolean>(false),
        fieldsAtom: atom<boolean>(false),
        submitAtom: atom<boolean>(false),
        policyAtom: atom<boolean>(false),
        optionsAtom: atom<boolean>(false),
    });
    return (<>
        <SubSection label={<div className="text-lg border-red-500 border-b">Login</div>} openAtom={atoms.loginAtom}>
            <div className="pl-4">
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
            </div>

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

            <SelectDemo />
        </div>
    );
}
