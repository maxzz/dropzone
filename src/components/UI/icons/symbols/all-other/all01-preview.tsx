import { HTMLAttributes, SVGAttributes } from 'react';

export function SymbolDefPreview() {
    return (<>
        <symbol id="icon-preview" viewBox="0 0 24 24">
            <rect x="1.49" y="3.46" width="21.02" height="17.08" rx=".73" ry=".73" />
            <circle cx="5.66" cy="7.12" r="1.62" />
            <path d="m3.55 16.49 4.73-4.73 3.26 3.11" />
            <path d="m8.96 17.71 6.84-7.02 4.66 4.65" />
        </symbol>
    </>);
}

export function SymbolPreview({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-preview" />
        </svg>
    );
}
