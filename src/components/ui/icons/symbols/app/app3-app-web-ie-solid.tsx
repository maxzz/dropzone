import { type HTMLAttributes, type SVGAttributes } from "react";

export function SvgSymbolAppWebIeSolid() {
    return (<>
        {/* ie solid */}
        <symbol id="app-web-ie-solid" viewBox="0 0 32 32">
            <path d="M27.7 8.813c2.445-6.243-2.302-5.805-2.302-5.805c-3.046 0-6.855 2.73-6.855 2.73S14 4.531 9.457 7.234c-4.95 3.106-4.785 8.621-4.785 8.621C8.695 10.184 14.3 7.88 14.3 7.88v.375C6.027 13.816 4.07 21.957 3.582 23.617C3.09 25.277 3.418 29 6.898 29c3.485 0 7.02-2.762 7.02-2.762s.762.164 2.828.164c8.707 0 10.774-7.55 10.774-7.55h-7.727s-.543 2.464-3.316 2.464c-3.813 0-3.594-3.91-3.594-3.91h14.746c.707-10.062-8.215-11.508-8.215-11.508s3.152-2.195 5.875-2.195c4.313 0 2.273 4.973 2.273 4.973zM13.483 26.128s-5.312 3.172-7.699.973c-1.273-2.2.8-5.313.8-5.313s1.759 3.207 6.9 4.34zm6.391-12.149h-7.012s-.09-3.363 3.594-3.363c3.559 0 3.418 3.363 3.418 3.363z" />
        </symbol>

    </>);
}

// IE solid
export function SymbolAppWebIESolid({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#app-web-ie-solid" />
        </svg>
    );
}
