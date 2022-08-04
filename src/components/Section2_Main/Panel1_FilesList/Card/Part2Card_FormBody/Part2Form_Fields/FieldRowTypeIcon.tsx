import React from 'react';
import { IconFieldBtn, IconFieldTxt, IconFieldChk, IconFieldLst, IconFieldPsw, IconFieldEdt } from '@ui/UIIconSymbols';

export function FormRowTypeIcon({ field, className }: { field: Mani.Field; className?: string; }) {
    const hint = `Field type: ${field.type}`;
    const props = { className, title: field.type !== "list" ? hint : `Field choices: ${field.choosevalue}` };
    const icons = {
        "edit": field.password ? IconFieldPsw : IconFieldEdt,
    }
    return (<>
        {icons["edit"](props)}
        {/* {field.type === "edit" && (field.password ? <>{IconFieldPsw(props)}</> : <>{IconFieldEdt(props)}</>)}
        {field.type === "check" && <>{IconFieldChk(props)}</>}
        {(field.type === "list" || field.type === "combo") && <IconFieldLst {...props} />}
        {field.type === "text" && <IconFieldTxt className={className} title={hint} />}
        {field.type === "button" && <IconFieldBtn className={className} title={hint} />} */}
    </>);
}
