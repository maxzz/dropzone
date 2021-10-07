import React from 'react';
import { FormDatum } from './../CardDatum';
import { SelectRowAtoms } from '../../../store/store';
import FieldRow from './FieldRow/FieldRow';
import { useAtom } from 'jotai';

type FormFieldsProps = {
    formDatum: FormDatum;
    selectRowAtoms: SelectRowAtoms;
};

function FormFields({ formDatum, selectRowAtoms }: FormFieldsProps) {
    const [fileUs] = useAtom(formDatum.fileUsAtom);
    const metaForm = fileUs.meta?.[formDatum.formIndex];
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
