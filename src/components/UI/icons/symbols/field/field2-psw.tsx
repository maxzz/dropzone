import { HTMLAttributes, SVGAttributes } from 'react';

export function SymbolDefFieldPsw() {
    return (<>
        <symbol id="ifield-psw" viewBox="0 0 24 24">
            <path fill="#ffdbb8" d="M2.05 6.01h19.89v11.98H2.05z" />
            <path d="m5.56 14.69 2.84-2.81" />
            <path d="m5.57 11.87 2.81 2.84" />
            <path d="m11.02 14.69 2.84-2.81" />
            <path d="m11.04 11.87 2.81 2.84" />
            <path d="M16.2 15.55h2.27" />
        </symbol>
    </>);
}

export function IconFieldPsw({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#ifield-psw" />
        </svg>
    );
}
