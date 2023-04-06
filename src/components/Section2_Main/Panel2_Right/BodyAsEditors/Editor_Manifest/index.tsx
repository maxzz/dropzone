import React, { HTMLAttributes, ReactNode } from 'react';
import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { FileUsAtomType, FormIdx, maniOpenSections } from '@/store';
import { UIArrow } from '@ui/UIArrow';
import { UIAccordion } from '@ui/UIAccordion';
import { ManiSection1_Fields } from './ManiSection1_Fields';
import { ManiSection2_Submit } from './ManiSection2_Submit';
import { ManiSection3_Policy } from './ManiSection3_Policy';
import { ManiSection4_FormOptions } from './ManiSection4_FormOptions';

function NoForm(formType: FormIdx) {
    const label = formType === FormIdx.login ? "No login form" : "No password change form";
    return (
        <div className="px-4 text-lg text-[#32ffdaa0] select-none">
            {label}
        </div>
    );
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

function FormItems({ fileUsAtom, formIdx }: { fileUsAtom: FileUsAtomType; formIdx: FormIdx; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const metaForm = fileUs.meta?.[formIdx];
    const title = formIdx === FormIdx.login ? "Login" : "Password change";
    const openSections = maniOpenSections[formIdx];
    return (!metaForm ? NoForm(formIdx) :
        <SubSection label={<div className="text-lg">{title}</div>} openAtom={openSections.formAtom}>

            <SubSection label="Fields" openAtom={openSections.fieldsAtom}>
                <ManiSection1_Fields fields={metaForm?.fields} />
            </SubSection>

            <SubSection label="Submit options" openAtom={openSections.submitAtom}>
                <ManiSection2_Submit form={metaForm} />
            </SubSection>

            <SubSection label="Policy" openAtom={openSections.policyAtom}>
                <ManiSection3_Policy fileUsAtom={fileUsAtom} formIdx={formIdx} />
            </SubSection>

            <SubSection label="Form options" openAtom={openSections.optionsAtom}>
                <ManiSection4_FormOptions fileUsAtom={fileUsAtom} formIdx={formIdx} />
            </SubSection>

        </SubSection>
    );
}

export function Editor_Manifest({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    return (
        <div className="min-w-[34rem]">
            <FormItems fileUsAtom={fileUsAtom} formIdx={FormIdx.login} />
            <FormItems fileUsAtom={fileUsAtom} formIdx={FormIdx.cpass} />
        </div>
    );
}
