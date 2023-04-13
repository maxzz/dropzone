import React from 'react';
import { Mani } from '@/store/manifest';
import { IconFieldBtn, IconFieldTxt, IconFieldChk, IconFieldLst, IconFieldPsw, IconFieldEdt } from '@ui/UIIconSymbols';

type FieldIcon2 =
    | 'edit'
    | 'psw'
    | 'check'
    | 'list'
    | 'combo'
    | 'text'
    | 'button';

export const fieldIcons: Record<string, (props: React.SVGAttributes<SVGSVGElement> & React.HTMLAttributes<SVGSVGElement>) => JSX.Element> = {
    edit: IconFieldEdt,
    psw: IconFieldPsw,
    check: IconFieldChk,
    list: IconFieldLst,
    combo: IconFieldLst,
    text: IconFieldTxt,
    button: IconFieldBtn,
} as const;

type FieldIcon = keyof typeof fieldIcons;

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
