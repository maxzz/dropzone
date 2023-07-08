import { HTMLAttributes, SVGAttributes } from 'react';

export function SymbolCross() {
    return (<>
        <symbol id="icon-cross" viewBox="0 0 24 24">
            <path d="m2 2 20 20" />
            <path d="M2 22 22 2" />
        </symbol>
    </>);
}

export function IconCross({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-cross" />
        </svg>
    );
}
