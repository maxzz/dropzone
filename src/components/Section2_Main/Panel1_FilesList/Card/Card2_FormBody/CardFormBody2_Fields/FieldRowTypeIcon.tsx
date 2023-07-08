import React from 'react';
import { Mani } from '@/store/manifest';
import { SymbolFieldBtn, SymbolFieldTxt, SymbolFieldChk, SymbolFieldLst, SymbolFieldPsw, SymbolFieldEdt } from '@ui/icons';

export const fieldIcons = {
    edit: SymbolFieldEdt,
    psw: SymbolFieldPsw,
    check: SymbolFieldChk,
    list: SymbolFieldLst,
    combo: SymbolFieldLst,
    text: SymbolFieldTxt,
    button: SymbolFieldBtn,
};

export function FormRowTypeIcon({ field, className }: { field: Mani.Field; className?: string; }) {
    const type = field.password ? "psw" : field.type as keyof typeof fieldIcons;
    const Icon =
        fieldIcons[type]?.({
            className,
            title: type !== "list"
                ? `Field type: ${type}`
                : `Field choices: ${field.choosevalue}`,
        })
        || <div className="text-red-500">nan</div>;
    return Icon;
}
