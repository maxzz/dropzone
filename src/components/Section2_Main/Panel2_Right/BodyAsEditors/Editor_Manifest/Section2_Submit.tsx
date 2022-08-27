import { FieldTyp, Meta } from '@/store/manifest';
import React from 'react';

export function Section2_Submit({ form }: { form: Meta.Form | undefined; }) {
    const ourFields = form?.fields?.filter((field) => field.ftyp === FieldTyp.button);
    return (<>
        {ourFields?.map((field, idx) => (
            <div className="" key={idx}>
                {field.mani.displayname}
            </div>
        ))}
        <hr />
        <div className="">Do Not Submit</div>
        <div className="">Automatically submit login data</div>
    </>);
}
