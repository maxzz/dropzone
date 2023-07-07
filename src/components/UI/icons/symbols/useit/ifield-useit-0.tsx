import { HTMLAttributes, SVGAttributes } from 'react';

function SymbolUseIt0() {
    return (<>
        <symbol id="ifield-useit-0" viewBox="0 0 24 24">
            <path d="M4.41 19.59 19.59 4.41" />
            <path d="M19.59 19.59 4.41 4.41" />
        </symbol>
    </>);
}

function Icon_UseIt0({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#ifield-useit-0" />
        </svg>
    );
}

export const IconUseIt0 = {
    symbol: SymbolUseIt0,
    icon: Icon_UseIt0,
}
