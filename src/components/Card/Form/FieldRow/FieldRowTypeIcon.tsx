import React from 'react';
import { IconButton, IconFieldText, IconInputFieldChk, IconInputFieldList, IconInputFieldPsw, IconInputFieldText, IconToggleRight } from '../../../UI/UiIcons';

function FormRowTypeIcon({ field, className }: { field: Mani.Field; className?: string; }) {
    return (
        <div className={`w-4 h-4 mr-1 ${className}`}>
            {field.type === "edit" && (field.password ? <IconInputFieldPsw fill="#38a000" /> : <IconInputFieldText className="opacity-75" />)}
            {field.type === "check" && <IconInputFieldChk />}
            {field.type === "list" && <IconInputFieldList title={`Field choices: ${field.choosevalue}`} />}
            {field.type === "text" && <IconFieldText className="opacity-75" />} {/* to guaranty than tailwind give us: "w-4 h-4 mr-1" */}
            {field.type === "button" && <IconButton />}
        </div>
    );
}

export default FormRowTypeIcon;
