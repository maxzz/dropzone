import React from 'react';
import { CardData } from './Card';
import TableField from './FieldRow';

function PartFormFields({ cardData, formIndex }: { cardData: CardData; formIndex: number; }) {
    const metaForm = cardData.fileUs.meta?.[formIndex];
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
                    <TableField metaForm={metaForm} field={field} />
                </React.Fragment>
            )}
            {/* <div className="font-bold border-t border-gray-500"></div> */}
        </div>
    );
}
export default PartFormFields;
