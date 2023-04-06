import React, { InputHTMLAttributes } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { Meta } from '@/store/manifest';
import { classNames } from '@/utils';
import { FormRowTypeIcon } from '@/components/Section2_Main/Panel1_FilesList/Card/Card2_FormBody/CardFormBody2_Fields/FieldRowTypeIcon';

export function Column5_Type({ useItAtom, field, className, ...rest }: { useItAtom: PrimitiveAtom<boolean>; field: Meta.Field; } & InputHTMLAttributes<HTMLInputElement>) {
    const { password, type = 'NOTYPE' } = field.mani;
    const [useIt, setUseIt] = useAtom(useItAtom);
    return (
        <div className={classNames("flex items-center space-x-0.5 select-none", !useIt && "opacity-30 cursor-pointer", className)} {...rest}>
            <FormRowTypeIcon field={field.mani} className="w-5 h-5 text-primary-500" />
            <div className="text-primary-500">{`${password ? 'psw' : type}`}</div>
        </div>
    );
}
