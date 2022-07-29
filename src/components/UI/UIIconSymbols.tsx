import React, { SVGProps } from 'react';

export function UISymbolDefs() {
    return (
        <svg id="svgfont" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} version="1.1"
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

                {/* Win95 */}
                {/* <symbol id="app-windows" viewBox="0 0 24 24">
                    <path d="M2.67 5.3v.61l-.71.3V5.6l.71-.3m0 5.94v.62l-.71.29v-.59l.71-.32m0 6.03v.62l-.71.29v-.59l.71-.32M2.6 7.29v.55l-.57.26v-.54l.57-.27m0 1.99v.54l-.57.26v-.54l.57-.26m0 4.03v.53l-.57.26v-.54l.57-.25m0 2.02v.54l-.57.26v-.53l.57-.27m1.9-9.69v.72l-1 .37V6l1-.36m0 6.02v.71l-1 .37v-.71l1-.37m0 6.04v.71l-1 .4v-.71l1-.4m-.07-9.98v.66l-.79.3V8l.79-.28m0 2.01v.64l-.78.3V10l.78-.27m0 4.01v.64l-.78.31v-.66l.78-.29m0 2.02v.65l-.78.31v-.66l.78-.3m1.88-9.67v.85l-1.26.49v-.84l1.26-.5m0 6.02v.85l-1.26.49v-.84l1.26-.5m0 5.97v.85l-1.26.5v-.85l1.26-.5m-.06-9.9v.76l-1.06.4v-.73l1.06-.43m0 2v.75l-1.06.42v-.75l1.06-.42m0 4.01v.75l-1.06.43v-.75l1.06-.43m0 1.95v.76l-1.06.42v-.75l1.06-.43m2.04-10.1v1.12l-1.57.62V6.67l1.57-.63m0 6.02v1.13l-1.57.61v-1.12l1.57-.62m0 5.97v1.12l-1.57.62v-1.11l1.57-.63m-.09-9.9v1.03l-1.31.53V8.66l1.31-.53m0 2v1.02l-1.31.53v-1.03l1.31-.52m0 4.02v1.03l-1.31.52v-1.03l1.31-.52m0 1.95v1.02l-1.31.52v-1.01l1.31-.53m2.14-10.25v1.47L8.61 8V6.56l1.73-.71m0 6.02v1.46l-1.73.7v-1.47l1.73-.69m0 5.97v1.46l-1.73.7v-1.46l1.73-.7m-.08-9.79v1.23l-1.48.59V8.64l1.48-.59m0 1.92v1.23l-1.48.58v-1.22l1.48-.59m0 4.09v1.25l-1.48.57v-1.23l1.48-.59m0 1.94v1.25l-1.48.59V16.6l1.48-.6m2.19-10.88v2l-1.86.77V6c.64-.35 1.26-.65 1.86-.88m0 2.21v1.73l-1.86.78V8.1l1.86-.77m0 1.95v1.76l-1.86.78v-1.76l1.86-.78m0 1.97V13l-1.86.77V12l1.86-.75m0 1.96V15l-1.86.78V14l1.86-.79m0 2v1.75l-1.86.8V16l1.86-.79m0 1.96v1.87c-.73.28-1.35.55-1.86.8v-1.88l1.86-.79m9.59-11.99v14.05c-1.19-.79-2.67-1.18-4.45-1.18c-1.47 0-3.12.3-4.94.91v-1.9c.97-.37 2.03-.64 3.19-.8v-4.57c-.98.12-2.04.46-3.19 1.02V11.4c.99-.46 2.06-.77 3.19-.94V6c-1.02.18-2.08.53-3.19 1V5.03C14.27 4.34 15.86 4 17.41 4c1.68 0 3.22.39 4.63 1.18m-1.89 1.23c-.76-.41-1.65-.59-2.73-.59c-.13 0-.25.01-.37.02v4.54l.41-.01c.91 0 1.81.13 2.69.43V6.41m0 5.69c-.81-.36-1.72-.54-2.71-.54c-.13 0-.26.01-.39.02v4.58h.41c.99 0 1.89.12 2.69.37V12.1z" />
                </symbol> */}

                <symbol id="app-windows" viewBox="0 0 24 24">
                    <path d="M9.57 2.44c-1.34.06-2.65.36-3.88.9l-2.07 7.21a8.55 8.55 0 0 1 4.06-.9c1.43.03 2.82.5 3.97 1.35l2.07-7.21a6.74 6.74 0 0 0-4.15-1.35ZM14.8 4.6l-2.07 7.21c1.8 1.17 3.97 2.25 8.03.45l2.07-7.21c-4.24 1.8-6.31.81-8.12-.45h.09Zm-7.67 6.31c-1.34.06-2.65.36-3.88.9l-2.07 7.21c4.24-1.8 6.22-.72 8.03.45l2.07-7.21a6.74 6.74 0 0 0-4.15-1.35Zm5.23 2.07-2.07 7.21c1.8 1.17 3.88 2.16 8.12.36l1.98-7.12c-4.15 1.8-6.22.81-8.03-.45Z" stroke-linecap="square" stroke-linejoin="bevel" />
                </symbol>

                {/* ie solid */}
                {/* <symbol id="app-web-ie" viewBox="0 0 32 32">
                    <path d="M27.7 8.813c2.445-6.243-2.302-5.805-2.302-5.805c-3.046 0-6.855 2.73-6.855 2.73S14 4.531 9.457 7.234c-4.95 3.106-4.785 8.621-4.785 8.621C8.695 10.184 14.3 7.88 14.3 7.88v.375C6.027 13.816 4.07 21.957 3.582 23.617C3.09 25.277 3.418 29 6.898 29c3.485 0 7.02-2.762 7.02-2.762s.762.164 2.828.164c8.707 0 10.774-7.55 10.774-7.55h-7.727s-.543 2.464-3.316 2.464c-3.813 0-3.594-3.91-3.594-3.91h14.746c.707-10.062-8.215-11.508-8.215-11.508s3.152-2.195 5.875-2.195c4.313 0 2.273 4.973 2.273 4.973zM13.483 26.128s-5.312 3.172-7.699.973c-1.273-2.2.8-5.313.8-5.313s1.759 3.207 6.9 4.34zm6.391-12.149h-7.012s-.09-3.363 3.594-3.363c3.559 0 3.418 3.363 3.418 3.363z" />
                </symbol> */}

                {/* ie outline w/ stroke */}
                {/* <symbol id="app-web-ie" viewBox="0 0 24 24">
                    <path d="M22 7.5c2.2-5-1-5.8-4.3-4.7-.4 0-1.3.4-.7.8a10 10 0 0 1 6.2 9.7c-4.7.4-9.9 0-14.7.1-.3 0-.6.1-.5.4.7 4 5.9 5.7 8.8 3 .2-.2.4-.4.7-.4h4.8c.1 0 .2 0 .1.2C19.1 24.8 6.9 24.5 4 16c-.5-1-1 1-1.2 1.3-.6 1.4-1 3-.3 4.5 1.2 1.6 3 .6 5.6-.1-5.5 2.6-8.1 1-7-3.7C2 13.8 6 8.6 9.8 6c1.4-.9.7-.7-.3-.5-2 .4-3.6 1.5-5 2.9 1.8-3.7 5.7-5.7 9.7-5.5 2.4-1.4 7.7-3.6 8.6.5 0 .4.3 2.5-.7 4.1Z" />
                    <path d="M13.3 11.8h4.9c.2 0 .4-.2.3-.5-1.2-5.2-9.1-5.2-10.4 0-.1.3 0 .4.3.4h4.9Z" />
                </symbol> */}

                {/* ie2 */}
                {/* <symbol id="app-web-ie" viewBox="0 0 24 24">
                    <path d="M22 7.5c2.2-5-1-5.8-4.3-4.7-.4 0-1.3.4-.7.8a10 10 0 0 1 6.2 9.7l-14.7.1c-.3 0-.6.1-.5.4.7 4 5.9 5.7 8.8 3 .2-.2.4-.4.7-.4h4.8c.1 0 .2 0 .1.2C19.1 24.8 6.9 24.5 4 16c-.5-1-1 1-1.2 1.3-.6 1.4-1 3-.3 4.5 1.2 1.6 3 .6 5.6-.1-5.5 2.6-8.1 1-7-3.7A19.4 19.4 0 0 1 9.8 5.8a20.2 20.2 0 0 0-6.1 5.8c1-5.6 6.5-9 10.5-8.8 2.4-1.4 7.7-3.6 8.6.5 0 .4.3 2.5-.7 4.1Zm-3.8 4.3c.2 0 .3-.2.3-.5-1.2-5.2-9.2-5.2-10.4 0-.1.3 0 .4.3.4h9.8Z" />
                </symbol> */}

                <symbol id="app-web-ie" viewBox="0 0 24 24">
                    <path d="M22.07 7.45c2.08-4.89-2.23-5.69-4.48-3.69-.09.08-.09.18.15.3 3.85 1.84 5.67 5.1 5.42 9.23-5.13.13-9.8.15-14.66.15-.26 0-.58.06-.49.38.7 3.99 5.86 5.71 8.83 2.97.21-.2.37-.4.69-.36h4.79c.13 0 .15.03.09.14-3.04 7.47-13.34 7.9-17.39 1.64-.41-.63-.26-.33-.41-.63-.2-.4-.25-.58-.51-.23-.81 1.12-1.77 2.63-1.09 4.03.88 1.83 2.66.8 5.22.05-5.48 2.57-7.89 1.43-7.17-3.3A17.98 17.98 0 0 1 9.79 5.87c.01-.03 0-.05-.02-.07-2.51 1.3-4.72 4.03-5.94 5.64-.06.06-.09.09-.17.1 1.03-5.59 6.51-8.89 10.52-8.74 2.44-1.38 7.75-3.56 8.63.54.05.34.3 2.51-.74 4.11Zm-3.9 4.3c.25 0 .37-.16.31-.41-1.22-5.19-9.13-5.25-10.4-.05-.09.3.03.46.34.46h9.75Z" />
                </symbol>

                <symbol id="app-web-chrome" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M21.17 8H12"></path><path d="M3.95 6.06L8.54 14" />
                    <path d="M10.88 21.94L15.46 14" />
                </symbol>

                {/* two hands */}
                {/* <symbol id="icon-manual-mode" viewBox="0 0 24 24">
                    <path d="M9.86 7.28C9.56 7.07 9 7.46 9 8a1.51 1.51 0 0 0 0 .3c0 1.13.62 2.39.39 3.46C8 9.82 7.39 7.21 6.33 5c-2.33-.84.15 3.74.57 4.81-.07.65.71.93.35 1.69-1-1.66-1.8-3.82-3-5.36-.39-.61-1-.75-1.16.25-.24.47 1 2.23 1.26 2.7v-.05a12 12 0 0 0 1.47 2.56 1.76 1.76 0 0 0 .34.76c0 .26 0 .26-.17.27-.83-.72-3.15-5.3-3.92-4.23-.79 1.31 1 2.24 1.34 3.22A25.22 25.22 0 0 1 5 13.71c0 .37-.3.18-.44 0a.09.09 0 0 1-.06-.06.13.13 0 0 0-.06-.05c-.75-.54-2.68-3.9-3.19-1.77.13 1.52 1.69 2.17 2.39 3.37s.06.05.09.07c1.49 2 2.29 4.45 4.78 3.64 3.69-1.32 2.95-8.18 1.35-11.63ZM14.14 7.28c.3-.21.87.18.86.67a1.51 1.51 0 0 1 0 .3c0 1.13-.62 2.39-.39 3.46 1.35-1.89 2-4.5 3.06-6.68 2.38-.87-.15 3.71-.57 4.78.07.65-.71.93-.35 1.69 1.05-1.66 1.8-3.82 3-5.36.39-.61 1-.75 1.16.25.24.47-1.05 2.23-1.26 2.7v-.05a12 12 0 0 1-1.41 2.56 1.76 1.76 0 0 1-.34.76c0 .26 0 .26.17.27.83-.72 3.15-5.3 3.92-4.23.79 1.31-1 2.24-1.34 3.22A25.22 25.22 0 0 0 19 13.71c0 .37.3.18.44 0a.09.09 0 0 0 .06-.06.13.13 0 0 1 .06-.05c.75-.54 2.68-3.9 3.19-1.77-.17 1.54-1.73 2.19-2.43 3.39s-.06.05-.09.07c-1.49 2-2.29 4.45-4.78 3.64-3.65-1.34-2.91-8.2-1.31-11.65Z" />
                </symbol> */}

                <symbol id="icon-manual-mode" viewBox="0 0 24 24">
                    <path d="M22.52 12.93c-.45-1.22-2.45-.96-3.97.02-.61.4-1.13.65-2.59.95-.64 0-.78-.68-.66-1.35l1.47-8.19c.42-2.08-2.14-2.84-2.65-.7l-1.27 7.12c-.64 1.78-.88 0-.88 0l-.35-7.67c0-2.78-2.73-2.95-2.73 0l.32 7.01c.14 2.77-.52 1.21-.52.99L7.4 4.87c-.62-2.63-3.07-1.95-2.63.44l1.19 5.56c.2 1.29-.81.68-.99.37L3.8 8.55c-.97-2.05-3.05-1.23-2.38.8l1.95 4.98c.19.54.33 1.09.42 1.66 0 1.4.91 4.26 1.65 5.01a6.87 6.87 0 0 0 9.73 0c1.8-2.02 2.66-2.87 3.37-4.42 0 0 1.82-1.53 4.08-2.81.2-.12-.11-.86-.11-.86Z" stroke-miterlimit="10" />
                </symbol>

                {/* misc */}

                <symbol id="menu-hamburger" viewBox="0 0 21 21">
                    <path d="M4.5 6.5h12"></path>
                    <path d="M4.498 10.5h11.997"></path>
                    <path d="M4.5 14.5h11.995"></path>
                </symbol>

                <symbol id="icon-catalog" viewBox="0 0 24 24">
                    <path d="M12.17 5.2Q18 2.23 23 5.2V20a12.15 12.15 0 0 0-10.83.53" />
                    {/* <path d="M14.5 8.22c2.74-1.47 4.64-1.47 7 0M14.5 11.22c2.74-1.47 4.64-1.47 7 0M14.5 14.22c2.74-1.47 4.64-1.47 7 0M3 8.91q3.77-2.19 7 0M2.88 11.38q3.78-2.19 7 0M2.88 14q3.78-2.19 7 0M2.88 16.69q3.78-2.19 7 0" /> */}
                    <path d="M12.17 5.2q-5.82-3-10.83 0V20a12.15 12.15 0 0 1 10.83.53ZM3.5 21.22a10.71 10.71 0 0 1 8.23 1.18.81.81 0 0 0 .87 0c2.3-1.5 5.08-2.07 8.9-1.17" />
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

                <symbol id="icon-doubledown" viewBox="0 0 24 24">
                    <path d="M17.157 7.593L11.5 13.25L5.843 7.593l.707-.707l4.95 4.95l4.95-4.95l.707.707zm0 4L11.5 17.25l-5.657-5.657l.707-.707l4.95 4.95l4.95-4.95l.707.707z" />
                </symbol>

                {/* Info */}

                <symbol id="icon-folder" viewBox="0 0 256 256">
                    <path d="M240.258 111.814A14.034 14.034 0 0 0 228.9 106H214V88a14.016 14.016 0 0 0-14-14h-69.333a2.013 2.013 0 0 1-1.2-.4l-27.734-20.8a14.087 14.087 0 0 0-8.4-2.8H40a14.016 14.016 0 0 0-14 14v144c0 .038.005.075.006.113c.001.085.007.169.013.253a6.07 6.07 0 0 0 .074.651c.026.154.059.306.097.456c.015.062.03.123.047.184c.052.18.112.355.179.527c.012.031.022.064.035.095a6.085 6.085 0 0 0 .293.613c.01.02.024.039.035.059q.145.256.315.496c.013.02.024.041.039.061c.026.036.057.068.084.103c.092.122.188.24.289.355a5.919 5.919 0 0 0 .488.491c.048.044.093.088.142.13a6.171 6.171 0 0 0 .522.396l.013.008a5.947 5.947 0 0 0 .554.325c.048.026.097.047.147.071a5.745 5.745 0 0 0 .637.267q.226.08.46.141c.063.017.126.035.19.05c.16.036.324.064.49.088c.058.008.116.02.176.026A6.047 6.047 0 0 0 32 214h176a6 6 0 0 0 5.692-4.103l28.49-85.47a14.034 14.034 0 0 0-1.924-12.613zM40 62h53.334a2.013 2.013 0 0 1 1.2.4l27.733 20.8a14.087 14.087 0 0 0 8.4 2.8H200a2.003 2.003 0 0 1 2 2v18H69.766a13.983 13.983 0 0 0-13.282 9.573L38 171.026V64a2.003 2.003 0 0 1 2-2zm190.798 58.632L203.676 202H40.325l27.544-82.632A1.998 1.998 0 0 1 69.766 118H228.9a2 2 0 0 1 1.898 2.632z" />
                </symbol>

                <symbol id="icon-attantion" viewBox="0 0 48 48">
                    <path d="M24 44a19.937 19.937 0 0 0 14.142-5.858A19.937 19.937 0 0 0 44 24a19.938 19.938 0 0 0-5.858-14.142A19.937 19.937 0 0 0 24 4A19.938 19.938 0 0 0 9.858 9.858A19.938 19.938 0 0 0 4 24a19.937 19.937 0 0 0 5.858 14.142A19.938 19.938 0 0 0 24 44z" />
                    <path d="M24 37a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5z" fill="currentColor" stroke="none" />
                    <path d="M24 12v16" />
                </symbol>

                <symbol id="icon-dot" viewBox="0 0 24 24">
                    <path d="M12 16a4 4 0 1 1 0-8a4 4 0 0 1 0 8z" />
                </symbol>

                <symbol id="open-link" viewBox="0 0 24 24">
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </symbol>

                <symbol id="icon-gear" viewBox="0 0 512 512">
                    <path d="M256.9 159.9c-25.7 0-49.8 10-67.9 28.1s-28.1 42.2-28.1 67.9c0 25.7 10 49.7 28.1 67.9a95.55 95.55 0 0 0 67.9 28.1c25.7 0 49.8-10 67.9-28.1a95.38 95.38 0 0 0 28.1-67.9c0-25.7-10-49.7-28.1-67.9a95.38 95.38 0 0 0-67.9-28.1zm0 176c-44.3 0-80-35.9-80-80s35.7-80 80-80 80 35.9 80 80-35.7 80-80 80z" />
                    <path d="M201.79 82.83a65.38 65.38 0 0 0 16.77 17.07A64.92 64.92 0 0 0 256 111.69a64.92 64.92 0 0 0 37.44-11.8 65.4 65.4 0 0 0 16.77-17.06 179.97 179.97 0 0 1 29.93 12.41 65.4 65.4 0 0 0-.2 23.93 64.93 64.93 0 0 0 18.13 34.8 64.88 64.88 0 0 0 46.18 19.13c4.25 0 8.43-.4 12.52-1.2a179.86 179.86 0 0 1 12.4 29.95 65.39 65.39 0 0 0-17.04 16.78 64.92 64.92 0 0 0-11.78 37.42c0 13.46 4.07 26.4 11.77 37.4a65.38 65.38 0 0 0 17.03 16.77 179.87 179.87 0 0 1-12.42 29.96 65.61 65.61 0 0 0-12.48-1.19 64.88 64.88 0 0 0-46.18 19.13 64.93 64.93 0 0 0-18.12 34.74 65.4 65.4 0 0 0 .17 23.9 179.91 179.91 0 0 1-29.96 12.42 65.37 65.37 0 0 0-16.77-17.02 64.94 64.94 0 0 0-37.4-11.76 64.92 64.92 0 0 0-37.38 11.76 65.4 65.4 0 0 0-16.77 17.02 179.93 179.93 0 0 1-29.96-12.42 65.4 65.4 0 0 0 .17-23.9 64.92 64.92 0 0 0-18.12-34.74A64.88 64.88 0 0 0 107.75 339c-4.23 0-8.4.4-12.48 1.2a180.01 180.01 0 0 1-12.42-29.97 65.38 65.38 0 0 0 17.03-16.77 64.93 64.93 0 0 0 11.77-37.4 64.93 64.93 0 0 0-11.78-37.42 65.4 65.4 0 0 0-17.05-16.78 179.88 179.88 0 0 1 12.4-29.95 65.54 65.54 0 0 0 12.53 1.2c17.44 0 33.84-6.8 46.18-19.13a64.94 64.94 0 0 0 18.13-34.8 65.38 65.38 0 0 0-.2-23.93 180.16 180.16 0 0 1 29.93-12.41M302.07 64a49.35 49.35 0 0 1-92.14 0 196.25 196.25 0 0 0-57.13 23.69 49.35 49.35 0 0 1-45.05 69.41 49.43 49.43 0 0 1-20.09-4.25A196.3 196.3 0 0 0 64 209.98a49.35 49.35 0 0 1 .02 92.12 196.32 196.32 0 0 0 23.7 57.13 49.42 49.42 0 0 1 20.02-4.23 49.35 49.35 0 0 1 45.09 69.33A196.25 196.25 0 0 0 209.96 448a49.35 49.35 0 0 1 92.08 0 196.23 196.23 0 0 0 57.13-23.67 49.34 49.34 0 0 1 65.12-65.1 196.32 196.32 0 0 0 23.69-57.13 49.35 49.35 0 0 1 .02-92.12 196.3 196.3 0 0 0-23.67-57.14 49.42 49.42 0 0 1-20.08 4.26 49.35 49.35 0 0 1-45.05-69.41A196.24 196.24 0 0 0 302.07 64z" />
                </symbol>

            </defs>
        </svg>
    );
}

// apps

// Win95
// export function IconAppWindows(props: SVGProps<SVGSVGElement> & { title?: string; }) {
//     const { className = '', title, ...rest } = props;
//     return (
//         <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
//             {title && <title>{title}</title>}
//             <use xlinkHref="#app-windows" />
//         </svg>
//     );
// }

export function IconAppWindows(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={1} className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#app-windows" />
        </svg>
    );
}

// IE solid
// export function IconAppWebIE(props: SVGProps<SVGSVGElement> & { title?: string; }) {
//     const { className = '', title, ...rest } = props;
//     return (
//         <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
//             {title && <title>{title}</title>}
//             <use xlinkHref="#app-web-ie" />
//         </svg>
//     );
// }

export function IconAppWebIE(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        // TODO: use prev solid version for title and outline for buttons
        // <svg fill="currentColor" stroke="black" strokeWidth={.7} className={`w-full h-full ${className}`} {...rest}>
        <svg fill="none" stroke="currentColor" strokeWidth={.8} className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#app-web-ie" />
        </svg>
    );
}

export function IconAppWebChrome(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="none" stroke="currentColor" strokeWidth=".9" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#app-web-chrome" />
        </svg>
    );
}

// mode

// two hands
// export function IconManualMode(props: SVGProps<SVGSVGElement> & { title?: string; }) {
//     const { className = '', title, ...rest } = props;
//     return (
//         <svg fill="none" stroke="currentColor" strokeWidth=".6" className={`w-full h-full ${className}`} {...rest}>
//             {title && <title>{title}</title>}
//             <use xlinkHref="#icon-manual-mode" />
//         </svg>
//     );
// }

export function IconManualMode(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="none" stroke="currentColor" strokeWidth=".6" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-manual-mode" />
        </svg>
    );
}

// misc

export function IconMenuHamburger(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg strokeLinecap="round" fill="none" stroke="currentColor" strokeWidth={1.2} className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#menu-hamburger" />
        </svg>
    );
}

export function IconCatalog(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={1} className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-catalog" />
        </svg>
    );
}

// field icons

export function IconInputFieldText(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg strokeLinecap="round" strokeLinejoin="round" fill="none" strokeWidth={1.5} stroke="currentColor" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#input-field-text" />
        </svg>
    );
}

export function IconInputFieldPsw(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#input-field-psw" />
        </svg>
    );
}

export function IconInputFieldChk(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="none" stroke="currentColor" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#input-field-chk" />
        </svg>
    );
}

export function IconInputFieldChkEmpty(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="none" stroke="currentColor" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
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

export function IconFieldText(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#field-text" />
        </svg>
    );
}

export function IconButton(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={5} className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#field-button" />
        </svg>
    );
}

// field state

export function IconPreview(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-preview" />
        </svg>
    );
}

export function IconInOut(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-inout" />
        </svg>
    );
}

// chevrons

export function IconChevronDown(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-chevron-down" />
        </svg>
    );
}

export function IconChevronUp(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-chevron-up" />
        </svg>
    );
}

export function IconDoubleDown(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-doubledown" />
        </svg>
    );
}

// info

export function IconFolder(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-folder" />
        </svg>
    );
}

export function IconAttention(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-attantion" />
        </svg>
    );
}

export function IconDot(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-dot" />
        </svg>
    );
}

export function IconOpenLink(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#open-link" />
        </svg>
    );
}

export function IconGear(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-gear" />
        </svg>
    );
}

/*
export function d(props: SVGProps<SVGSVGElement> & { title?: string;} ) {
    const { title, ...rest } = props;
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
        </svg>
    );
}
*/

/*
export function s(props: SVGProps<SVGSVGElement> & { title?: string; }) {
    const { className = '', title, ...rest } = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#" />
        </svg>
    );
}

<symbol id="" viewBox="0 0 24 24">
</symbol>
*/
