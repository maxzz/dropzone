import { HTMLAttributes, SVGAttributes } from 'react';

export function SymbolDefGear_8leafs_nun() {
    return (<>
        <symbol id="icon-gear-8" viewBox="0 0 24 24">
            <path d="M12.05 7.1a4.9 4.9 0 1 0-.02 9.8 4.9 4.9 0 0 0 .02-9.8Z" />
            <path d="M14.4 2c-.76 2.17-4.04 2.16-4.8 0-1.05.25-2.06.67-2.98 1.23 1 2.07-1.33 4.38-3.39 3.39A9.99 9.99 0 0 0 2 9.6c2.17.76 2.16 4.04 0 4.8.25 1.05.67 2.06 1.23 2.98 2.07-.99 4.38 1.32 3.39 3.39.92.57 1.92.98 2.98 1.23.76-2.16 4.04-2.15 4.8 0 1.05-.25 2.06-.67 2.98-1.23-1-2.07 1.33-4.38 3.39-3.39.57-.92.98-1.92 1.23-2.98-2.17-.76-2.15-4.04 0-4.8a10.37 10.37 0 0 0-1.23-2.98c-2.07.99-4.38-1.32-3.39-3.39A9.99 9.99 0 0 0 14.4 2Z" />
        </symbol>
    </>);
}

export function IconGear_8leafs_nun({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-gear-8" />
        </svg>
    );
}
