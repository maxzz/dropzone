import React from 'react';
import { IconButton, IconFieldText, IconInputFieldChk, IconInputFieldList, IconInputFieldPsw, IconInputFieldText } from '@ui/UIIconSymbols';
import { classNames } from '@/utils/classnames';

export function FormRowTypeIcon({ field, className }: { field: Mani.Field; className?: string; }) {
    const cx = classNames("w-4 h-4 mr-1", className);
    return (
        <div title={`Field type: ${field.type}`}>
            {field.type === "edit" && (field.password
                ? <IconInputFieldPsw fill="#38a000" className={cx} />
                : <IconInputFieldText className={classNames(cx, "opacity-75")} />)
            }
            {field.type === "check" && <IconInputFieldChk className={cx} />}
            {field.type === "list" && <IconInputFieldList className={cx} title={`Field choices: ${field.choosevalue}`} />}
            {field.type === "text" && <IconFieldText className={classNames(cx, "opacity-75")} />}
            {field.type === "button" && <IconButton className={cx} />}
        </div>
    );
}

//TODO: get rid off cx (double classes)
