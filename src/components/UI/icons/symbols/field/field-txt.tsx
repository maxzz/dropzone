import { HTMLAttributes, SVGAttributes } from 'react';

export function SymbolFieldTxt() {
    return (<>
        <symbol id="ifield-txt" viewBox="0 0 24 24">
            <path fill="#5e9eff" d="M2.05 6.01h19.89v11.98H2.05z" />
            <path fill="white" stroke="none" d="M17.28 10.94v-.89h-1.21V8.68L15 8.97v1.08h-1.94l-.69 1.05-.1.16-.27.44-.38-.6-.7-1.05H8.53V8.68l-1.07.29v1.08h-.72v.89h.72v2.41c0 .63.11 1.04.36 1.29.23.26.57.4 1 .4.32 0 .6-.04.8-.12h.01l-.02.03h1.24l.82-1.28.28-.46.4.64.72 1.1h1.26l-1.71-2.52 1.67-2.36v.89h.72v2.41c0 .63.11 1.04.36 1.29.23.26.57.4 1 .4.32 0 .6-.04.79-.12l.08-.03-.05-.87-.15.04c-.09.02-.24.05-.46.05-.26 0-.51-.09-.51-.78v-2.38h1.21ZM9.64 14l-.15.04c-.09.02-.24.05-.46.05-.26 0-.51-.09-.51-.78v-2.38h1.21v-.81l1.6 2.31-1.65 2.37-.05-.81Z" />
        </symbol>
    </>);
}
export function IconFieldTxt({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={.8} {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#ifield-txt" />
        </svg>
    );
}
