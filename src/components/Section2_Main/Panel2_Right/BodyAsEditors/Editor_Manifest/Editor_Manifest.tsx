import React, { HTMLAttributes, ReactNode } from 'react';
import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { FileUsAtomType, FormIdx, maniOpenSections } from '@/store';
import { UIArrow } from '@ui/UIArrow';
import { UIAccordion } from '@ui/UIAccordion';
import { Section1_Fields } from './Section1_Fields/Section1_Fields';
import { Section2_Submit } from './Section2_Submit';
import { Section3_Policy } from './Section3_Policy';
import { Section4_FormOptions } from './Section4_FormOptions';

function NoForm(formType: FormIdx) {
    const label = formType === FormIdx.login ? "No login form" : "No password change form";
    return <div className="px-4 text-lg text-[#32ffdaa0] select-none">
        {label}
    </div>;
}

function SubSection({ label, openAtom, children }: { label: ReactNode; openAtom: PrimitiveAtom<boolean>; } & HTMLAttributes<HTMLDivElement>) {
    const [open, setOpen] = useAtom(openAtom);
    return (<>
        <div className="inline-block">
            <div className="pb-1 text-base flex items-center select-none cursor-pointer text-[#32ffdaa0]" onClick={() => setOpen(v => !v)}>
                <UIArrow className="w-4 h-4 pt-1" open={open} />
                {label}
            </div>
        </div>

        <UIAccordion open={open}>
            <div className="ml-4 pt-2 pb-4">
                {children}
            </div>
        </UIAccordion>
    </>);
}

function FormItems({ fileUsAtom, formType }: { fileUsAtom: FileUsAtomType; formType: FormIdx; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const metaForm = fileUs.meta?.[formType];
    const title = formType === FormIdx.login ? "Login" : "Password change";
    const openSections = maniOpenSections[formType];
    return (!metaForm ? NoForm(formType) :
        <SubSection label={<div className="text-lg">{title}</div>} openAtom={openSections.formAtom}>

            <SubSection label="Fields" openAtom={openSections.fieldsAtom}>
                <Section1_Fields fields={metaForm?.fields} />
            </SubSection>

            <SubSection label="Submit options" openAtom={openSections.submitAtom}>
                <Section2_Submit form={metaForm} />
            </SubSection>

            <SubSection label="Policy" openAtom={openSections.policyAtom}>
                <Section3_Policy fileUsAtom={fileUsAtom} formType={formType} />
            </SubSection>

            <SubSection label="Form options" openAtom={openSections.optionsAtom}>
                <Section4_FormOptions />
            </SubSection>

        </SubSection>
    );
}

export function Editor_Manifest({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    return (
        <div className="min-w-[34rem]">
            <FormItems fileUsAtom={fileUsAtom} formType={FormIdx.login} />
            <FormItems fileUsAtom={fileUsAtom} formType={FormIdx.cpass} />
        </div>
    );
}
