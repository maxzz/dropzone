import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { FileUsAtomType, FormIdx, maniOpenSections } from '@/store';
import { Scroller } from '@ui/scroller';
import { SubSectionAccordion } from './2-sub-section-accordion';
import { NoForm } from './3-no-form';
import { ManiSection1_Fields } from '../1-tab-fields';
import { ManiSection2_Submit } from '../2-tab-submit/1-all';
import { ManiSection3_Policy } from '../3-tab-policy';
import { ManiSection4_FormOptions } from '../4-tab-form-options';

function FormItems({ fileUsAtom, formIdx }: { fileUsAtom: FileUsAtomType; formIdx: FormIdx; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const metaForm = fileUs.parsedSrc.meta?.[formIdx];
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
