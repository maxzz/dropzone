import { HTMLAttributes, SVGAttributes } from 'react';

function SymbolUseIt1() {
    return (<>
        <symbol id="ifield-useit-1" viewBox="0 0 24 24">
            <path d="m3.1 12 5.94 5.94L20.9 6.06" />
        </symbol>
    </>);
}

// field use-it

function Icon_UseIt1({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#ifield-useit-1" />
        </svg>
    );
}

export const IconUseIt1 = {
    symbol: SymbolUseIt1,
    icon: Icon_UseIt1,
}
