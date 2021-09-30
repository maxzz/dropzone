import React from 'react';
import { FormDatum } from './../CardDatum';
import FieldRow from './FieldRow/FieldRow';

function FormFields({ formDatum: { cardDatum, formIndex } }: { formDatum: FormDatum; }) {
    const metaForm = cardDatum.fileUs.meta?.[formIndex];
    if (!metaForm) {
        return null;
    }
    return (
        <div className="">
            <div className="">fields</div>
            {/* <div className="font-bold border-b border-gray-500"></div> */}
            {metaForm.fields?.map((field, idx) =>
                <React.Fragment key={idx}>
                    {/* <FieldPreview form={metaForm} field={field} /> */}
                    <FieldRow metaForm={metaForm} field={field} />
                </React.Fragment>
            )}
            {/* <div className="font-bold border-t border-gray-500"></div> */}
        </div>
    );
}
export default FormFields;
