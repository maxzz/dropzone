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

                <symbol id="app-windows" viewBox="0 0 24 24">
                    <path d="M2.67 5.3v.61l-.71.3V5.6l.71-.3m0 5.94v.62l-.71.29v-.59l.71-.32m0 6.03v.62l-.71.29v-.59l.71-.32M2.6 7.29v.55l-.57.26v-.54l.57-.27m0 1.99v.54l-.57.26v-.54l.57-.26m0 4.03v.53l-.57.26v-.54l.57-.25m0 2.02v.54l-.57.26v-.53l.57-.27m1.9-9.69v.72l-1 .37V6l1-.36m0 6.02v.71l-1 .37v-.71l1-.37m0 6.04v.71l-1 .4v-.71l1-.4m-.07-9.98v.66l-.79.3V8l.79-.28m0 2.01v.64l-.78.3V10l.78-.27m0 4.01v.64l-.78.31v-.66l.78-.29m0 2.02v.65l-.78.31v-.66l.78-.3m1.88-9.67v.85l-1.26.49v-.84l1.26-.5m0 6.02v.85l-1.26.49v-.84l1.26-.5m0 5.97v.85l-1.26.5v-.85l1.26-.5m-.06-9.9v.76l-1.06.4v-.73l1.06-.43m0 2v.75l-1.06.42v-.75l1.06-.42m0 4.01v.75l-1.06.43v-.75l1.06-.43m0 1.95v.76l-1.06.42v-.75l1.06-.43m2.04-10.1v1.12l-1.57.62V6.67l1.57-.63m0 6.02v1.13l-1.57.61v-1.12l1.57-.62m0 5.97v1.12l-1.57.62v-1.11l1.57-.63m-.09-9.9v1.03l-1.31.53V8.66l1.31-.53m0 2v1.02l-1.31.53v-1.03l1.31-.52m0 4.02v1.03l-1.31.52v-1.03l1.31-.52m0 1.95v1.02l-1.31.52v-1.01l1.31-.53m2.14-10.25v1.47L8.61 8V6.56l1.73-.71m0 6.02v1.46l-1.73.7v-1.47l1.73-.69m0 5.97v1.46l-1.73.7v-1.46l1.73-.7m-.08-9.79v1.23l-1.48.59V8.64l1.48-.59m0 1.92v1.23l-1.48.58v-1.22l1.48-.59m0 4.09v1.25l-1.48.57v-1.23l1.48-.59m0 1.94v1.25l-1.48.59V16.6l1.48-.6m2.19-10.88v2l-1.86.77V6c.64-.35 1.26-.65 1.86-.88m0 2.21v1.73l-1.86.78V8.1l1.86-.77m0 1.95v1.76l-1.86.78v-1.76l1.86-.78m0 1.97V13l-1.86.77V12l1.86-.75m0 1.96V15l-1.86.78V14l1.86-.79m0 2v1.75l-1.86.8V16l1.86-.79m0 1.96v1.87c-.73.28-1.35.55-1.86.8v-1.88l1.86-.79m9.59-11.99v14.05c-1.19-.79-2.67-1.18-4.45-1.18c-1.47 0-3.12.3-4.94.91v-1.9c.97-.37 2.03-.64 3.19-.8v-4.57c-.98.12-2.04.46-3.19 1.02V11.4c.99-.46 2.06-.77 3.19-.94V6c-1.02.18-2.08.53-3.19 1V5.03C14.27 4.34 15.86 4 17.41 4c1.68 0 3.22.39 4.63 1.18m-1.89 1.23c-.76-.41-1.65-.59-2.73-.59c-.13 0-.25.01-.37.02v4.54l.41-.01c.91 0 1.81.13 2.69.43V6.41m0 5.69c-.81-.36-1.72-.54-2.71-.54c-.13 0-.26.01-.39.02v4.58h.41c.99 0 1.89.12 2.69.37V12.1z" />
                </symbol>


            </defs>
        </svg>
    );
}

export function IconAppWindows(props: SVGProps<SVGSVGElement>) {
    const {className = '', ...rest} = props;
    return (
        <svg fill="currentColor" className={`w-full h-full ${className}`} {...rest}>
            <use xlinkHref="#app-windows" />
        </svg>
    );
}

export default UISymbolsDefs;
