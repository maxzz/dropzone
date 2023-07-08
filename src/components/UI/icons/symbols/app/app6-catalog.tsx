import { HTMLAttributes, SVGAttributes } from 'react';

export function SymbolCatalog() {
    return (<>
        <symbol id="app-catalog" viewBox="0 0 24 24">
            <path d="M12.17 5.2Q18 2.23 23 5.2V20a12.15 12.15 0 0 0-10.83.53" />
            <path d="M12.17 5.2q-5.82-3-10.83 0V20a12.15 12.15 0 0 1 10.83.53ZM3.5 21.22a10.71 10.71 0 0 1 8.23 1.18.81.81 0 0 0 .87 0c2.3-1.5 5.08-2.07 8.9-1.17" />
        </symbol>

    </>);
}

export function IconCatalog({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#app-catalog" />
        </svg>
    );
}
