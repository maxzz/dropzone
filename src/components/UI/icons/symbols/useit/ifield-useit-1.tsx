import { HTMLAttributes, SVGAttributes } from 'react';

// field use-it

export function SymbolUseIt1() {
    return (<>
        <symbol id="ifield-useit-1" viewBox="0 0 24 24">
            <path d="m3.1 12 5.94 5.94L20.9 6.06" />
        </symbol>
    </>);
}

export function IconUseIt1({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#ifield-useit-1" />
        </svg>
    );
}
