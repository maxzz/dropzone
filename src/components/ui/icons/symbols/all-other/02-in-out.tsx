import { type HTMLAttributes, type SVGAttributes } from "react";

export function SvgSymbolInOut() {
    return (<>
        <symbol id="icon-inout" viewBox="0 0 24 24">
            <path d="m7.7 19-4.55-5.51h13.3" />
            <path d="m16.3 5 4.55 5.51H7.55" />
        </symbol>
    </>);
}

export function SymbolInOut({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-inout" />
        </svg>
    );
}
