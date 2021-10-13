import React, { SVGProps } from 'react';

function UISymbolsDefs() {
    return (
        <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} version="1.1"
            xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <defs>

                <symbol id="icon-quill" viewBox="0 0 32 32">
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
                </symbol>

                {/* apps */}

                <symbol id="app-windows" viewBox="0 0 24 24">
                    <path d="M2.67 5.3v.61l-.71.3V5.6l.71-.3m0 5.94v.62l-.71.29v-.59l.71-.32m0 6.03v.62l-.71.29v-.59l.71-.32M2.6 7.29v.55l-.57.26v-.54l.57-.27m0 1.99v.54l-.57.26v-.54l.57-.26m0 4.03v.53l-.57.26v-.54l.57-.25m0 2.02v.54l-.57.26v-.53l.57-.27m1.9-9.69v.72l-1 .37V6l1-.36m0 6.02v.71l-1 .37v-.71l1-.37m0 6.04v.71l-1 .4v-.71l1-.4m-.07-9.98v.66l-.79.3V8l.79-.28m0 2.01v.64l-.78.3V10l.78-.27m0 4.01v.64l-.78.31v-.66l.78-.29m0 2.02v.65l-.78.31v-.66l.78-.3m1.88-9.67v.85l-1.26.49v-.84l1.26-.5m0 6.02v.85l-1.26.49v-.84l1.26-.5m0 5.97v.85l-1.26.5v-.85l1.26-.5m-.06-9.9v.76l-1.06.4v-.73l1.06-.43m0 2v.75l-1.06.42v-.75l1.06-.42m0 4.01v.75l-1.06.43v-.75l1.06-.43m0 1.95v.76l-1.06.42v-.75l1.06-.43m2.04-10.1v1.12l-1.57.62V6.67l1.57-.63m0 6.02v1.13l-1.57.61v-1.12l1.57-.62m0 5.97v1.12l-1.57.62v-1.11l1.57-.63m-.09-9.9v1.03l-1.31.53V8.66l1.31-.53m0 2v1.02l-1.31.53v-1.03l1.31-.52m0 4.02v1.03l-1.31.52v-1.03l1.31-.52m0 1.95v1.02l-1.31.52v-1.01l1.31-.53m2.14-10.25v1.47L8.61 8V6.56l1.73-.71m0 6.02v1.46l-1.73.7v-1.47l1.73-.69m0 5.97v1.46l-1.73.7v-1.46l1.73-.7m-.08-9.79v1.23l-1.48.59V8.64l1.48-.59m0 1.92v1.23l-1.48.58v-1.22l1.48-.59m0 4.09v1.25l-1.48.57v-1.23l1.48-.59m0 1.94v1.25l-1.48.59V16.6l1.48-.6m2.19-10.88v2l-1.86.77V6c.64-.35 1.26-.65 1.86-.88m0 2.21v1.73l-1.86.78V8.1l1.86-.77m0 1.95v1.76l-1.86.78v-1.76l1.86-.78m0 1.97V13l-1.86.77V12l1.86-.75m0 1.96V15l-1.86.78V14l1.86-.79m0 2v1.75l-1.86.8V16l1.86-.79m0 1.96v1.87c-.73.28-1.35.55-1.86.8v-1.88l1.86-.79m9.59-11.99v14.05c-1.19-.79-2.67-1.18-4.45-1.18c-1.47 0-3.12.3-4.94.91v-1.9c.97-.37 2.03-.64 3.19-.8v-4.57c-.98.12-2.04.46-3.19 1.02V11.4c.99-.46 2.06-.77 3.19-.94V6c-1.02.18-2.08.53-3.19 1V5.03C14.27 4.34 15.86 4 17.41 4c1.68 0 3.22.39 4.63 1.18m-1.89 1.23c-.76-.41-1.65-.59-2.73-.59c-.13 0-.25.01-.37.02v4.54l.41-.01c.91 0 1.81.13 2.69.43V6.41m0 5.69c-.81-.36-1.72-.54-2.71-.54c-.13 0-.26.01-.39.02v4.58h.41c.99 0 1.89.12 2.69.37V12.1z" />
                </symbol>

                <symbol id="app-web-ie" viewBox="0 0 32 32">
                    <path d="M27.7 8.813c2.445-6.243-2.302-5.805-2.302-5.805c-3.046 0-6.855 2.73-6.855 2.73S14 4.531 9.457 7.234c-4.95 3.106-4.785 8.621-4.785 8.621C8.695 10.184 14.3 7.88 14.3 7.88v.375C6.027 13.816 4.07 21.957 3.582 23.617C3.09 25.277 3.418 29 6.898 29c3.485 0 7.02-2.762 7.02-2.762s.762.164 2.828.164c8.707 0 10.774-7.55 10.774-7.55h-7.727s-.543 2.464-3.316 2.464c-3.813 0-3.594-3.91-3.594-3.91h14.746c.707-10.062-8.215-11.508-8.215-11.508s3.152-2.195 5.875-2.195c4.313 0 2.273 4.973 2.273 4.973zM13.483 26.128s-5.312 3.172-7.699.973c-1.273-2.2.8-5.313.8-5.313s1.759 3.207 6.9 4.34zm6.391-12.149h-7.012s-.09-3.363 3.594-3.363c3.559 0 3.418 3.363 3.418 3.363z" />
                </symbol>

                {/* misc */}

                <symbol id="menu-hamburger" viewBox="0 0 21 21">
                    <path d="M4.5 6.5h12"></path>
                    <path d="M4.498 10.5h11.997"></path>
                    <path d="M4.5 14.5h11.995"></path>
                </symbol>

                {/* field icons */}

                <symbol id="input-field-text" viewBox="0 0 24 24">
                    <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"></path>
                    <path d="M5 8.5h1.5m1.5 0H6.5m0 0v7m0 0H5m1.5 0H8" strokeLinecap="round" strokeLinejoin="round"></path>
                </symbol>

                <symbol id="input-field-psw" viewBox="0 0 24 24">
                    <path d="M11.78 10.22a.75.75 0 0 0-1.06 1.06l.72.72l-.72.72a.75.75 0 1 0 1.06 1.06l.72-.72l.72.72a.75.75 0 0 0 1.06-1.062L13.561 12l.72-.72a.75.75 0 1 0-1.061-1.06l-.72.72l-.72-.72z" />
                    <path d="M5.22 10.22a.75.75 0 0 1 1.06 0l.72.72l.72-.72a.75.75 0 1 1 1.06 1.06l-.719.72l.72.718A.75.75 0 1 1 7.72 13.78L7 13.06l-.72.72a.75.75 0 0 1-1.06-1.06l.72-.72l-.72-.72a.75.75 0 0 1 0-1.06z" />
                    <path d="M16.5 13.5a.75.75 0 0 0 0 1.5h1.75a.75.75 0 0 0 0-1.5H16.5z" />
                    <path d="M5.25 5A3.25 3.25 0 0 0 2 8.25v7.5A3.25 3.25 0 0 0 5.25 19h13.5A3.25 3.25 0 0 0 22 15.75v-7.5A3.25 3.25 0 0 0 18.75 5H5.25zM3.5 8.25c0-.967.783-1.75 1.75-1.75h13.5c.967 0 1.75.783 1.75 1.75v7.5a1.75 1.75 0 0 1-1.75 1.75H5.25a1.75 1.75 0 0 1-1.75-1.75v-7.5z" />
                </symbol>

                <symbol id="input-field-chk" viewBox="0 0 21 21">
                    <path d="M5.5 3.5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z" />
                    <path d="M7.5 10.5l2 2l4-4" />
                </symbol>

                <symbol id="input-field-chk-empty" viewBox="0 0 21 21">
                    <path d="M5.5 3.5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z" />
                </symbol>

                <symbol id="input-field-list" viewBox="0 0 16 16">
                    <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h8A1.5 1.5 0 0 1 11 1.5v2A1.5 1.5 0 0 1 9.5 5h-8A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-8z" />
                    <path d="M7.823 2.823l-.396-.396A.25.25 0 0 1 7.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                </symbol>

                <symbol id="field-text" viewBox="0 0 16 16">
                    <path d="M6.5 10.5A.5.5 0 0 1 7 10h.5V6H6v.5a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V6H8.5v4H9a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5z" />
                    <path d="M1 5.5A2.5 2.5 0 0 1 3.5 3h9A2.5 2.5 0 0 1 15 5.5v5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 10.5v-5zM3.5 4A1.5 1.5 0 0 0 2 5.5v5A1.5 1.5 0 0 0 3.5 12h9a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 12.5 4h-9z" />
                </symbol>

                <symbol id="field-button" viewBox="0 0 100 100">
                    <path d="M9 72.6A11.43 11.43 0 0 0 20.43 84h59.14A11.43 11.43 0 0 0 91 72.6" stroke="#999" />
                    <rect x="6.56" y="15.97" width="86.87" height="63.19" rx="13.64" stroke="#0060c1" fill="#9bccfd" /> {/* #b7ffb7 */}
                    <path stroke="none" fill="#2a61ff"
                        d="M18.85 63.59c.1-1.49.2-3.72.2-5.68v-26.6h4.28v13.82h.1c1.53-2.45 4.28-4.05 8.13-4.05 5.91 0 10.1 4.55 10.05 11.24 0 7.86-5.37 11.78-10.69 11.78-3.45 0-6.21-1.23-8-4.14h-.14l-.2 3.63Zm4.48-8.82a7 7 0 0 0 .2 1.46A6.62 6.62 0 0 0 30 60.91c4.53 0 7.24-3.41 7.24-8.46 0-4.41-2.46-8.18-7.09-8.18a6.81 6.81 0 0 0-6.6 4.91 7.18 7.18 0 0 0-.25 1.64ZM52.3 35.26v6.32h6.21v3.05H52.3V56.5c0 2.73.84 4.28 3.26 4.28a10.2 10.2 0 0 0 2.51-.28l.19 3a11.29 11.29 0 0 1-3.84.55 6.29 6.29 0 0 1-4.68-1.68c-1.23-1.18-1.68-3.14-1.68-5.73v-12h-3.69v-3.06h3.69v-5.27ZM63.39 47.54c0-2.27 0-4.14-.2-6H67l.25 3.64h.1a8.9 8.9 0 0 1 7.88-4.14c3.3 0 8.42 1.82 8.42 9.37v13.18h-4.3V50.91c0-3.55-1.43-6.51-5.52-6.51A6.11 6.11 0 0 0 68 48.5a5.26 5.26 0 0 0-.3 1.86v13.23h-4.31Z"
                    />
                </symbol>

                {/* field state */}

                <symbol id="icon-preview" viewBox="0 0 36 36">
                    <path d="M32 4H4a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM4 30V6h28v24z" />
                    <path d="M8.92 14a3 3 0 1 0-3-3a3 3 0 0 0 3 3zm0-4.6A1.6 1.6 0 1 1 7.33 11a1.6 1.6 0 0 1 1.59-1.59z" />
                    <path d="M22.78 15.37l-5.4 5.4l-4-4a1 1 0 0 0-1.41 0L5.92 22.9v2.83l6.79-6.79L16 22.18l-3.75 3.75H15l8.45-8.45L30 24v-2.82l-5.81-5.81a1 1 0 0 0-1.41 0z" />
                </symbol>

                <symbol id="icon-inout" viewBox="0 0 24 24">
                    <path d="M21.71 9.29l-4-4a1 1 0 0 0-1.42 1.42L18.59 9H7a1 1 0 0 0 0 2h14a1 1 0 0 0 .92-.62a1 1 0 0 0-.21-1.09zM17 13H3a1 1 0 0 0-.92.62a1 1 0 0 0 .21 1.09l4 4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L5.41 15H17a1 1 0 0 0 0-2z" />
                </symbol>

                {/* chevrons */}
                
                <symbol id="icon-chevron-down" viewBox="0 0 24 24">
                    <path d="M5.843 9.593L11.5 15.25l5.657-5.657l-.707-.707l-4.95 4.95l-4.95-4.95l-.707.707z" />
                </symbol>

                <symbol id="icon-chevron-up" viewBox="0 0 24 24">
                    <path d="M5.843 15.407L11.5 9.75l5.657 5.657l-.707.707l-4.95-4.95l-4.95 4.95l-.707-.707z" />
                </symbol>

            </defs>
        </svg>
    );
}

// apps

export function IconAppWindows(props: SVGProps<SVGSVGElement>) {
    const { className = '', ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            <use xlinkHref="#app-windows" />
        </svg>
    );
}

export function IconAppWebIE(props: SVGProps<SVGSVGElement>) {
    const { className = '', ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            <use xlinkHref="#app-web-ie" />
        </svg>
    );
}

// misc

export function IconMenuHamburger(props: SVGProps<SVGSVGElement>) {
    const { className = '', ...rest } = props;
    return (
        <svg strokeLinecap="round" fill="none" stroke="currentColor" strokeWidth={1.2} className={`w-full h-full ${className}`} {...rest}>
            <use xlinkHref="#menu-hamburger" />
        </svg>
    );
}

// field icons

export function IconInputFieldText(props: SVGProps<SVGSVGElement>) {
    const { className = '', ...rest } = props;
    return (
        <svg strokeLinecap="round" strokeLinejoin="round" fill="none" strokeWidth={1.5} stroke="currentColor" className={`w-full h-full ${className}`} {...rest}>
            <use xlinkHref="#input-field-text" />
        </svg>
    );
}

export function IconInputFieldPsw(props: SVGProps<SVGSVGElement>) {
    const { className = '', ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            <use xlinkHref="#input-field-psw" />
        </svg>
    );
}

export function IconInputFieldChk(props: SVGProps<SVGSVGElement>) {
    const { className = '', ...rest } = props;
    return (
        <svg fill="none" stroke="currentColor" className={`w-full h-full ${className}`} {...rest}>
            <use xlinkHref="#input-field-chk" />
        </svg>
    );
}

export function IconInputFieldChkEmpty(props: SVGProps<SVGSVGElement>) {
    const { className = '', ...rest } = props;
    return (
        <svg fill="none" stroke="currentColor" className={`w-full h-full ${className}`} {...rest}>
            <use xlinkHref="#input-field-chk-empty" />
        </svg>
    );
}

export function IconInputFieldList(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#input-field-list" />
        </svg>
    );
}

export function IconFieldText(props: SVGProps<SVGSVGElement>) {
    const { className = '', ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            <use xlinkHref="#field-text" />
        </svg>
    );
}

export function IconButton(props: SVGProps<SVGSVGElement>) {
    const { className = '', ...rest } = props;
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={5} className={`w-full h-full ${className}`} {...rest}>
            <use xlinkHref="#field-button" />
        </svg>
    );
}

/*
export function s(props: SVGProps<SVGSVGElement>) {
    const { className = '', ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            <use xlinkHref="#" />
        </svg>
    );
}

<symbol id="" viewBox="0 0 24 24">
</symbol>

*/

// field state

export function IconPreview(props: SVGProps<SVGSVGElement>) {
    const { className = '', ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            <use xlinkHref="#icon-preview" />
        </svg>
    );
}

export function IconInOut(props: SVGProps<SVGSVGElement>) {
    const { className = '', ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            <use xlinkHref="#icon-inout" />
        </svg>
    );
}

// chevrons

export function IconChevronDown(props: SVGProps<SVGSVGElement>) {
    const { className = '', ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            <use xlinkHref="#icon-chevron-down" />
        </svg>
    );
}

export function IconChevronUp(props: SVGProps<SVGSVGElement>) {
    const { className = '', ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            <use xlinkHref="#icon-chevron-up" />
        </svg>
    );
}

export default UISymbolsDefs;
