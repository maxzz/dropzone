import { Fragment, HTMLAttributes, ReactNode } from 'react';
import { UiSemiScrollbar } from '@ui/ui-semi-scrollbar';

export function Column1({ children, ...rest }: { children?: ReactNode; } & HTMLAttributes<HTMLDivElement>): JSX.Element {
    const { className, ...attrs } = rest;
    return (
        <div className={`h-5 leading-5 ${className}`} {...attrs}>
            {children}
        </div>
    );
}

export function Column2({ children, ...rest }: { children?: ReactNode; } & HTMLAttributes<HTMLDivElement>): JSX.Element {
    const { className, ...attrs } = rest;
    return (
        <UiSemiScrollbar>
            <div className={`border-l border-gray-500 pl-1 h-5 leading-5 whitespace-nowrap ${className}`} {...attrs}>
                {/* <div className={`border-l border-gray-500 pl-1 h-6 leading-6 smallscroll smallscroll-light overflow-x-auto overflow-y-hidden whitespace-nowrap ${className}`} {...attrs}> */}
                {children}
            </div>
        </UiSemiScrollbar>
    );
}

export function UITableFromObject({ obj = {} }: { obj?: any; }): JSX.Element {
    const values = Object.entries(obj);
    return (
        <div className="grid grid-cols-[minmax(5rem,auto),1fr] items-center text-xs">
            {values.map(
                ([key, val]) => {
                    return (
                        <Fragment key={key}>
                            <Column1>{key}</Column1>
                            <Column2>{`${val}`}</Column2>
                        </Fragment>
                    );
                }
            )}
        </div>
    );
}
