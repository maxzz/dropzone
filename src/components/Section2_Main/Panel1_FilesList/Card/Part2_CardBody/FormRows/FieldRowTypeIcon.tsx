import React from 'react';
//import { IconButton, IconFieldText, IconInputFieldChk, IconInputFieldList, IconInputFieldPsw, IconInputFieldText } from '@ui/UiIcons';
import { IconButton, IconFieldText, IconInputFieldChk, IconInputFieldList, IconInputFieldPsw, IconInputFieldText } from '@ui/UIIconSymbols';

export function FormRowTypeIcon({ field, className }: { field: Mani.Field; className?: string; }): JSX.Element {
    return (
        <div className={`w-4 h-4 mr-1 ${className}`} title={`Field type: ${field.type}`}>
            {field.type === "edit" && (field.password ? <IconInputFieldPsw fill="#38a000" /> : <IconInputFieldText className="opacity-75" />)}
            {field.type === "check" && <IconInputFieldChk />}
            {field.type === "list" && <IconInputFieldList title={`Field choices: ${field.choosevalue}`} />}
            {field.type === "text" && <IconFieldText className="opacity-75" />}
            {field.type === "button" && <IconButton />}
        </div>
    );
}
