import { type HTMLAttributes, type SVGAttributes } from "react";

export function SvgSymbolAppWebChrome() {
    return (<>
        <symbol id="app-web-chrome" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <path d="M21.17 8H12" />
            <path d="M3.95 6.06L8.54 14" />
            <path d="M10.88 21.94L15.46 14" />
        </symbol>

    </>);
}

export function SymbolAppWebChrome({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth=".9" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#app-web-chrome" />
        </svg>
    );
}
