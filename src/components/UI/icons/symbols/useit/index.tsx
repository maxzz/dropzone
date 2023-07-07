import React, { HTMLAttributes, SVGAttributes, SVGProps } from 'react';

function SymbolUseIt0() {
    return (<>
        <symbol id="ifield-useit-0" viewBox="0 0 24 24">
            <path d="M4.41 19.59 19.59 4.41" />
            <path d="M19.59 19.59 4.41 4.41" />
        </symbol>
    </>);
}

function SymbolUseIt1() {
    return (<>
        <symbol id="ifield-useit-1" viewBox="0 0 24 24">
            <path d="m3.1 12 5.94 5.94L20.9 6.06" />
        </symbol>
    </>);
}

export function DefFieldUseIt() {
    return (<>
        {SymbolUseIt0()}
        {SymbolUseIt1()}
    </>);
}

//#region use-it

// field use-it

export function IconUseIt0({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#ifield-useit-0" />
        </svg>
    );
}

export function IconUseIt1({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#ifield-useit-1" />
        </svg>
    );
}

//#endregion use-it
