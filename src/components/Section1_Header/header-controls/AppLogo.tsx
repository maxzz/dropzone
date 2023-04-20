import React from 'react';
import { IconAppLogoMicroscope } from "@ui/icons/UIIcons";
import toast from "react-hot-toast";

export function AppLogo() {
    function doClick(event: React.MouseEvent) {
        event.stopPropagation();
        if (event.ctrlKey) {
            window.open('https://github.com/maxzz/dropzone', '_blank');
        } else {
            toast('again', { style: { backgroundColor: 'tomato' } });
        }
    }
    const title = "Ctrl+Click - Open source code at GitHub\nApp build version: __BUILD_DATE__";
    return (
        <IconAppLogoMicroscope className="w-7 h-7 mx-4 text-primary-300 cursor-pointer" title={title} onClick={doClick} />
    );
}
