import React from 'react';
import { IconChevronDown, IconChevronUp, IconDoubleDown } from './UIIconsSymbolsDefs';
// import { IconChevronDown, IconChevronUp } from './UiIcons';

function UIUpDownIcon({ open, double = false, className }: { open: boolean; double?: boolean; className: string; }) {
    if (double) {
        const icon = IconDoubleDown;
        return icon({ className, style: { transform: `rotateX(${open ? '180deg' : '0deg'})`} });
    } else {
        const icon = open ? IconChevronUp : IconChevronDown;
        return icon({ className });
    }
}

export default UIUpDownIcon;
