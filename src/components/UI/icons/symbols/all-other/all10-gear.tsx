import { HTMLAttributes, SVGAttributes } from 'react';

export function SymbolDefGear() {
    return (<>
        <symbol id="icon-gear" viewBox="0 0 24 24">
            <path d="M14.84 11.99a2.84 2.84 0 0 1-3.6 2.78 2.6 2.6 0 0 1-1.32-.79 2.6 2.6 0 0 1-.7-1.2 2.63 2.63 0 0 1 0-1.59c.12-.46.37-.87.7-1.2a2.8 2.8 0 0 1 2.75-.79 2.79 2.79 0 0 1 2.06 2.01c.07.24.11.5.11.76Z" />
            <path d="m21.22 14.28.82.52a10.24 10.24 0 0 1-2.6 4.51l-.91-.48c-1.69-.87-3.91.3-3.91 2.17l-.09 1.13a9.94 9.94 0 0 1-5.21 0L9.23 21c0-1.87-2-3.04-3.86-2.17l-.87.43a9.26 9.26 0 0 1-2.56-4.38l.91-.61c1.52-1 1.52-3.56 0-4.56l-.91-.61A9.54 9.54 0 0 1 4.5 4.72l.87.43c1.87.87 3.86-.3 3.86-2.17l.09-1.13a9.7 9.7 0 0 1 5.21 0l.09 1.13c0 1.87 2.21 3.04 3.91 2.17l.91-.48a10.16 10.16 0 0 1 2.6 4.51l-.82.52a2.68 2.68 0 0 0 0 4.56Z" />
        </symbol>
    </>);
}

export function SymbolGear({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-gear" />
        </svg>
    );
}
