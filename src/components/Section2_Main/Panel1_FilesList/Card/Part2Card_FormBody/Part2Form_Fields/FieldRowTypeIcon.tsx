import React from 'react';
import { IconFieldBtn, IconFieldTxt, IconFieldChk, IconFieldLst, IconFieldPsw, IconFieldEdt } from '@ui/UIIconSymbols';

export function FormRowTypeIcon({ field, className }: { field: Mani.Field; className?: string; }) {
    const hint = `Field type: ${field.type}`;
    return (<>
        {field.type === "edit" && (field.password
            ? <IconFieldPsw className={className} title={hint} />
            : <IconFieldEdt className={className} title={hint} />)
        }
        {/* {field.type === "check" && <IconFieldChk className={className} title={hint} />} */}
        {field.type === "check" &&  <>{IconFieldChk({className, title: hint})}</>}
        {(field.type === "list" || field.type === "combo") && <IconFieldLst className={className} title={`Field choices: ${field.choosevalue}`} />}
        {field.type === "text" && <IconFieldTxt className={className} title={hint} />}
        {field.type === "button" && <IconFieldBtn className={className} title={hint} />}
    </>);
}
