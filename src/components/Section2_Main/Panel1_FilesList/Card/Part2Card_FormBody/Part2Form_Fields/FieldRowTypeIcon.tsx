import React from 'react';
import { Mani } from '@/store/manifest';
import { IconFieldBtn, IconFieldTxt, IconFieldChk, IconFieldLst, IconFieldPsw, IconFieldEdt } from '@ui/UIIconSymbols';

const fieldIcons = {
    edit: IconFieldEdt,
    psw: IconFieldPsw,
    check: IconFieldChk,
    list: IconFieldLst,
    combo: IconFieldLst,
    text: IconFieldTxt,
    button: IconFieldBtn,
};

export function FormRowTypeIcon({ field, className }: { field: Mani.Field; className?: string; }) {
    const type = field.password ? "psw" : field.type as keyof typeof fieldIcons;
    const Icon =
        fieldIcons[type]?.({ className, title: type !== "list" ? `Field type: ${type}` : `Field choices: ${field.choosevalue}`, })
        || <div className="text-red-500">nan</div>;
    return Icon;
}
