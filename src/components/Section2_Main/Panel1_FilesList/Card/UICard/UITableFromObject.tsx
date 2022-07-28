import React, { Fragment, HTMLAttributes, ReactNode } from 'react';
import { UISemiScrollbar } from '@ui/UISemiScrollbar';

export function FieldFirstCol({ children, ...rest }: { children?: ReactNode; } & HTMLAttributes<HTMLDivElement>): JSX.Element {
    const { className, ...attrs } = rest;
    return (
        <div className={`h-5 leading-5 ${className}`} {...attrs}>
            {children}
        </div>
    );
}

export function FieldSecondCol({ children, ...rest }: { children?: ReactNode; } & HTMLAttributes<HTMLDivElement>): JSX.Element {
    const { className, ...attrs } = rest;
    return (
        <UISemiScrollbar>
            <div className={`border-l border-gray-500 pl-1 h-5 leading-5 whitespace-nowrap ${className}`} {...attrs}>
                {/* <div className={`border-l border-gray-500 pl-1 h-6 leading-6 smallscroll smallscroll-light overflow-x-auto overflow-y-hidden whitespace-nowrap ${className}`} {...attrs}> */}
                {children}
            </div>
        </UISemiScrollbar>
    );
}

export function UITableFromObject({ obj = {} }: { obj?: any; }): JSX.Element {
    const values = Object.entries(obj);
    return (
        <div className="grid grid-cols-[minmax(5rem,auto),1fr] items-center text-xs">
            {values.map(([key, val]) => {
                return (<Fragment key={key}>
                    <FieldFirstCol>{key}</FieldFirstCol>
                    <FieldSecondCol>{`${val}`}</FieldSecondCol>
                </Fragment>);
            })}
        </div>
    );
}
