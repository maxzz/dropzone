import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { FileUsAtomType, SelectRowAtomsType } from '@/store';
import { FieldRow } from './FieldRow';

type FormFieldsProps = {
    fileUsAtom: FileUsAtomType;
    formType: number;
    selectRowAtoms: SelectRowAtomsType;
};

export function FormFields({ fileUsAtom, formType, selectRowAtoms }: FormFieldsProps) {
    const fileUs = useAtomValue(fileUsAtom);
    const metaForm = fileUs.meta?.[formType];
    if (!metaForm) {
        return null;
    }
    return (<>{
        metaForm.fields?.map((field, idx) =>
            <FieldRow fileUs={fileUs} form={metaForm} field={field} selectRowAtoms={selectRowAtoms} key={idx} />
        )
    }</>);
}
