import React, { HTMLAttributes, ReactNode } from 'react';
import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { FileUsAtomType, FormIdx, maniOpenSections } from '@/store';
import { UiArrow } from '@ui/ui-arrow';
import { UiAccordion } from '@ui/ui-accordion';
import { Scroller } from '../../scroller';
import { ManiSection1_Fields } from '../1-tab-fields';
import { ManiSection2_Submit } from '../2-tab-submit/0-all';
import { ManiSection3_Policy } from '../3-tab-policy';
import { ManiSection4_FormOptions } from '../4-tab-form-options';

function NoForm(formType: FormIdx) {
    const label = formType === FormIdx.login ? "No login form" : "No password change form";
    return (
        <div className="px-4 text-lg text-[#32ffdaa0] select-none">
            {label}
        </div>
    );
}

function SubSectionAccordion({ label, openAtom, children }: { label: ReactNode; openAtom: PrimitiveAtom<boolean>; } & HTMLAttributes<HTMLDivElement>) {
    const [open, setOpen] = useAtom(openAtom);
    return (<>
        <div className="inline-block">
            <div className="pb-1 text-base flex items-center select-none cursor-pointer text-[#32ffdaa0]" onClick={() => setOpen(v => !v)}>
                <UiArrow className="w-4 h-4 pt-1" open={open} />
                {label}
            </div>
        </div>

        <UiAccordion open={open}>
            <div className="ml-4 pt-2 pb-4">
                {children}
            </div>
        </UiAccordion>
    </>);
}

function FormItems({ fileUsAtom, formIdx }: { fileUsAtom: FileUsAtomType; formIdx: FormIdx; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const metaForm = fileUs.meta?.[formIdx];
    const title = formIdx === FormIdx.login ? "Login" : "Password change";
    const openNow = maniOpenSections[formIdx];
    return (!metaForm ? NoForm(formIdx) :
        <SubSectionAccordion label={<div className="text-lg">{title}</div>} openAtom={openNow.formAtom}>

            <SubSectionAccordion label="Fields" openAtom={openNow.fieldsAtom}>
                <ManiSection1_Fields fields={metaForm.fields} />
            </SubSectionAccordion>

            <SubSectionAccordion label="Submit options" openAtom={openNow.submitAtom}>
                <ManiSection2_Submit form={metaForm} />
            </SubSectionAccordion>

            <SubSectionAccordion label="Policy" openAtom={openNow.policyAtom}>
                <ManiSection3_Policy fileUsAtom={fileUsAtom} formIdx={formIdx} />
            </SubSectionAccordion>

            <SubSectionAccordion label="Form options" openAtom={openNow.optionsAtom}>
                <ManiSection4_FormOptions fileUsAtom={fileUsAtom} formIdx={formIdx} />
            </SubSectionAccordion>

        </SubSectionAccordion>
    );
}

export function Body_Manifest({ fileUsAtom, ...rest }: { fileUsAtom: FileUsAtomType; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <Scroller {...rest}>
            <div className="min-w-[30rem] max-w-[56rem]">
                <FormItems fileUsAtom={fileUsAtom} formIdx={FormIdx.login} />
                <FormItems fileUsAtom={fileUsAtom} formIdx={FormIdx.cpass} />
            </div>
        </Scroller>
    );
}
