import React from 'react';
import { IconChevronDown, IconChevronUp, IconDoubleDown } from './UIIconsSymbolsDefs';
// import { IconChevronDown, IconChevronUp } from './UiIcons';

function UIUpDownIcon({ isUp, double = false, className }: { isUp: boolean; double?: boolean; className: string; }) {
    if (double) {
        const icon = IconDoubleDown;
        return icon({ className, style: { transform: `rotateX(${isUp ? '180deg' : '0deg'})`} });
    } else {
        const icon = isUp ? IconChevronUp : IconChevronDown;
        return icon({ className });
    }
}

export default UIUpDownIcon;
