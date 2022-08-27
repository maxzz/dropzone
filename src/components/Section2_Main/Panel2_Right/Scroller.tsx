import React, { HTMLAttributes } from 'react';
import { UISemiScrollbar } from '@ui/UISemiScrollbar';
import { classNames } from '@/utils/classnames';

export function Scroller({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <UISemiScrollbar className={classNames("px-2 pt-1 pb-4 overflow-auto w-full h-full", className)} {...rest}>
            {children}
        </UISemiScrollbar>
    );
}
