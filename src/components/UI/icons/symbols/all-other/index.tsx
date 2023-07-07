import React, { HTMLAttributes, SVGAttributes, SVGProps } from 'react';

// field row state

function SymbolPreview() {
    return (<>
        <symbol id="icon-preview" viewBox="0 0 24 24">
            <rect x="1.49" y="3.46" width="21.02" height="17.08" rx=".73" ry=".73" />
            <circle cx="5.66" cy="7.12" r="1.62" />
            <path d="m3.55 16.49 4.73-4.73 3.26 3.11" />
            <path d="m8.96 17.71 6.84-7.02 4.66 4.65" />
        </symbol>
    </>);
}

function SymbolInOut() {
    return (<>
        <symbol id="icon-inout" viewBox="0 0 24 24">
            <path d="m7.7 19-4.55-5.51h13.3" />
            <path d="m16.3 5 4.55 5.51H7.55" />
        </symbol>
    </>);
}

// form options

function SymbolOptionsLock() {
    return (<>
        <symbol id="options-lock" viewBox="0 0 24 24">
            <path d="M5.99 8.57h12.02c1.09 0 1.98.89 1.98 1.98v4.01a8 8 0 0 1-15.98 0v-4.01c0-1.09.89-1.98 1.98-1.98Z" />
            <path d="M17.18 6.64v1.93H6.82V6.64a5.17 5.17 0 1 1 10.36 0Z" />
            <ellipse cx="12" cy="15.63" rx="2.01" ry="1.94" />
        </symbol>
    </>);
}

function SymbolOptionsQl_firstVersion() {
    return (<>
        <symbol id="options-ql" viewBox="0 0 24 24">
            <path strokeLinejoin="round" d="m4.46 22.56 14.9-12.07a824.5 824.5 0 0 0-7.02-1.78l7.2-7.27h-8.96L5.15 12.75l7.11-.75S4.59 22.19 4.47 22.56Z" />
        </symbol>
    </>);
}

// info

function SymbolOptionsQl() {
    return (<>
        <symbol id="options-ql" viewBox="0 0 24 24">
            <path d="M5.85 8.47c-.16 4.39.56 9.05 1.51 13.88.03.14.23.14.26 0l1.66-8.56 5.16 2 3.75-11.93-6.48-2.32-1.25 8.45-4.61-1.52Z" />
        </symbol>
    </>);
}

function SymbolFolder() {
    return (<>
        <symbol id="icon-folder" viewBox="0 0 256 256">
            <path d="M240.258 111.814A14.034 14.034 0 0 0 228.9 106H214V88a14.016 14.016 0 0 0-14-14h-69.333a2.013 2.013 0 0 1-1.2-.4l-27.734-20.8a14.087 14.087 0 0 0-8.4-2.8H40a14.016 14.016 0 0 0-14 14v144c0 .038.005.075.006.113c.001.085.007.169.013.253a6.07 6.07 0 0 0 .074.651c.026.154.059.306.097.456c.015.062.03.123.047.184c.052.18.112.355.179.527c.012.031.022.064.035.095a6.085 6.085 0 0 0 .293.613c.01.02.024.039.035.059q.145.256.315.496c.013.02.024.041.039.061c.026.036.057.068.084.103c.092.122.188.24.289.355a5.919 5.919 0 0 0 .488.491c.048.044.093.088.142.13a6.171 6.171 0 0 0 .522.396l.013.008a5.947 5.947 0 0 0 .554.325c.048.026.097.047.147.071a5.745 5.745 0 0 0 .637.267q.226.08.46.141c.063.017.126.035.19.05c.16.036.324.064.49.088c.058.008.116.02.176.026A6.047 6.047 0 0 0 32 214h176a6 6 0 0 0 5.692-4.103l28.49-85.47a14.034 14.034 0 0 0-1.924-12.613zM40 62h53.334a2.013 2.013 0 0 1 1.2.4l27.733 20.8a14.087 14.087 0 0 0 8.4 2.8H200a2.003 2.003 0 0 1 2 2v18H69.766a13.983 13.983 0 0 0-13.282 9.573L38 171.026V64a2.003 2.003 0 0 1 2-2zm190.798 58.632L203.676 202H40.325l27.544-82.632A1.998 1.998 0 0 1 69.766 118H228.9a2 2 0 0 1 1.898 2.632z" />
        </symbol>
    </>);
}

function SymbolAttantion() {
    return (<>
        <symbol id="icon-attantion" viewBox="0 0 48 48">
            <path d="M24 44a19.937 19.937 0 0 0 14.142-5.858A19.937 19.937 0 0 0 44 24a19.938 19.938 0 0 0-5.858-14.142A19.937 19.937 0 0 0 24 4A19.938 19.938 0 0 0 9.858 9.858A19.938 19.938 0 0 0 4 24a19.937 19.937 0 0 0 5.858 14.142A19.938 19.938 0 0 0 24 44z" />
            <path d="M24 37a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5z" fill="currentColor" stroke="none" />
            <path d="M24 12v16" />
        </symbol>
    </>);
}

function SymbolDot() {
    return (<>
        <symbol id="icon-dot" viewBox="0 0 24 24">
            <path d="M12 16a4 4 0 1 1 0-8a4 4 0 0 1 0 8z" />
        </symbol>
    </>);
}

function SymbolOpenLink() {
    return (<>
        <symbol id="open-link" viewBox="0 0 24 24">
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </symbol>
    </>);
}

function SymbolGear() {
    return (<>
        <symbol id="icon-gear" viewBox="0 0 24 24">
            <path d="M14.84 11.99a2.84 2.84 0 0 1-3.6 2.78 2.6 2.6 0 0 1-1.32-.79 2.6 2.6 0 0 1-.7-1.2 2.63 2.63 0 0 1 0-1.59c.12-.46.37-.87.7-1.2a2.8 2.8 0 0 1 2.75-.79 2.79 2.79 0 0 1 2.06 2.01c.07.24.11.5.11.76Z" />
            <path d="m21.22 14.28.82.52a10.24 10.24 0 0 1-2.6 4.51l-.91-.48c-1.69-.87-3.91.3-3.91 2.17l-.09 1.13a9.94 9.94 0 0 1-5.21 0L9.23 21c0-1.87-2-3.04-3.86-2.17l-.87.43a9.26 9.26 0 0 1-2.56-4.38l.91-.61c1.52-1 1.52-3.56 0-4.56l-.91-.61A9.54 9.54 0 0 1 4.5 4.72l.87.43c1.87.87 3.86-.3 3.86-2.17l.09-1.13a9.7 9.7 0 0 1 5.21 0l.09 1.13c0 1.87 2.21 3.04 3.91 2.17l.91-.48a10.16 10.16 0 0 1 2.6 4.51l-.82.52a2.68 2.68 0 0 0 0 4.56Z" />
        </symbol>
    </>);
}

function SymbolGear_8leafs() {
    return (<>
        <symbol id="icon-gear" viewBox="0 0 24 24">
            <path d="M12.05 7.1a4.9 4.9 0 1 0-.02 9.8 4.9 4.9 0 0 0 .02-9.8Z" />
            <path d="M14.4 2c-.76 2.17-4.04 2.16-4.8 0-1.05.25-2.06.67-2.98 1.23 1 2.07-1.33 4.38-3.39 3.39A9.99 9.99 0 0 0 2 9.6c2.17.76 2.16 4.04 0 4.8.25 1.05.67 2.06 1.23 2.98 2.07-.99 4.38 1.32 3.39 3.39.92.57 1.92.98 2.98 1.23.76-2.16 4.04-2.15 4.8 0 1.05-.25 2.06-.67 2.98-1.23-1-2.07 1.33-4.38 3.39-3.39.57-.92.98-1.92 1.23-2.98-2.17-.76-2.15-4.04 0-4.8a10.37 10.37 0 0 0-1.23-2.98c-2.07.99-4.38-1.32-3.39-3.39A9.99 9.99 0 0 0 14.4 2Z" />
        </symbol>
    </>);
}

// misc

function SymbolBurger() {
    return (<>
        <symbol id="icon-burger" viewBox="0 0 21 21">
            <path d="M4.5 6.5h12" />
            <path d="M4.498 10.5h11.997" />
            <path d="M4.5 14.5h11.995" />
        </symbol>
    </>);
}

function SymbolCross() {
    return (<>
        <symbol id="icon-cross" viewBox="0 0 24 24">
            <path d="m2 2 20 20" />
            <path d="M2 22 22 2" />
        </symbol>
    </>);
}

function SymbolPen() {
    return (<>
        <symbol id="icon-pen" viewBox="0 0 24 24">
            <path d="M1.48 20.12 6.37 8.39l7.65-2.91 5.01 3.21-.64 8.27-14.65 5.53c-.21.08-.38-.19-.21-.34l7.4-6.6s.23-.28.57-.39c.65-.21 1.7-.17 2.42-1.18 1.37-1.91-1.11-4.28-3.09-3.1-1.04.62-1.12 2.04-1.24 2.89-.05.39-.32.66-.32.66L1.85 20.4c-.19.16-.47-.05-.37-.28Z" />
            <path d="m15.79 3.77 1.77-2.22c.06-.07.15-.08.23-.03l4.68 3.16c.08.06.1.17.04.25L20.64 7.2a.17.17 0 0 1-.23.03L15.8 3.92s-.05-.08 0-.14Z" />
        </symbol>
    </>);
}

function Symbol() {
    return (<>
    </>);
}

export function DefAllOther() {
    return (<>
        {/* field row state */}

        {SymbolPreview()}
        {SymbolInOut()}

        {/* form options */}

        {SymbolOptionsLock()}
        {SymbolOptionsQl()} {/* {SymbolOptionsQl_firstVersion()} */}

        {/* info */}

        {SymbolOptionsQl()}
        {SymbolFolder()}
        {SymbolAttantion()}
        {SymbolDot()}
        {SymbolOpenLink()}
        {SymbolGear()} {/* {SymbolGear_8leafs()} */}

        {/* misc */}

        {SymbolBurger()}
        {SymbolCross()}
        {SymbolPen()}

        {/* Login and password change */}

        <symbol id="icon-login" viewBox="0 0 24 24">
            <path d="m17.93 8.75-4.49 4.49 2.1 2.07a.99.99 0 0 1-.68 1.69s-1.79.2-4.05.2-3.45-.08-3.45-.08a1 1 0 0 1-1.01-.99s-.11-1.96-.11-3.78.11-3.75.11-3.75a.98.98 0 0 1 1.68-.7l2.4 2.37 4.51-4.51a1.03 1.03 0 0 1 1.47 0l1.51 1.51c.41.41.41 1.07 0 1.48Z" />
            <path d="M19.35 21.66s-3.87.18-7.3.18-7.3-.18-7.3-.18a2.25 2.25 0 0 1-2.25-2.25s-.35-2.65-.35-7.41c0-4.4.16-5.64.35-7.41.13-1.24 1.01-2.25 2.25-2.25 0 0 3.9-.18 7.3-.18s7.3.18 7.3.18a2.25 2.25 0 0 1 2.25 2.25s.24 3.69.24 7.41-.24 7.41-.24 7.41a2.25 2.25 0 0 1-2.25 2.25Z" />
        </symbol>

        <symbol id="icon-change" viewBox="0 0 24 24">
            <path d="m21.5 10-3 2.8c-.4.5-1.1.5-1.6 0L14 10c-.4-.5.1-1.4.8-1.4H16V7.4c0-1.4-1-2.5-2.4-2.5H10C8.6 5 7.5 6 7.5 7.4c0 .4-.4.7-.8.7H5.6c-.6 0-1.1-.4-1.1-1v-.7c0-2.3 1.9-4.2 4.2-4.2h6.6c2.3 0 4.2 1.9 4.2 4.2v2.2h1.2c.7 0 1.3.9.8 1.4ZM2.5 14l3-2.8c.4-.5 1.1-.5 1.6 0l3 2.8c.4.5-.1 1.4-.8 1.4H8v1.2c0 1.4 1 2.5 2.4 2.5H14c1.3 0 2.4-1.1 2.4-2.5 0-.4.4-.8.8-.8h1.1c.6 0 1.1.5 1.1 1.2v.6c0 2.3-1.9 4.2-4.2 4.2H8.7c-2.3 0-4.2-1.9-4.2-4.2v-2.2H3.3c-.7 0-1.3-.9-.8-1.4Z" />
        </symbol>

        {/* classic check boxes */}

        <symbol id="classic-chk" viewBox="0 0 21 21">
            <path d="M5.5 3.5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z" />
            <path d="M7.5 10.5l2 2l4-4" />
        </symbol>

        <symbol id="classic-chk-empty" viewBox="0 0 21 21">
            <path d="M5.5 3.5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z" />
        </symbol>

        {/* chevrons */}

        <symbol id="icon-chevron-down" viewBox="0 0 24 24">
            <path d="M5.843 9.593L11.5 15.25l5.657-5.657l-.707-.707l-4.95 4.95l-4.95-4.95l-.707.707z" />
        </symbol>

        <symbol id="icon-chevron-up" viewBox="0 0 24 24">
            <path d="M5.843 15.407L11.5 9.75l5.657 5.657l-.707.707l-4.95-4.95l-4.95 4.95l-.707-.707z" />
        </symbol>

        <symbol id="icon-doubledown" viewBox="0 0 24 24">
            <path d="M17.157 7.593L11.5 13.25L5.843 7.593l.707-.707l4.95 4.95l4.95-4.95l.707.707zm0 4L11.5 17.25l-5.657-5.657l.707-.707l4.95 4.95l4.95-4.95l.707.707z" />
        </symbol>

        <symbol id="icon-chevron-right" viewBox="0 0 15 15">
            <path d="M6.16 3.14a.5.5 0 0 1 .7.02l3.76 4c.18.19.18.49 0 .68l-3.75 4a.5.5 0 1 1-.73-.68L9.56 7.5 6.14 3.84a.5.5 0 0 1 .02-.7Z" />
        </symbol>

        {/* good but not used */}
        {/* <symbol id="icon-quill" viewBox="0 0 32 32">
            <path d="M0 32c4-12 14.469-32 32-32-8.219 6.594-12 22-18 22s-6 0-6 0l-6 10h-2z"></path>
        </symbol>
        <symbol id="icon-user" viewBox="0 0 32 32">
            <path
                d="M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z">
            </path>
        </symbol>
        <symbol id="icon-users" viewBox="0 0 32 32">
            <path
                d="M24 24.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z">
            </path>
            <path
                d="M10.225 24.854c1.728-1.13 3.877-1.989 6.243-2.513-0.47-0.556-0.897-1.176-1.265-1.844-0.95-1.726-1.453-3.627-1.453-5.497 0-2.689 0-5.228 0.956-7.305 0.928-2.016 2.598-3.265 4.976-3.734-0.529-2.39-1.936-3.961-5.682-3.961-6 0-6 4.029-6 9 0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h8.719c0.454-0.403 0.956-0.787 1.506-1.146z">
            </path>
        </symbol> */}
    </>);
}

//#region all other

// field row state

export function IconPreview({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-preview" />
        </svg>
    );
}

export function IconInOut({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-inout" />
        </svg>
    );
}

// form options

export function IconOptionsLock({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#options-lock" />
        </svg>
    );
}

export function IconOptionsQL({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#options-ql" />
        </svg>
    );
}

// info

export function IconFolder({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-folder" />
        </svg>
    );
}

export function IconAttention({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-attantion" />
        </svg>
    );
}

export function IconDot({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-dot" />
        </svg>
    );
}

export function IconOpenLink({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#open-link" />
        </svg>
    );
}

export function IconGear({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-gear" />
        </svg>
    );
}

// misc

export function IconMenuHamburger({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg strokeLinecap="round" fill="none" stroke="currentColor" strokeWidth={1.2} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-burger" />
        </svg>
    );
}

export function IconCross({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-cross" />
        </svg>
    );
}

export function IconPen({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-pen" />
        </svg>
    );
}

// Login and password change

export function IconFormLogin({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeMiterlimit={2} strokeWidth={1.44} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-login" />
        </svg>
    );
}

export function IconFormChange({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeMiterlimit={10} strokeWidth={1.39} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-change" />
        </svg>
    );
}

// classic check boxes

export function IconCheckbox({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#classic-chk" />
        </svg>
    );
}

export function IconCheckboxEmpty({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#classic-chk-empty" />
        </svg>
    );
}

// chevrons

export function IconChevronDown({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-chevron-down" />
        </svg>
    );
}

export function IconChevronUp({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-chevron-up" />
        </svg>
    );
}

export function IconDoubleDown({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-doubledown" />
        </svg>
    );
}

export function IconChevronRight({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-chevron-right" />
        </svg>
    );
}

/*
export function d({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
        </svg>
    );
}
*/

/*
export function s({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#" />
        </svg>
    );
}

<symbol id="" viewBox="0 0 24 24">
</symbol>
*/

//#endregion all other
