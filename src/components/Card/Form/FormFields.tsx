import { PrimitiveAtom } from 'jotai';
import React from 'react';
import { FormDatum } from './../CardDatum';
import FieldRow, { FieldRowOld } from './FieldRow/FieldRow';

type FormFieldsProps = {
    formDatum: FormDatum;
    selectedLoginRowAtom: PrimitiveAtom<number>;
    selectedCPassRowAtom: PrimitiveAtom<number>;
};

function FormFields({ formDatum, selectedLoginRowAtom, selectedCPassRowAtom }: FormFieldsProps) {
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
                    <FieldRow form={metaForm} field={field} selectedLoginRowAtom={selectedLoginRowAtom} selectedCPassRowAtom={selectedCPassRowAtom} />
                </React.Fragment>
            )}
            {/* <div className="font-bold border-t border-gray-500"></div> */}
        </div>
    );
}

export default FormFields;
