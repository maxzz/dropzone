import React from 'react';
import { FileUsAtom, SelectRowAtoms } from '../../../../store/store';
import FieldRow from './FieldRow';
import { useAtom } from 'jotai';

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
    return (
        <div className="">
            {metaForm.fields?.map((field, idx) =>
                <React.Fragment key={idx}>
                    <FieldRow form={metaForm} field={field} selectRowAtoms={selectRowAtoms} />
                </React.Fragment>
            )}
        </div>
    );
}

export default FormFields;
