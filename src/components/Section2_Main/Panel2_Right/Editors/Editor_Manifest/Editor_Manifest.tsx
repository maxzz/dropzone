import React, { HTMLAttributes, ReactNode, useState } from 'react';
import { atom, PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { FileUsAtomType, FormIdx } from '@/store';
import { UIArrow } from '@ui/UIArrow';
import { UIAccordion } from '@ui/UIAccordion';
import { Part1_Fields } from './Part1_Fields';
import { Part2_Submit } from './Part2_Submit';
import { Part3_Policy } from './Part3_Policy';
import { Part4_FormOptions } from './Part4_FormOptions';
import { Atomize } from '@/hooks/atomsX';

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

type ManiOpenSections = {
    form: boolean;
    fields: boolean;
    submit: boolean;
    policy: boolean;
    options: boolean;
};

function createFormOpenSections(): Atomize<ManiOpenSections> {
    return {
        formAtom: atom<boolean>(true),
        fieldsAtom: atom<boolean>(true),
        submitAtom: atom<boolean>(false),
        policyAtom: atom<boolean>(false),
        optionsAtom: atom<boolean>(false),
    };
}

function Form_Login({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const [atoms] = useState(createFormOpenSections());
    const fileUs = useAtomValue(fileUsAtom);
    const formType = FormIdx.login;
    const metaForm = fileUs.meta?.[formType];
    return (<>
        <SubSection label={<div className="text-lg">Login</div>} openAtom={atoms.formAtom}>

            <SubSection label="Fields" openAtom={atoms.fieldsAtom}>
                <Part1_Fields fields={metaForm?.fields} />
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

function Form_PChange({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const [atoms] = useState(createFormOpenSections());
    const fileUs = useAtomValue(fileUsAtom);
    const formType = FormIdx.cpass;
    const metaForm = fileUs.meta?.[formType];
    return (<>
        <SubSection label={<div className="text-lg">Password change</div>} openAtom={atoms.formAtom}>

            <SubSection label="Fields" openAtom={atoms.fieldsAtom}>
                <Part1_Fields fields={metaForm?.fields} />
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

export function Editor_Manifest({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    return (
        <div>
            <Form_Login fileUsAtom={fileUsAtom} />
            <Form_PChange fileUsAtom={fileUsAtom} />

            {/* <se.SelectDemo /> */}
        </div>
    );
}
