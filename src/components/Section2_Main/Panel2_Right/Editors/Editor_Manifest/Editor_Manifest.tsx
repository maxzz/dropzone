import React, { HTMLAttributes, ReactNode, useState } from 'react';
import { atom, PrimitiveAtom, useAtom } from 'jotai';
import { FileUsAtomType } from '@/store';
import { UIArrow } from '@ui/UIArrow';
import { UIAccordion } from '@ui/UIAccordion';
import { LoginFields } from './Part1_Fields';
import { Part4_FormOptions } from './Part4_FormOptions';

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
                <Part4_FormOptions />
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

            {/* <se.SelectDemo /> */}
        </div>
    );
}
