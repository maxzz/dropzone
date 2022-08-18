import React, { HTMLAttributes, ReactNode, useState } from 'react';
import { atom, PrimitiveAtom, useAtom } from 'jotai';
import { FileUsAtomType } from '@/store';
import { UIArrow } from '@ui/UIArrow';
import { UIAccordion } from '@ui/UIAccordion';
import { Part1_Fields } from './Part1_Fields';
import { Part2_Submit } from './Part2_Submit';
import { Part3_Policy } from './Part3_Policy';
import { Part4_FormOptions } from './Part4_FormOptions';

function SubSection({ label, openAtom, children }: { label: ReactNode; openAtom: PrimitiveAtom<boolean>; } & HTMLAttributes<HTMLDivElement>) {
    const [open, setOpen] = useAtom(openAtom);
    return (<>
        <div className="pb-1 text-base flex items-center select-none cursor-pointer text-[#32ffdaa0]" onClick={() => setOpen(v => !v)}>
            <UIArrow className="w-4 h-4 pt-1" open={open} />
            {label}
        </div>

        <UIAccordion open={open}>
            <div className="ml-4 pt-2 pb-4">
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
                <Part1_Fields />
            </SubSection>

            <SubSection label="Submit options" openAtom={atoms.submitAtom}>
                <Part2_Submit />
            </SubSection>

            <SubSection label="Policy" openAtom={atoms.policyAtom}>
                <Part3_Policy />
            </SubSection>

            <SubSection label="Form options" openAtom={atoms.optionsAtom}>
                <Part4_FormOptions />
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
