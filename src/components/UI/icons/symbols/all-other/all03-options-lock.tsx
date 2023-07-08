import { HTMLAttributes, SVGAttributes } from 'react';

export function SymbolDefOptionsLock() {
    return (<>
        <symbol id="icon-options-lock" viewBox="0 0 24 24">
            <path d="M5.99 8.57h12.02c1.09 0 1.98.89 1.98 1.98v4.01a8 8 0 0 1-15.98 0v-4.01c0-1.09.89-1.98 1.98-1.98Z" />
            <path d="M17.18 6.64v1.93H6.82V6.64a5.17 5.17 0 1 1 10.36 0Z" />
            <ellipse cx="12" cy="15.63" rx="2.01" ry="1.94" />
        </symbol>
    </>);
}

export function SymbolOptionsLock({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-options-lock" />
        </svg>
    );
}
