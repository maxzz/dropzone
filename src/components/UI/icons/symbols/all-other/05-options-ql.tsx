import { HTMLAttributes, SVGAttributes } from 'react';

export function SvgSymbolOptionsQl() {
    return (<>
        <symbol id="icon-options-ql" viewBox="0 0 24 24">
            <path d="M5.85 8.47c-.16 4.39.56 9.05 1.51 13.88.03.14.23.14.26 0l1.66-8.56 5.16 2 3.75-11.93-6.48-2.32-1.25 8.45-4.61-1.52Z" />
        </symbol>
    </>);
}

export function SymbolOptionsQL({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-options-ql" />
        </svg>
    );
}
