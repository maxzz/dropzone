import React from 'react';
import { IconButton, IconFieldText, IconInputFieldChk, IconInputFieldList, IconInputFieldPsw, IconInputFieldText } from '@ui/UIIconSymbols';
import { classNames } from '@/utils/classnames';

export function FormRowTypeIcon({ field, className }: { field: Mani.Field; className?: string; }) {
    const hint = `Field type: ${field.type}`;
    return (<>
        {field.type === "edit" && (field.password
            ? <IconInputFieldPsw fill="#38a000" className={className} title={hint} />
            : <IconInputFieldText className={classNames(className, "opacity-75")} title={hint} />)
        }
        {field.type === "check" && <IconInputFieldChk className={className} title={hint} />}
        {field.type === "list" && <IconInputFieldList className={className} title={`Field choices: ${field.choosevalue}`} />}
        {field.type === "text" && <IconFieldText className={classNames(className, "opacity-75")} title={hint} />}
        {field.type === "button" && <IconButton className={className} title={hint} />}
    </>);
}
