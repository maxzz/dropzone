import React, { HTMLAttributes, SVGAttributes, SVGProps } from 'react';

export function IconAppLogoMicroscope({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 139 139" fill="none" stroke="currentColor" strokeWidth="5" {...rest}>
            {title && <title>{title}</title>}
            <path d="M34 18h26v53H34zM34 9h26M31 71h32M47 9v9M38 72h19v11H38zM60 49c32 0 35 10 35 37" />
            <circle cx="94.6" cy="99.7" r="13.6" />
            <path d="M95 128v-14" />
            <path strokeWidth="6" d="M36 110h23" />
            <path d="M47 129v-19M31 129h77" />
        </svg>
    );
}

/*
function IconManualMode0({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <circle cx="18.1" cy="8.8" r="2" />
            <circle cx="10.9" cy="5.6" r="2" />
            <path d="M1.6 10.1h2.8v9.2H1.6zM4.5 11.4c2.3-.5 3-.2 5.2 1 3.8-.1 6.1.9 6.2 3.7H7.7" />
            <path d="M15.3 14h4a4.2 4.2 0 0 1 3 2c-5.8 5.8-11.8 5.4-17.8 1.8" />
        </svg>
    );
}

function IconManualMode1({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth=".5" {...rest}>
            {title && <title>{title}</title>}
            <path d="M10.3 7c-.4-.2-1 .2-1 .7a1.6 1.6 0 0 0 0 .3c0 1.2.7 2.5.5 3.6-1.5-2-2.2-4.7-3.3-7-2.5-.9.2 4 .6 5 0 .7.8 1 .4 1.8-1-1.7-1.9-4-3.1-5.6C4 5.2 3.3 5 3.2 6c-.3.4 1 2.3 1.3 2.8A12.2 12.2 0 0 0 6 11.6a1.8 1.8 0 0 0 .3.8l-.1.3C5.3 11.9 2.9 7 2 8.2c-.8 1.4 1 2.4 1.5 3.4A25.4 25.4 0 0 1 5 13.8c0 .4-.3.2-.5 0l-.1-.1c-.8-.6-2.8-4.1-3.3-1.9.1 1.6 1.8 2.3 2.5 3.6s0 0 .1 0c1.6 2.1 2.4 4.7 5 3.9 4-1.4 3.1-8.6 1.5-12.3Z" />
            <path d="M13.7 7c.4-.2 1 .2 1 .7a1.6 1.6 0 0 1 0 .3c0 1.2-.7 2.5-.5 3.6 1.5-2 2.2-4.7 3.3-7 2.5-.9-.2 4-.6 5 0 .7-.8 1-.4 1.8 1-1.7 1.9-4 3.1-5.6.4-.6 1.1-.8 1.2.3.3.4-1 2.3-1.3 2.8a12.2 12.2 0 0 1-1.5 2.7 1.8 1.8 0 0 1-.3.8l.1.3c.9-.8 3.3-5.6 4.2-4.5.8 1.4-1 2.4-1.5 3.4a25.4 25.4 0 0 0-1.6 2.2c0 .4.3.2.5 0l.1-.1c.8-.6 2.8-4.1 3.3-1.9-.1 1.6-1.8 2.3-2.5 3.6s0 0-.1 0c-1.6 2.1-2.4 4.7-5 3.9-4-1.4-3.1-8.6-1.5-12.3Z" />
        </svg>
    );
}
*/
/*
export function IconManualMode({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth=".6" {...rest}>
            {title && <title>{title}</title>}
            <path d="M9.86 7.28C9.56 7.07 9 7.46 9 8a1.51 1.51 0 0 0 0 .3c0 1.13.62 2.39.39 3.46C8 9.82 7.39 7.21 6.33 5c-2.33-.84.15 3.74.57 4.81-.07.65.71.93.35 1.69-1-1.66-1.8-3.82-3-5.36-.39-.61-1-.75-1.16.25-.24.47 1 2.23 1.26 2.7v-.05a12 12 0 0 0 1.47 2.56 1.76 1.76 0 0 0 .34.76c0 .26 0 .26-.17.27-.83-.72-3.15-5.3-3.92-4.23-.79 1.31 1 2.24 1.34 3.22A25.22 25.22 0 0 1 5 13.71c0 .37-.3.18-.44 0a.09.09 0 0 1-.06-.06.13.13 0 0 0-.06-.05c-.75-.54-2.68-3.9-3.19-1.77.13 1.52 1.69 2.17 2.39 3.37s.06.05.09.07c1.49 2 2.29 4.45 4.78 3.64 3.69-1.32 2.95-8.18 1.35-11.63ZM14.14 7.28c.3-.21.87.18.86.67a1.51 1.51 0 0 1 0 .3c0 1.13-.62 2.39-.39 3.46 1.35-1.89 2-4.5 3.06-6.68 2.38-.87-.15 3.71-.57 4.78.07.65-.71.93-.35 1.69 1.05-1.66 1.8-3.82 3-5.36.39-.61 1-.75 1.16.25.24.47-1.05 2.23-1.26 2.7v-.05a12 12 0 0 1-1.41 2.56 1.76 1.76 0 0 1-.34.76c0 .26 0 .26.17.27.83-.72 3.15-5.3 3.92-4.23.79 1.31-1 2.24-1.34 3.22A25.22 25.22 0 0 0 19 13.71c0 .37.3.18.44 0a.09.09 0 0 0 .06-.06.13.13 0 0 1 .06-.05c.75-.54 2.68-3.9 3.19-1.77-.17 1.54-1.73 2.19-2.43 3.39s-.06.05-.09.07c-1.49 2-2.29 4.45-4.78 3.64-3.65-1.34-2.91-8.2-1.31-11.65Z" />
        </svg>
    );
}
*/
/*
function IconAutoMode0({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...rest}>
            {title && <title>{title}</title>}
            <path d="m10.8 12.5.3.1a.5.5 0 0 1-.6 0ZM8.3 12.5l.3.1a.5.5 0 0 1-.6 0ZM15.4 12.5h.5c-.2.3-.4.3-.5 0ZM13.5 12.7H13l.1-.2c.1 0 .3 0 .4.2Z" />
            <path d="m2.2 17-.4-.8a6.6 6.6 0 0 1-.3-2.5 3.1 3.1 0 0 1 .8-1.8 3 3 0 0 1 1.5-.7M21.8 17l.4-.8a6.6 6.6 0 0 0 .3-2.5 3.1 3.1 0 0 0-.8-1.8 3 3 0 0 0-1.5-.7" />
            <path d="M4.9 16H3A1 1 0 0 1 2 15a8 8 0 0 1 0-1.4c0-.5.2-.6.7-.7h2.2a1.5 1.5 0 0 1 1.1.3 1.2 1.2 0 0 0 .9.3h10.4a1.2 1.2 0 0 0 .8-.3 1.4 1.4 0 0 1 1-.4h2.4a.6.6 0 0 1 .5.5 3.8 3.8 0 0 1 0 2 1 1 0 0 1-.9.6h-2.5a.8.8 0 0 1-.4-.2 1.8 1.8 0 0 0-1.3-.5H7.2a1.8 1.8 0 0 0-1.3.5 1 1 0 0 1-.5.2Z" />
            <path d="M4.1 13.2A1.2 1.2 0 0 0 3 14.3a1.2 1.2 0 0 0 .3.9 1.2 1.2 0 0 0 .9.3 1.2 1.2 0 0 0 0-2.4ZM20 13.2a1.2 1.2 0 0 0 0 2.3 1.2 1.2 0 0 0 0-2.3ZM6.4 13.9h11.3M6.3 14.3h11.5M6.4 14.7h11.3M6 10.4l-.4-.1.1-.6.6-1.3.2-.6a1.2 1.2 0 0 1 1-.7 16.9 16.9 0 0 1 3.7-.4h.4l3.3.1a10.2 10.2 0 0 1 1.4.2l.6.1a.8.8 0 0 1 .7.6l1 2.3a.3.3 0 0 1 0 .3.3.3 0 0 1-.2 0h-1.9l-3.6-.1h-.2l-5 .1-1.3.1ZM3.7 17.3h-.2a.3.3 0 0 1-.3-.3s0 0 0-.1v-.5H4.9a1.8 1.8 0 0 1 .1.6c0 .2-.2.3-.3.3h-1ZM20.4 17.3h.2a.3.3 0 0 0 .3-.3.2.2 0 0 1 0-.1v-.5l-.5-.1h-.9l-.4.1a1.6 1.6 0 0 0 0 .6c0 .2.1.2.2.2h1Z" />
        </svg>
    );
}
*/
// small car
export function IconAutoMode({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth=".8" {...rest}>
            {title && <title>{title}</title>}
            <path d="M11 4.9c1.8 0 4 .2 4.7 3.1 0 .3.1.4.3.5 3.3.5 5 1.1 6.3 6a2.8 2.8 0 0 0 .3.6c.2.3.2.8-.1 1a2.5 2.5 0 0 0-.4.2c-.6.4-.8 1.2-1.4 1.7a2.6 2.6 0 0 1-3.4-.2c-.5-.5-.8-.8-1.3-.8h-5.6c-1.8 0-1.8.4-3.2 1.2-1 .7-2.7.2-3.8-1.3a2.1 2.1 0 0 0-1.8-.9l-.1-.3c-.1-1 .3-.7.6-1.3a4.3 4.3 0 0 0 .2-1.2A9 9 0 0 1 3 11C4.9 7 7.9 4.7 11 5Z" />
            <path d="M10.7 6.4c0 .6-.1 3.3.2 3.1h3.5c.4 0 0-1.8-.2-2-1-1.5-2.3-1.4-3.5-1.1ZM6 13.5c-2.5.2-2.6 4.1 0 4.2 2.7 0 2.7-4 0-4.2ZM21 15.7a2 2 0 1 0-3.9 0 2 2 0 1 0 3.9 0ZM6 9.4h3.6V6.6C8 6.6 6 7.7 6 9.4Z" />
        </svg>
    );
}

/** /
export function IconAppWindows({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M2.67 5.3v.61l-.71.3V5.6l.71-.3m0 5.94v.62l-.71.29v-.59l.71-.32m0 6.03v.62l-.71.29v-.59l.71-.32M2.6 7.29v.55l-.57.26v-.54l.57-.27m0 1.99v.54l-.57.26v-.54l.57-.26m0 4.03v.53l-.57.26v-.54l.57-.25m0 2.02v.54l-.57.26v-.53l.57-.27m1.9-9.69v.72l-1 .37V6l1-.36m0 6.02v.71l-1 .37v-.71l1-.37m0 6.04v.71l-1 .4v-.71l1-.4m-.07-9.98v.66l-.79.3V8l.79-.28m0 2.01v.64l-.78.3V10l.78-.27m0 4.01v.64l-.78.31v-.66l.78-.29m0 2.02v.65l-.78.31v-.66l.78-.3m1.88-9.67v.85l-1.26.49v-.84l1.26-.5m0 6.02v.85l-1.26.49v-.84l1.26-.5m0 5.97v.85l-1.26.5v-.85l1.26-.5m-.06-9.9v.76l-1.06.4v-.73l1.06-.43m0 2v.75l-1.06.42v-.75l1.06-.42m0 4.01v.75l-1.06.43v-.75l1.06-.43m0 1.95v.76l-1.06.42v-.75l1.06-.43m2.04-10.1v1.12l-1.57.62V6.67l1.57-.63m0 6.02v1.13l-1.57.61v-1.12l1.57-.62m0 5.97v1.12l-1.57.62v-1.11l1.57-.63m-.09-9.9v1.03l-1.31.53V8.66l1.31-.53m0 2v1.02l-1.31.53v-1.03l1.31-.52m0 4.02v1.03l-1.31.52v-1.03l1.31-.52m0 1.95v1.02l-1.31.52v-1.01l1.31-.53m2.14-10.25v1.47L8.61 8V6.56l1.73-.71m0 6.02v1.46l-1.73.7v-1.47l1.73-.69m0 5.97v1.46l-1.73.7v-1.46l1.73-.7m-.08-9.79v1.23l-1.48.59V8.64l1.48-.59m0 1.92v1.23l-1.48.58v-1.22l1.48-.59m0 4.09v1.25l-1.48.57v-1.23l1.48-.59m0 1.94v1.25l-1.48.59V16.6l1.48-.6m2.19-10.88v2l-1.86.77V6c.64-.35 1.26-.65 1.86-.88m0 2.21v1.73l-1.86.78V8.1l1.86-.77m0 1.95v1.76l-1.86.78v-1.76l1.86-.78m0 1.97V13l-1.86.77V12l1.86-.75m0 1.96V15l-1.86.78V14l1.86-.79m0 2v1.75l-1.86.8V16l1.86-.79m0 1.96v1.87c-.73.28-1.35.55-1.86.8v-1.88l1.86-.79m9.59-11.99v14.05c-1.19-.79-2.67-1.18-4.45-1.18c-1.47 0-3.12.3-4.94.91v-1.9c.97-.37 2.03-.64 3.19-.8v-4.57c-.98.12-2.04.46-3.19 1.02V11.4c.99-.46 2.06-.77 3.19-.94V6c-1.02.18-2.08.53-3.19 1V5.03C14.27 4.34 15.86 4 17.41 4c1.68 0 3.22.39 4.63 1.18m-1.89 1.23c-.76-.41-1.65-.59-2.73-.59c-.13 0-.25.01-.37.02v4.54l.41-.01c.91 0 1.81.13 2.69.43V6.41m0 5.69c-.81-.36-1.72-.54-2.71-.54c-.13 0-.26.01-.39.02v4.58h.41c.99 0 1.89.12 2.69.37V12.1z" />
        </svg>
    );
}
/**/
/*
export function IconAppWebChrome({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...rest}>
            {title && <title>{title}</title>}
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M21.17 8H12"></path><path d="M3.95 6.06L8.54 14" />
            <path d="M10.88 21.94L15.46 14" />
        </svg>
    );
}
*/
/** /
export function IconAppWebIE({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 32 32" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M27.7 8.813c2.445-6.243-2.302-5.805-2.302-5.805c-3.046 0-6.855 2.73-6.855 2.73S14 4.531 9.457 7.234c-4.95 3.106-4.785 8.621-4.785 8.621C8.695 10.184 14.3 7.88 14.3 7.88v.375C6.027 13.816 4.07 21.957 3.582 23.617C3.09 25.277 3.418 29 6.898 29c3.485 0 7.02-2.762 7.02-2.762s.762.164 2.828.164c8.707 0 10.774-7.55 10.774-7.55h-7.727s-.543 2.464-3.316 2.464c-3.813 0-3.594-3.91-3.594-3.91h14.746c.707-10.062-8.215-11.508-8.215-11.508s3.152-2.195 5.875-2.195c4.313 0 2.273 4.973 2.273 4.973zM13.483 26.128s-5.312 3.172-7.699.973c-1.273-2.2.8-5.313.8-5.313s1.759 3.207 6.9 4.34zm6.391-12.149h-7.012s-.09-3.363 3.594-3.363c3.559 0 3.418 3.363 3.418 3.363z" />
        </svg>
    );
}
/**/


export function IconBtnFormLogin({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 1025 1024" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M960.356 1024h-896q-26 0-45-19t-19-45V640q0-27 19-45.5t45-18.5h896q26 0 45 18.5t19 45.5v320q0 26-19 45t-45 19zm0-352q0-13-9.5-22.5t-22.5-9.5h-832q-13 0-22.5 9.5t-9.5 22.5v256q0 13 9.5 22.5t22.5 9.5h832q13 0 22.5-9.5t9.5-22.5V672zm-192 224q-27 0-45.5-19t-18.5-45.5t18.5-45t45.5-18.5t45.5 18.5t18.5 45t-18.5 45.5t-45.5 19zm-191.5 0q-26.5 0-45.5-19t-19-45.5t19-45t45.5-18.5t45 18.5t18.5 45t-18.5 45.5t-45 19zm-192.5 0q-27 0-45.5-19t-18.5-45.5t18.5-45t45.5-18.5t45.5 18.5t18.5 45t-18.5 45.5t-45.5 19zm-192 0q-27 0-45.5-19t-18.5-45.5t18.5-45t45.5-18.5t45.5 18.5t18.5 45t-18.5 45.5t-45.5 19zm768-448h-896q-26 0-45-19t-19-45V64q0-27 19-45.5t45-18.5h896q26 0 45 18.5t19 45.5v320q0 26-19 45t-45 19zm0-352q0-13-9.5-22.5t-22.5-9.5h-832q-13 0-22.5 9.5t-9.5 22.5v256q0 13 9.5 22.5t22.5 9.5h832q13 0 22.5-9.5t9.5-22.5V96zm-800 224q-13 0-22.5-9.5t-9.5-22.5V160q0-13 9.5-22.5t22.5-9.5t22.5 9.5t9.5 22.5v128q0 13-9.5 22.5t-22.5 9.5z" />
        </svg>
    );
}

export function IconBtnFormChangePsw({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M17.66 9.53l-7.07 7.07l-4.24-4.24l1.41-1.41l2.83 2.83l5.66-5.66l1.41 1.41zM4 12c0-2.33 1.02-4.42 2.62-5.88L9 8.5v-6H3l2.2 2.2C3.24 6.52 2 9.11 2 12c0 5.19 3.95 9.45 9 9.95v-2.02c-3.94-.49-7-3.86-7-7.93zm18 0c0-5.19-3.95-9.45-9-9.95v2.02c3.94.49 7 3.86 7 7.93c0 2.33-1.02 4.42-2.62 5.88L15 15.5v6h6l-2.2-2.2c1.96-1.82 3.2-4.41 3.2-7.3z" />
        </svg>
    );
}

export function IconInfo({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}
/*
function IconMenuHamburger({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 21 21" strokeLinecap="round" fill="none" stroke="currentColor" strokeWidth={1.2} {...rest}>
            {title && <title>{title}</title>}
            <path d="M4.5 6.5h12"></path>
            <path d="M4.498 10.5h11.997"></path>
            <path d="M4.5 14.5h11.995"></path>
        </svg>
    );
}

function IconBack({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" strokeLinecap="round" fill="none" stroke="currentColor" strokeWidth={1.2} {...rest}>
            {title && <title>{title}</title>}
            <path d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
        </svg>
    );
}
*/

export function IconTrash({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 16 16" fillRule="evenodd" clipRule="evenodd" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M10 3h3v1h-1v9l-1 1H4l-1-1V4H2V3h3V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1zM9 2H6v1h3V2zM4 13h7V4H4v9zm2-8H5v7h1V5zm1 0h1v7H7V5zm2 0h1v7H9V5z" />
        </svg>
    );
}
/*
// Field icons

function IconInputFieldText({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeWidth={1.5} stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"></path>
            <path d="M5 8.5h1.5m1.5 0H6.5m0 0v7m0 0H5m1.5 0H8" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    );
}

function IconInputFieldPsw({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M11.78 10.22a.75.75 0 0 0-1.06 1.06l.72.72l-.72.72a.75.75 0 1 0 1.06 1.06l.72-.72l.72.72a.75.75 0 0 0 1.06-1.062L13.561 12l.72-.72a.75.75 0 1 0-1.061-1.06l-.72.72l-.72-.72z" />
            <path d="M5.22 10.22a.75.75 0 0 1 1.06 0l.72.72l.72-.72a.75.75 0 1 1 1.06 1.06l-.719.72l.72.718A.75.75 0 1 1 7.72 13.78L7 13.06l-.72.72a.75.75 0 0 1-1.06-1.06l.72-.72l-.72-.72a.75.75 0 0 1 0-1.06z" />
            <path d="M16.5 13.5a.75.75 0 0 0 0 1.5h1.75a.75.75 0 0 0 0-1.5H16.5z" />
            <path d="M5.25 5A3.25 3.25 0 0 0 2 8.25v7.5A3.25 3.25 0 0 0 5.25 19h13.5A3.25 3.25 0 0 0 22 15.75v-7.5A3.25 3.25 0 0 0 18.75 5H5.25zM3.5 8.25c0-.967.783-1.75 1.75-1.75h13.5c.967 0 1.75.783 1.75 1.75v7.5a1.75 1.75 0 0 1-1.75 1.75H5.25a1.75 1.75 0 0 1-1.75-1.75v-7.5z" />
        </svg>
    );
}

function IconInputFieldChk({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 21 21" fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M5.5 3.5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z" />
            <path d="M7.5 10.5l2 2l4-4" />
        </svg>
    );
}

function IconInputFieldChkEmpty({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 21 21" fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M5.5 3.5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z" />
        </svg>
    );
}

function IconInputFieldList({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 16 16" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h8A1.5 1.5 0 0 1 11 1.5v2A1.5 1.5 0 0 1 9.5 5h-8A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-8z" />
            <path d="M7.823 2.823l-.396-.396A.25.25 0 0 1 7.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
        </svg>
    );
}

function IconFieldText({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 16 16" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M6.5 10.5A.5.5 0 0 1 7 10h.5V6H6v.5a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V6H8.5v4H9a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5z" />
            <path d="M1 5.5A2.5 2.5 0 0 1 3.5 3h9A2.5 2.5 0 0 1 15 5.5v5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 10.5v-5zM3.5 4A1.5 1.5 0 0 0 2 5.5v5A1.5 1.5 0 0 0 3.5 12h9a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 12.5 4h-9z" />
        </svg>
    );
}

// Field icons old

function IconAirplay({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
            <polygon points="12 15 17 21 7 21 12 15"></polygon>
        </svg>
    );
}

function IconCheckSquare({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            <polyline points="9 11 12 14 23 3"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
    );
}

function IconEyeOff({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
    );
}

function IconEye({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
            </path><circle cx="12" cy="12" r="3"></circle>
        </svg>
    );
}

function IconToggleLeft({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            <rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect>
            <circle cx="8" cy="12" r="3"></circle>
        </svg>
    );
}

function IconToggleRight({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            <rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect>
            <circle cx="16" cy="12" r="3"></circle>
        </svg>
    );
}

function IconButton({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={5} {...rest}>
            {title && <title>{title}</title>}
            <path d="M9 72.6A11.43 11.43 0 0 0 20.43 84h59.14A11.43 11.43 0 0 0 91 72.6" stroke="#999" />
            <rect x="6.56" y="15.97" width="86.87" height="63.19" rx="13.64" stroke="#0060c1" fill="#9bccfd" /> {/* #b7ffb7 * /}
            <path stroke="none" fill="#2a61ff"
                d="M18.85 63.59c.1-1.49.2-3.72.2-5.68v-26.6h4.28v13.82h.1c1.53-2.45 4.28-4.05 8.13-4.05 5.91 0 10.1 4.55 10.05 11.24 0 7.86-5.37 11.78-10.69 11.78-3.45 0-6.21-1.23-8-4.14h-.14l-.2 3.63Zm4.48-8.82a7 7 0 0 0 .2 1.46A6.62 6.62 0 0 0 30 60.91c4.53 0 7.24-3.41 7.24-8.46 0-4.41-2.46-8.18-7.09-8.18a6.81 6.81 0 0 0-6.6 4.91 7.18 7.18 0 0 0-.25 1.64ZM52.3 35.26v6.32h6.21v3.05H52.3V56.5c0 2.73.84 4.28 3.26 4.28a10.2 10.2 0 0 0 2.51-.28l.19 3a11.29 11.29 0 0 1-3.84.55 6.29 6.29 0 0 1-4.68-1.68c-1.23-1.18-1.68-3.14-1.68-5.73v-12h-3.69v-3.06h3.69v-5.27ZM63.39 47.54c0-2.27 0-4.14-.2-6H67l.25 3.64h.1a8.9 8.9 0 0 1 7.88-4.14c3.3 0 8.42 1.82 8.42 9.37v13.18h-4.3V50.91c0-3.55-1.43-6.51-5.52-6.51A6.11 6.11 0 0 0 68 48.5a5.26 5.26 0 0 0-.3 1.86v13.23h-4.31Z"
            />
        </svg>
    );
}

function IconInOut({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M21.71 9.29l-4-4a1 1 0 0 0-1.42 1.42L18.59 9H7a1 1 0 0 0 0 2h14a1 1 0 0 0 .92-.62a1 1 0 0 0-.21-1.09zM17 13H3a1 1 0 0 0-.92.62a1 1 0 0 0 .21 1.09l4 4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L5.41 15H17a1 1 0 0 0 0-2z" />
        </svg>
    );
}
*/

// Misc

export function IconDocumentsAccepted({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 100 100" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M68.58 47a2.29 2.29 0 0 0-3.24-3.24L48.63 60.51 41.09 53a2.29 2.29 0 0 0-3.24 3.24L48.63 67Z" />
            <path d="M86.71 29.38V77.5a6.86 6.86 0 0 1-6.87 6.87H29.33a6.87 6.87 0 0 1-6.88-6.87V13.34a6.88 6.88 0 0 1 6.88-6.88H63.8ZM63.8 31.67a2.29 2.29 0 0 1-2.29-2.29V11H29.33A2.29 2.29 0 0 0 27 13.34V77.5a2.29 2.29 0 0 0 2.29 2.29h50.55a2.3 2.3 0 0 0 2.29-2.29V31.67Zm2.29-16.44 11.85 11.85H66.09Z" fillRule="evenodd" />
            <path d="M17.87 20.21v61.87A6.88 6.88 0 0 0 24.74 89h52.81v4.58H24.74a11.46 11.46 0 0 1-11.45-11.5V20.21Z" />
        </svg>
    );
}

export function IconDocument({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) { // temp for now as a copy of IconDocumentsAccepted() wo/ horizontal alignment
    return (
        <svg viewBox="0 0 100 100" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M86.71 29.38V77.5a6.86 6.86 0 0 1-6.87 6.87H29.33a6.87 6.87 0 0 1-6.88-6.87V13.34a6.88 6.88 0 0 1 6.88-6.88H63.8ZM63.8 31.67a2.29 2.29 0 0 1-2.29-2.29V11H29.33A2.29 2.29 0 0 0 27 13.34V77.5a2.29 2.29 0 0 0 2.29 2.29h50.55a2.3 2.3 0 0 0 2.29-2.29V31.67Zm2.29-16.44 11.85 11.85H66.09Z" fillRule="evenodd" />
            <path d="M17.87 20.21v61.87A6.88 6.88 0 0 0 24.74 89h52.81v4.58H24.74a11.46 11.46 0 0 1-11.45-11.5V20.21Z" />
        </svg>
    );
}

/*
function IconChevronUp({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M5.843 15.407L11.5 9.75l5.657 5.657l-.707.707l-4.95-4.95l-4.95 4.95l-.707-.707z" />
        </svg>
    );
}

function IconChevronDown({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M5.843 9.593L11.5 15.25l5.657-5.657l-.707-.707l-4.95 4.95l-4.95-4.95l-.707.707z" />
        </svg>
    );
}

function IconPreview({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 36 36" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M32 4H4a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM4 30V6h28v24z" />
            <path d="M8.92 14a3 3 0 1 0-3-3a3 3 0 0 0 3 3zm0-4.6A1.6 1.6 0 1 1 7.33 11a1.6 1.6 0 0 1 1.59-1.59z" />
            <path d="M22.78 15.37l-5.4 5.4l-4-4a1 1 0 0 0-1.41 0L5.92 22.9v2.83l6.79-6.79L16 22.18l-3.75 3.75H15l8.45-8.45L30 24v-2.82l-5.81-5.81a1 1 0 0 0-1.41 0z" />
        </svg>
    );
}

export function IconFolder({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 256 256" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M240.258 111.814A14.034 14.034 0 0 0 228.9 106H214V88a14.016 14.016 0 0 0-14-14h-69.333a2.013 2.013 0 0 1-1.2-.4l-27.734-20.8a14.087 14.087 0 0 0-8.4-2.8H40a14.016 14.016 0 0 0-14 14v144c0 .038.005.075.006.113c.001.085.007.169.013.253a6.07 6.07 0 0 0 .074.651c.026.154.059.306.097.456c.015.062.03.123.047.184c.052.18.112.355.179.527c.012.031.022.064.035.095a6.085 6.085 0 0 0 .293.613c.01.02.024.039.035.059q.145.256.315.496c.013.02.024.041.039.061c.026.036.057.068.084.103c.092.122.188.24.289.355a5.919 5.919 0 0 0 .488.491c.048.044.093.088.142.13a6.171 6.171 0 0 0 .522.396l.013.008a5.947 5.947 0 0 0 .554.325c.048.026.097.047.147.071a5.745 5.745 0 0 0 .637.267q.226.08.46.141c.063.017.126.035.19.05c.16.036.324.064.49.088c.058.008.116.02.176.026A6.047 6.047 0 0 0 32 214h176a6 6 0 0 0 5.692-4.103l28.49-85.47a14.034 14.034 0 0 0-1.924-12.613zM40 62h53.334a2.013 2.013 0 0 1 1.2.4l27.733 20.8a14.087 14.087 0 0 0 8.4 2.8H200a2.003 2.003 0 0 1 2 2v18H69.766a13.983 13.983 0 0 0-13.282 9.573L38 171.026V64a2.003 2.003 0 0 1 2-2zm190.798 58.632L203.676 202H40.325l27.544-82.632A1.998 1.998 0 0 1 69.766 118H228.9a2 2 0 0 1 1.898 2.632z" />
        </svg>
    );
}
*/

export function IconRocket({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 512 512" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M256 421.6c-18.1 0-33.2-6.8-42.9-10.9-5.4-2.3-11.3 1.8-10.9 7.6l3.5 51c.2 3.1 3.8 4.7 6.3 2.8l14.5-11c1.8-1.4 4.5-.9 5.7 1l20.5 32.1c1.5 2.4 5.1 2.4 6.6 0l20.5-32.1c1.2-1.9 3.9-2.4 5.7-1l14.5 11c2.5 1.9 6.1.3 6.3-2.8l3.5-51c.4-5.8-5.5-10-10.9-7.6-9.8 4.1-24.8 10.9-42.9 10.9z" />
            <path d="M397.7 293.1l-48-49.1c0-158-93.2-228-93.2-228s-94.1 70-94.1 228l-48 49.1c-1.8 1.8-2.6 4.5-2.2 7.1L130.6 412c.9 5.7 7.1 8.5 11.8 5.4l67.1-45.4s20.7 20 47.1 20c26.4 0 46.1-20 46.1-20l67.1 45.4c4.6 3.1 10.8.3 11.8-5.4l18.5-111.9c.2-2.6-.6-5.2-2.4-7zM256.5 192c-17 0-30.7-14.3-30.7-32s13.8-32 30.7-32c17 0 30.7 14.3 30.7 32s-13.7 32-30.7 32z" />
        </svg>
    );
}

function IconSearchDoc({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M15.5 2C13 2 11 4 11 6.5s2 4.5 4.5 4.5c.9 0 1.7-.3 2.4-.7l3.1 3.1l1.4-1.4l-3.1-3.1c.4-.7.7-1.5.7-2.4C20 4 18 2 15.5 2M4 4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5l-2-2v7H4V6h5.03c.06-.7.23-1.35.47-2H4m11.5 0C16.9 4 18 5.1 18 6.5S16.9 9 15.5 9S13 7.9 13 6.5S14.1 4 15.5 4z" />
        </svg>
    );
}


export function IconSearch({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39zM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7z" />
        </svg>
    );
}

export function IconClose({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42z" />
        </svg>
    );
}

export function IconCaseSensitive({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 16 16" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M9.187 11.702H7.785l-.693-1.96h-3.03l-.666 1.96H2L4.884 4h1.44l2.863 7.702zM6.753 8.7L5.685 5.627a3.639 3.639 0 0 1-.102-.483H5.56a3.144 3.144 0 0 1-.107.483L4.396 8.7h2.357z" />
            <path d="M14.277 11.702h-1.208v-.86h-.022c-.38.66-.936.99-1.67.99c-.541 0-.965-.148-1.273-.441c-.305-.294-.457-.682-.457-1.166c0-1.038.598-1.643 1.794-1.815l1.633-.231c0-.784-.373-1.177-1.117-1.177c-.656 0-1.246.226-1.773.677V6.59c.58-.344 1.25-.516 2.009-.516c1.39 0 2.084.684 2.084 2.052v3.577zM13.074 9l-1.155.162c-.358.046-.628.134-.81.263c-.18.125-.27.347-.27.666c0 .233.083.424.248.575c.168.146.392.22.671.22c.38 0 .693-.133.94-.398c.25-.268.376-.605.376-1.01V9z" />
        </svg>
    );
}


export function IconCtrl({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 16 16" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M9 7V6H8V5H7v1h-.5v1H7v3.56a1.823 1.823 0 0 0 2.009 1.439L9 11a.899.899 0 0 1-.998-.495L8 7h1z" />
            <path d="M14 3h1v9h-1V3z" />
            <path d="M13 6l-.085-.001c-.773 0-1.462.358-1.911.917L11 6.001h-1v6h1v-3a1.88 1.88 0 0 1 2.006-2l-.006-1z" />
            <path d="M4.19 12C2.16 12 1 10.54 1 8s1.16-4 3.19-4h.029c.539 0 1.052.114 1.515.32l-.424.901a2.719 2.719 0 0 0-1.08-.22h-.042C2.38 5.001 2 6.631 2 8.001s.38 3 2.19 3c.497-.013.96-.145 1.366-.368l.444.898a3.943 3.943 0 0 1-1.806.47z" />
        </svg>
    );
}
