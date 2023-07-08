import { HTMLAttributes, SVGAttributes } from 'react';

export function SymbolDefMenuBurger() {
    return (<>
        <symbol id="icon-menu" viewBox="0 0 21 21">
            <path d="M4.5 6.5h12" />
            <path d="M4.498 10.5h11.997" />
            <path d="M4.5 14.5h11.995" />
        </symbol>
    </>);
}

export function IconMenuBurger({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg strokeLinecap="round" fill="none" stroke="currentColor" strokeWidth={1.2} {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-menu" />
        </svg>
    );
}
