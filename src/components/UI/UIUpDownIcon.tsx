import React from 'react';
import { IconChevronDown, IconChevronUp } from './UIIconsSymbolsDefs';
// import { IconChevronDown, IconChevronUp } from './UiIcons';

function UIUpDownIcon({ open, className }: { open: boolean; className: string; }) {
    const icon = open ? IconChevronUp : IconChevronDown;
    return icon({ className });
}

export default UIUpDownIcon;
