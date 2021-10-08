import React from 'react';
import { useAtom } from 'jotai';
import { FileUsAtom, SelectRowAtoms } from '../../../../store/store';
import FieldRow from './FieldRow';

type FormFieldsProps = {
    fileUsAtom: FileUsAtom;
    formType: number;
    selectRowAtoms: SelectRowAtoms;
};

function FormFields({ fileUsAtom, formType, selectRowAtoms }: FormFieldsProps) {
    const [fileUs] = useAtom(fileUsAtom);
    const metaForm = fileUs.meta?.[formType];
    if (!metaForm) {
        return null;
    }
    return (<>{
        metaForm.fields?.map((field, idx) =>
            <FieldRow fileUs={fileUs}form={metaForm} field={field} selectRowAtoms={selectRowAtoms} key={idx} />
        )
    }</>);
}

export default FormFields;
