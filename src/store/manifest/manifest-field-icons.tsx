import { ReactNode, type FC } from 'react';
import { type FieldTyp, type Mani } from '@/store/manifest';
import { SymbolFieldBtn, SymbolFieldTxt, SymbolFieldChk, SymbolFieldLst, SymbolFieldPsw, SymbolFieldEdt } from '@ui/icons';

type FieldValidKeys = Exclude<keyof typeof FieldTyp, 'und'>;

export const fieldIcons: Record<FieldValidKeys, (props: {}) => ReactNode> = { // remove Promise<ReactNode> from value
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

export type FieldPartsToSelectIcon = Pick<Mani.Field, 'type' | 'password' | 'choosevalue'>;

export function FieldTypeIconComponent({ field, className, title }: { field: FieldPartsToSelectIcon; className?: string; title?: string; }) {
    const type = field.password
        ? "psw"
        : field.type as keyof typeof fieldIcons;

    const Icon = fieldIcons[type]?.({ className, title }) || <div className="text-red-500">nan</div>;
    return Icon;
}

export const fieldTitle: Record<FieldValidKeys, string> = {
    edit: 'edit',
    psw: 'psw',
    check: 'checkbox',
    radio: 'radio button',
    list: 'listbox',
    combo: 'combobox',
    text: 'text',
    button: 'button',
    listbx: 'listbox',
};

export function fieldTypeTitle(field: FieldPartsToSelectIcon) {
    const type = field.password
        ? "psw"
        : field.type as keyof typeof fieldTitle;
    const typeName = fieldTitle[type]

    const title =
        type === "list"
            ? `Field ${typeName} choices:\n${field.choosevalue?.split(':').join('\n') || 'No choices'}`
            : `Field type: ${typeName}`;
    return title;
}
