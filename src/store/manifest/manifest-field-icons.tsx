import { FC } from 'react';
import { FieldTyp, Mani } from '@/store/manifest';
import { SymbolFieldBtn, SymbolFieldTxt, SymbolFieldChk, SymbolFieldLst, SymbolFieldPsw, SymbolFieldEdt } from '@ui/icons';

export const fieldIcons: Record<Exclude<keyof typeof FieldTyp, 'und'>, FC> = {
    edit: SymbolFieldEdt,
    psw: SymbolFieldPsw,
    check: SymbolFieldChk,
    radio: SymbolFieldChk,
    list: SymbolFieldLst,
    combo: SymbolFieldLst,
    text: SymbolFieldTxt,
    button: SymbolFieldBtn,
    listbx: SymbolFieldLst,
};

export type TypeFieldsForIcon = Pick<Mani.Field, 'type' | 'password' | 'choosevalue'>;

export function FieldTypeIconComponent({ field, className }: { field: TypeFieldsForIcon; className?: string; }) {
    const type = field.password
        ? "psw"
        : field.type as keyof typeof fieldIcons;

    const title =
        type === "list"
            ? `Field choices: ${field.choosevalue}`
            : `Field type: ${type}`;

    const Icon = fieldIcons[type]?.({ className, title }) || <div className="text-red-500">nan</div>;
    return Icon;
}
