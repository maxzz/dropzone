import React from 'react';
import { FieldTyp, Meta } from '@/store/manifest';

export function Section2_Submit({ form }: { form: Meta.Form | undefined; }) {
    const isWeb = !!form?.mani.detection.web_ourl;
    const ourFields = form?.fields?.filter((field) => field.ftyp === FieldTyp.button);
    return (<>
        <div className="">Do Not Submit</div>

        {isWeb
            ? <div className="">Automatically submit login data</div>
            : <>
                <hr />
                {ourFields?.map((field, idx) => (
                    <div className="" key={idx}>
                        {field.mani.displayname}
                    </div>
                ))}
            </>
        }
    </>);
}
