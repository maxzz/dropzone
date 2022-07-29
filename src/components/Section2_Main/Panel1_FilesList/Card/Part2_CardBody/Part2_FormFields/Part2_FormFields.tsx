import React from 'react';
import { useAtomValue } from 'jotai';
import { FileUsAtomType, SelectRowAtomsType } from '@/store';
import { FieldRow } from './FieldRow';

type Part2_FormFieldsProps = {
    fileUsAtom: FileUsAtomType;
    formType: number;
    selectRowAtoms: SelectRowAtomsType;
};

export function Part2_FormFields({ fileUsAtom, formType, selectRowAtoms }: Part2_FormFieldsProps) {
    const fileUs = useAtomValue(fileUsAtom);
    const metaForm = fileUs.meta?.[formType];
    if (!metaForm) {
        return null;
    }
    return (<>
        {metaForm.fields?.map((field, idx) => (
            <FieldRow fileUs={fileUs} form={metaForm} field={field} selectRowAtoms={selectRowAtoms} key={idx} />
        ))}
    </>);
}
