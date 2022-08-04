import React from 'react';
import { IconFieldBtn, IconFieldTxt, IconFieldChk, IconFieldLst, IconFieldPsw, IconFieldEdt } from '@ui/UIIconSymbols';

export function FormRowTypeIcon({ field, className }: { field: Mani.Field; className?: string; }) {
    const type = field.type as keyof typeof icons;
    const hint = `Field type: ${type}`;
    const props = { className, title: type !== "list" ? hint : `Field choices: ${field.choosevalue}` };
    const icons = {
        "edit": field.password ? IconFieldPsw : IconFieldEdt,
        "check": IconFieldChk,
        "list": IconFieldLst,
        "combo": IconFieldLst,
        "text": IconFieldTxt,
        "button": IconFieldBtn,
    }
    const Icon = icons[type](props);
    return (<>
        {Icon}
    </>);
}
