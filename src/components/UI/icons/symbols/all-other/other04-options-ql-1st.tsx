import { HTMLAttributes, SVGAttributes } from 'react';

export function SymbolOptionsQl_firstVersion() {
    return (<>
        <symbol id="options-ql-1st-version" viewBox="0 0 24 24">
            <path strokeLinejoin="round" d="m4.46 22.56 14.9-12.07a824.5 824.5 0 0 0-7.02-1.78l7.2-7.27h-8.96L5.15 12.75l7.11-.75S4.59 22.19 4.47 22.56Z" />
        </symbol>
    </>);
}

export function IconOptionsQL_firstVersion({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#options-ql-1st-version" />
        </svg>
    );
}
