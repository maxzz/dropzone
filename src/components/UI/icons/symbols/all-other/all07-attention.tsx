import { HTMLAttributes, SVGAttributes } from 'react';

export function SvgSymbolAttention() {
    return (<>
        <symbol id="icon-alert" viewBox="0 0 48 48">
            <path d="M24 44a19.937 19.937 0 0 0 14.142-5.858A19.937 19.937 0 0 0 44 24a19.938 19.938 0 0 0-5.858-14.142A19.937 19.937 0 0 0 24 4A19.938 19.938 0 0 0 9.858 9.858A19.938 19.938 0 0 0 4 24a19.937 19.937 0 0 0 5.858 14.142A19.938 19.938 0 0 0 24 44z" />
            <path d="M24 37a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5z" fill="currentColor" stroke="none" />
            <path d="M24 12v16" />
        </symbol>
    </>);
}

export function SymbolAttention({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#icon-alert" />
        </svg>
    );
}
