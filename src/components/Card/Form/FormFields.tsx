import React from 'react';
import { SelectRowAtoms } from '../../../store/store';
import { FormDatum } from './../CardDatum';
import FieldRow, { FieldRowOld } from './FieldRow/FieldRow';

type FormFieldsProps = {
    formDatum: FormDatum;
    selectRowAtoms: SelectRowAtoms;
};

function FormFields({ formDatum, selectRowAtoms }: FormFieldsProps) {
    const metaForm = formDatum.cardDatum.fileUs.meta?.[formDatum.formIndex];
    if (!metaForm) {
        return null;
    }
    return (
        <div className="">
            {/* <div className="">fields</div> */}
            {/* <div className="font-bold border-b border-gray-500"></div> */}
            {metaForm.fields?.map((field, idx) =>
                <React.Fragment key={idx}>
                    {/* <FieldPreview form={metaForm} field={field} /> */}
                    {/* <FieldRowOld metaForm={metaForm} field={field} /> */}
                    <FieldRow form={metaForm} field={field} selectRowAtoms={selectRowAtoms} />
                </React.Fragment>
            )}
            {/* <div className="font-bold border-t border-gray-500"></div> */}
        </div>
    );
}

export default FormFields;
