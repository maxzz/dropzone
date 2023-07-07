import React, { HTMLAttributes, SVGAttributes, SVGProps } from 'react';

function SymbolFieldEdt() {
    return (<>
        <symbol id="ifield-edt" viewBox="0 0 24 24">
            <path d="M2.05 6.01h19.89v11.98H2.05z" />
            <path d="M5 8.5h1.5m1.5 0H6.5m0 0v7m0 0H5m1.5 0H8" />
        </symbol>
    </>);
}

function SymbolFieldPsw() {
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

function SymbolFieldChk() {
    return (<>
        <symbol id="ifield-chk" viewBox="0 0 24 24">
            <path d="M8.73 6.81h7.1c.78 0 1.42.64 1.42 1.42v7.1c0 .78-.64 1.42-1.42 1.42h-7.1c-.78 0-1.42-.64-1.42-1.42v-7.1c0-.78.64-1.42 1.42-1.42Z" />
            <path d="m10.15 11.78 1.42 1.42 2.84-2.84" />
            <path d="M18.69 9.39v6.14a2.66 2.66 0 0 1-2.66 2.66H9.34" stroke="#b3b3b3" fill="none" />
        </symbol>
    </>);
}

function SymbolFieldLst() {
    return (<>
        <symbol id="ifield-lst" viewBox="0 0 24 24">
            <rect x="2.5" y="4.66" width="15.3" height="6.38" rx=".89" ry=".89" />
            <path d="M17.79 8.08h3.25c.25 0 .46.21.46.46v10.35c0 .25-.21.46-.46.46H4.93a.47.47 0 0 1-.46-.46v-7.85" />
            <path d="M7.86 13.58h10.52" />
            <path d="M8.03 16.43h7.62" />
            <path d="m13.18 7.84.7.48.71-.49" />
        </symbol>
    </>);
}

function SymbolFieldTxt() {
    return (<>
        <symbol id="ifield-txt" viewBox="0 0 24 24">
            <path fill="#5e9eff" d="M2.05 6.01h19.89v11.98H2.05z" />
            <path fill="white" stroke="none" d="M17.28 10.94v-.89h-1.21V8.68L15 8.97v1.08h-1.94l-.69 1.05-.1.16-.27.44-.38-.6-.7-1.05H8.53V8.68l-1.07.29v1.08h-.72v.89h.72v2.41c0 .63.11 1.04.36 1.29.23.26.57.4 1 .4.32 0 .6-.04.8-.12h.01l-.02.03h1.24l.82-1.28.28-.46.4.64.72 1.1h1.26l-1.71-2.52 1.67-2.36v.89h.72v2.41c0 .63.11 1.04.36 1.29.23.26.57.4 1 .4.32 0 .6-.04.79-.12l.08-.03-.05-.87-.15.04c-.09.02-.24.05-.46.05-.26 0-.51-.09-.51-.78v-2.38h1.21ZM9.64 14l-.15.04c-.09.02-.24.05-.46.05-.26 0-.51-.09-.51-.78v-2.38h1.21v-.81l1.6 2.31-1.65 2.37-.05-.81Z" />
        </symbol>
    </>);
}

function SymbolFieldBtn() {
    return (<>
        <symbol id="ifield-btn" viewBox="0 0 24 24">
            <rect fill="#82daff" x="5.33" y="6.92" width="13.45" height="9.79" rx="2.11" ry="2.11" />
            <path d="M20.3 9.39v5.39a3.37 3.37 0 0 1-3.37 3.37H7.76" fill="none" stroke="#b3b3b3" />
            <g fill="#314b70" stroke="none">
                <path d="M9.14 10.61c-.47 0-.86.16-1.13.45V9h-.88v4.49c0 .32-.02.69-.03.93v.12h.79l.02-.4c.27.32.65.48 1.13.48.84 0 1.74-.64 1.74-2.05 0-.62-.19-1.16-.54-1.51a1.52 1.52 0 0 0-1.1-.45Zm-.21.75c.66 0 .96.62.96 1.23 0 .79-.38 1.28-.98 1.28a.89.89 0 0 1-.87-.68c-.01-.07-.03-.14-.03-.22v-.65c0-.08.01-.15.03-.21v-.03a.94.94 0 0 1 .9-.72Z" />
                <path d="m12.33 9.62-.87.23v.84h-.56v.73h.56v1.86c0 .49.09.82.28 1.02.18.21.46.32.8.32.25 0 .47-.04.63-.1l.08-.03-.04-.72-.14.04c-.07.02-.19.04-.35.04-.23 0-.38-.1-.38-.59v-1.84h.94v-.73h-.94V9.62Z" />
                <path d="M15.62 10.61c-.51 0-.88.22-1.12.48l-.02-.4h-.82v.12c.03.27.04.56.04.97v2.76h.89v-2.29c0-.1.01-.2.04-.27a.82.82 0 0 1 .77-.59c.6 0 .72.52.72.95v2.2h.89v-2.28c0-1.22-.75-1.66-1.39-1.66Z" />
            </g>
        </symbol>
    </>);
}

export function DefFieldTypes() {
    return (<>
        {SymbolFieldEdt()}
        {SymbolFieldPsw()}
        {SymbolFieldChk()}
        {SymbolFieldLst()}
        {SymbolFieldTxt()}
        {SymbolFieldBtn()}
    </>);
}

//#region fields

// field icons

export function IconFieldEdt({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#ifield-edt" />
        </svg>
    );
}

export function IconFieldPsw({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#ifield-psw" />
        </svg>
    );
}

export function IconFieldChk({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#ifield-chk" />
        </svg>
    );
}

export function IconFieldLst({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#ifield-lst" />
        </svg>
    );
}

export function IconFieldTxt({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={.8} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#ifield-txt" />
        </svg>
    );
}

export function IconFieldBtn({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={.7} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#ifield-btn" />
        </svg>
    );
}

//#endregion fields
