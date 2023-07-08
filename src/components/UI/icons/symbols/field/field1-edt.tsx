import { HTMLAttributes, SVGAttributes } from 'react';

export function SymbolDefFieldEdt() {
    return (<>
        <symbol id="ifield-edt" viewBox="0 0 24 24">
            <path d="M2.05 6.01h19.89v11.98H2.05z" />
            <path d="M5 8.5h1.5m1.5 0H6.5m0 0v7m0 0H5m1.5 0H8" />
        </symbol>
    </>);
}

export function IconFieldEdt({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#ifield-edt" />
        </svg>
    );
}
