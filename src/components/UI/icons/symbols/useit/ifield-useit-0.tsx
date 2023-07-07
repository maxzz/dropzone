import { HTMLAttributes, SVGAttributes } from 'react';

// field use-it

export function SymbolUseIt0() {
    return (<>
        <symbol id="ifield-useit-0" viewBox="0 0 24 24">
            <path d="M4.41 19.59 19.59 4.41" />
            <path d="M19.59 19.59 4.41 4.41" />
        </symbol>
    </>);
}

export function IconUseIt0({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#ifield-useit-0" />
        </svg>
    );
}
