import React, { HTMLAttributes, SVGAttributes, SVGProps } from 'react';

function DefAppTypes() {
    return (<>
        {/* Win95 solid */}
        {/* <symbol id="app-windows-95" viewBox="0 0 24 24">
                    <path d="M2.67 5.3v.61l-.71.3V5.6l.71-.3m0 5.94v.62l-.71.29v-.59l.71-.32m0 6.03v.62l-.71.29v-.59l.71-.32M2.6 7.29v.55l-.57.26v-.54l.57-.27m0 1.99v.54l-.57.26v-.54l.57-.26m0 4.03v.53l-.57.26v-.54l.57-.25m0 2.02v.54l-.57.26v-.53l.57-.27m1.9-9.69v.72l-1 .37V6l1-.36m0 6.02v.71l-1 .37v-.71l1-.37m0 6.04v.71l-1 .4v-.71l1-.4m-.07-9.98v.66l-.79.3V8l.79-.28m0 2.01v.64l-.78.3V10l.78-.27m0 4.01v.64l-.78.31v-.66l.78-.29m0 2.02v.65l-.78.31v-.66l.78-.3m1.88-9.67v.85l-1.26.49v-.84l1.26-.5m0 6.02v.85l-1.26.49v-.84l1.26-.5m0 5.97v.85l-1.26.5v-.85l1.26-.5m-.06-9.9v.76l-1.06.4v-.73l1.06-.43m0 2v.75l-1.06.42v-.75l1.06-.42m0 4.01v.75l-1.06.43v-.75l1.06-.43m0 1.95v.76l-1.06.42v-.75l1.06-.43m2.04-10.1v1.12l-1.57.62V6.67l1.57-.63m0 6.02v1.13l-1.57.61v-1.12l1.57-.62m0 5.97v1.12l-1.57.62v-1.11l1.57-.63m-.09-9.9v1.03l-1.31.53V8.66l1.31-.53m0 2v1.02l-1.31.53v-1.03l1.31-.52m0 4.02v1.03l-1.31.52v-1.03l1.31-.52m0 1.95v1.02l-1.31.52v-1.01l1.31-.53m2.14-10.25v1.47L8.61 8V6.56l1.73-.71m0 6.02v1.46l-1.73.7v-1.47l1.73-.69m0 5.97v1.46l-1.73.7v-1.46l1.73-.7m-.08-9.79v1.23l-1.48.59V8.64l1.48-.59m0 1.92v1.23l-1.48.58v-1.22l1.48-.59m0 4.09v1.25l-1.48.57v-1.23l1.48-.59m0 1.94v1.25l-1.48.59V16.6l1.48-.6m2.19-10.88v2l-1.86.77V6c.64-.35 1.26-.65 1.86-.88m0 2.21v1.73l-1.86.78V8.1l1.86-.77m0 1.95v1.76l-1.86.78v-1.76l1.86-.78m0 1.97V13l-1.86.77V12l1.86-.75m0 1.96V15l-1.86.78V14l1.86-.79m0 2v1.75l-1.86.8V16l1.86-.79m0 1.96v1.87c-.73.28-1.35.55-1.86.8v-1.88l1.86-.79m9.59-11.99v14.05c-1.19-.79-2.67-1.18-4.45-1.18c-1.47 0-3.12.3-4.94.91v-1.9c.97-.37 2.03-.64 3.19-.8v-4.57c-.98.12-2.04.46-3.19 1.02V11.4c.99-.46 2.06-.77 3.19-.94V6c-1.02.18-2.08.53-3.19 1V5.03C14.27 4.34 15.86 4 17.41 4c1.68 0 3.22.39 4.63 1.18m-1.89 1.23c-.76-.41-1.65-.59-2.73-.59c-.13 0-.25.01-.37.02v4.54l.41-.01c.91 0 1.81.13 2.69.43V6.41m0 5.69c-.81-.36-1.72-.54-2.71-.54c-.13 0-.26.01-.39.02v4.58h.41c.99 0 1.89.12 2.69.37V12.1z" />
                </symbol> */}

        {/* WinXp outlined flag */}
        <symbol id="app-windows" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeLinejoin="bevel"
                d="M9.57 2.44c-1.34.06-2.65.36-3.88.9l-2.07 7.21a8.55 8.55 0 0 1 4.06-.9c1.43.03 2.82.5 3.97 1.35l2.07-7.21a6.74 6.74 0 0 0-4.15-1.35ZM14.8 4.6l-2.07 7.21c1.8 1.17 3.97 2.25 8.03.45l2.07-7.21c-4.24 1.8-6.31.81-8.12-.45h.09Zm-7.67 6.31c-1.34.06-2.65.36-3.88.9l-2.07 7.21c4.24-1.8 6.22-.72 8.03.45l2.07-7.21a6.74 6.74 0 0 0-4.15-1.35Zm5.23 2.07-2.07 7.21c1.8 1.17 3.88 2.16 8.12.36l1.98-7.12c-4.15 1.8-6.22.81-8.03-.45Z"
            />
        </symbol>

        {/* ie solid */}
        <symbol id="app-web-ie-solid" viewBox="0 0 32 32">
            <path d="M27.7 8.813c2.445-6.243-2.302-5.805-2.302-5.805c-3.046 0-6.855 2.73-6.855 2.73S14 4.531 9.457 7.234c-4.95 3.106-4.785 8.621-4.785 8.621C8.695 10.184 14.3 7.88 14.3 7.88v.375C6.027 13.816 4.07 21.957 3.582 23.617C3.09 25.277 3.418 29 6.898 29c3.485 0 7.02-2.762 7.02-2.762s.762.164 2.828.164c8.707 0 10.774-7.55 10.774-7.55h-7.727s-.543 2.464-3.316 2.464c-3.813 0-3.594-3.91-3.594-3.91h14.746c.707-10.062-8.215-11.508-8.215-11.508s3.152-2.195 5.875-2.195c4.313 0 2.273 4.973 2.273 4.973zM13.483 26.128s-5.312 3.172-7.699.973c-1.273-2.2.8-5.313.8-5.313s1.759 3.207 6.9 4.34zm6.391-12.149h-7.012s-.09-3.363 3.594-3.363c3.559 0 3.418 3.363 3.418 3.363z" />
        </symbol>

        {/* ie outline w/ stroke */}
        <symbol id="app-web-ie" viewBox="0 0 24 24">
            <path d="M22.07 7.45c2.08-4.89-2.23-5.69-4.48-3.69-.09.08-.09.18.15.3 3.85 1.84 5.67 5.1 5.42 9.23-5.13.13-9.8.15-14.66.15-.26 0-.58.06-.49.38.7 3.99 5.86 5.71 8.83 2.97.21-.2.37-.4.69-.36h4.79c.13 0 .15.03.09.14-3.04 7.47-13.34 7.9-17.39 1.64-.41-.63-.26-.33-.41-.63-.2-.4-.25-.58-.51-.23-.81 1.12-1.77 2.63-1.09 4.03.88 1.83 2.66.8 5.22.05-5.48 2.57-7.89 1.43-7.17-3.3A17.98 17.98 0 0 1 9.79 5.87c.01-.03 0-.05-.02-.07-2.51 1.3-4.72 4.03-5.94 5.64-.06.06-.09.09-.17.1 1.03-5.59 6.51-8.89 10.52-8.74 2.44-1.38 7.75-3.56 8.63.54.05.34.3 2.51-.74 4.11Zm-3.9 4.3c.25 0 .37-.16.31-.41-1.22-5.19-9.13-5.25-10.4-.05-.09.3.03.46.34.46h9.75Z" />
        </symbol>

        <symbol id="app-web-chrome" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <path d="M21.17 8H12" />
            <path d="M3.95 6.06L8.54 14" />
            <path d="M10.88 21.94L15.46 14" />
        </symbol>

        <symbol id="app-catalog" viewBox="0 0 24 24">
            <path d="M12.17 5.2Q18 2.23 23 5.2V20a12.15 12.15 0 0 0-10.83.53" />
            <path d="M12.17 5.2q-5.82-3-10.83 0V20a12.15 12.15 0 0 1 10.83.53ZM3.5 21.22a10.71 10.71 0 0 1 8.23 1.18.81.81 0 0 0 .87 0c2.3-1.5 5.08-2.07 8.9-1.17" />
        </symbol>

        {/* mode */}

        {/* one hand */}
        <symbol id="icon-manual-mode" viewBox="0 0 24 24">
            <path d="M22.52 12.93c-.45-1.22-2.45-.96-3.97.02-.61.4-1.13.65-2.59.95-.64 0-.78-.68-.66-1.35l1.47-8.19c.42-2.08-2.14-2.84-2.65-.7l-1.27 7.12c-.64 1.78-.88 0-.88 0l-.35-7.67c0-2.78-2.73-2.95-2.73 0l.32 7.01c.14 2.77-.52 1.21-.52.99L7.4 4.87c-.62-2.63-3.07-1.95-2.63.44l1.19 5.56c.2 1.29-.81.68-.99.37L3.8 8.55c-.97-2.05-3.05-1.23-2.38.8l1.95 4.98c.19.54.33 1.09.42 1.66 0 1.4.91 4.26 1.65 5.01a6.87 6.87 0 0 0 9.73 0c1.8-2.02 2.66-2.87 3.37-4.42 0 0 1.82-1.53 4.08-2.81.2-.12-.11-.86-.11-.86Z" />
        </symbol>
    </>);
}

function DefFieldTypes() {
    return (<>
        <symbol id="ifield-edt" viewBox="0 0 24 24">
            <path d="M2.05 6.01h19.89v11.98H2.05z" />
            <path d="M5 8.5h1.5m1.5 0H6.5m0 0v7m0 0H5m1.5 0H8" />
        </symbol>

        <symbol id="ifield-psw" viewBox="0 0 24 24">
            <path fill="#ffdbb8" d="M2.05 6.01h19.89v11.98H2.05z" />
            <path d="m5.56 14.69 2.84-2.81" />
            <path d="m5.57 11.87 2.81 2.84" />
            <path d="m11.02 14.69 2.84-2.81" />
            <path d="m11.04 11.87 2.81 2.84" />
            <path d="M16.2 15.55h2.27" />
        </symbol>

        <symbol id="ifield-chk" viewBox="0 0 24 24">
            <path d="M8.73 6.81h7.1c.78 0 1.42.64 1.42 1.42v7.1c0 .78-.64 1.42-1.42 1.42h-7.1c-.78 0-1.42-.64-1.42-1.42v-7.1c0-.78.64-1.42 1.42-1.42Z" />
            <path d="m10.15 11.78 1.42 1.42 2.84-2.84" />
            <path d="M18.69 9.39v6.14a2.66 2.66 0 0 1-2.66 2.66H9.34" stroke="#b3b3b3" fill="none" />
        </symbol>

        <symbol id="ifield-lst" viewBox="0 0 24 24">
            <rect x="2.5" y="4.66" width="15.3" height="6.38" rx=".89" ry=".89" />
            <path d="M17.79 8.08h3.25c.25 0 .46.21.46.46v10.35c0 .25-.21.46-.46.46H4.93a.47.47 0 0 1-.46-.46v-7.85" />
            <path d="M7.86 13.58h10.52" />
            <path d="M8.03 16.43h7.62" />
            <path d="m13.18 7.84.7.48.71-.49" />
        </symbol>

        <symbol id="ifield-txt" viewBox="0 0 24 24">
            <path fill="#5e9eff" d="M2.05 6.01h19.89v11.98H2.05z" />
            <path fill="white" stroke="none" d="M17.28 10.94v-.89h-1.21V8.68L15 8.97v1.08h-1.94l-.69 1.05-.1.16-.27.44-.38-.6-.7-1.05H8.53V8.68l-1.07.29v1.08h-.72v.89h.72v2.41c0 .63.11 1.04.36 1.29.23.26.57.4 1 .4.32 0 .6-.04.8-.12h.01l-.02.03h1.24l.82-1.28.28-.46.4.64.72 1.1h1.26l-1.71-2.52 1.67-2.36v.89h.72v2.41c0 .63.11 1.04.36 1.29.23.26.57.4 1 .4.32 0 .6-.04.79-.12l.08-.03-.05-.87-.15.04c-.09.02-.24.05-.46.05-.26 0-.51-.09-.51-.78v-2.38h1.21ZM9.64 14l-.15.04c-.09.02-.24.05-.46.05-.26 0-.51-.09-.51-.78v-2.38h1.21v-.81l1.6 2.31-1.65 2.37-.05-.81Z" />
        </symbol>

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

function DefFieldUseIt() {
    return (<>
        <symbol id="ifield-useit-0" viewBox="0 0 24 24">
            <path d="M4.41 19.59 19.59 4.41" />
            <path d="M19.59 19.59 4.41 4.41" />
        </symbol>

        <symbol id="ifield-useit-1" viewBox="0 0 24 24">
            <path d="m3.1 12 5.94 5.94L20.9 6.06" />
        </symbol>
    </>);
}

function DefAllOther() {
    return (<>
        {/* field row state */}

        <symbol id="icon-preview" viewBox="0 0 24 24">
            <rect x="1.49" y="3.46" width="21.02" height="17.08" rx=".73" ry=".73" />
            <circle cx="5.66" cy="7.12" r="1.62" />
            <path d="m3.55 16.49 4.73-4.73 3.26 3.11" />
            <path d="m8.96 17.71 6.84-7.02 4.66 4.65" />
        </symbol>

        <symbol id="icon-inout" viewBox="0 0 24 24">
            <path d="m7.7 19-4.55-5.51h13.3" />
            <path d="m16.3 5 4.55 5.51H7.55" />
        </symbol>

        {/* // form options */}

        <symbol id="options-lock" viewBox="0 0 24 24">
            <path d="M5.99 8.57h12.02c1.09 0 1.98.89 1.98 1.98v4.01a8 8 0 0 1-15.98 0v-4.01c0-1.09.89-1.98 1.98-1.98Z" />
            <path d="M17.18 6.64v1.93H6.82V6.64a5.17 5.17 0 1 1 10.36 0Z" />
            <ellipse cx="12" cy="15.63" rx="2.01" ry="1.94" />
        </symbol>

        {/* first version */}
        {/* <symbol id="options-ql" viewBox="0 0 24 24">
                    <path strokeLinejoin="round" d="m4.46 22.56 14.9-12.07a824.5 824.5 0 0 0-7.02-1.78l7.2-7.27h-8.96L5.15 12.75l7.11-.75S4.59 22.19 4.47 22.56Z" />
                </symbol> */}

        <symbol id="options-ql" viewBox="0 0 24 24">
            <path d="M5.85 8.47c-.16 4.39.56 9.05 1.51 13.88.03.14.23.14.26 0l1.66-8.56 5.16 2 3.75-11.93-6.48-2.32-1.25 8.45-4.61-1.52Z" />
        </symbol>

        {/* info */}

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

        <symbol id="icon-gear" viewBox="0 0 24 24">
            <path d="M14.84 11.99a2.84 2.84 0 0 1-3.6 2.78 2.6 2.6 0 0 1-1.32-.79 2.6 2.6 0 0 1-.7-1.2 2.63 2.63 0 0 1 0-1.59c.12-.46.37-.87.7-1.2a2.8 2.8 0 0 1 2.75-.79 2.79 2.79 0 0 1 2.06 2.01c.07.24.11.5.11.76Z" />
            <path d="m21.22 14.28.82.52a10.24 10.24 0 0 1-2.6 4.51l-.91-.48c-1.69-.87-3.91.3-3.91 2.17l-.09 1.13a9.94 9.94 0 0 1-5.21 0L9.23 21c0-1.87-2-3.04-3.86-2.17l-.87.43a9.26 9.26 0 0 1-2.56-4.38l.91-.61c1.52-1 1.52-3.56 0-4.56l-.91-.61A9.54 9.54 0 0 1 4.5 4.72l.87.43c1.87.87 3.86-.3 3.86-2.17l.09-1.13a9.7 9.7 0 0 1 5.21 0l.09 1.13c0 1.87 2.21 3.04 3.91 2.17l.91-.48a10.16 10.16 0 0 1 2.6 4.51l-.82.52a2.68 2.68 0 0 0 0 4.56Z" />
        </symbol>

        {/* 8 leafs gear */}
        {/* <symbol id="icon-gear" viewBox="0 0 24 24">
                    <path d="M12.05 7.1a4.9 4.9 0 1 0-.02 9.8 4.9 4.9 0 0 0 .02-9.8Z" />
                    <path d="M14.4 2c-.76 2.17-4.04 2.16-4.8 0-1.05.25-2.06.67-2.98 1.23 1 2.07-1.33 4.38-3.39 3.39A9.99 9.99 0 0 0 2 9.6c2.17.76 2.16 4.04 0 4.8.25 1.05.67 2.06 1.23 2.98 2.07-.99 4.38 1.32 3.39 3.39.92.57 1.92.98 2.98 1.23.76-2.16 4.04-2.15 4.8 0 1.05-.25 2.06-.67 2.98-1.23-1-2.07 1.33-4.38 3.39-3.39.57-.92.98-1.92 1.23-2.98-2.17-.76-2.15-4.04 0-4.8a10.37 10.37 0 0 0-1.23-2.98c-2.07.99-4.38-1.32-3.39-3.39A9.99 9.99 0 0 0 14.4 2Z" />
                </symbol>
                */}

        {/* misc */}

        <symbol id="icon-burger" viewBox="0 0 21 21">
            <path d="M4.5 6.5h12" />
            <path d="M4.498 10.5h11.997" />
            <path d="M4.5 14.5h11.995" />
        </symbol>

        <symbol id="icon-cross" viewBox="0 0 24 24">
            <path d="m2 2 20 20" />
            <path d="M2 22 22 2" />
        </symbol>

        <symbol id="icon-pen" viewBox="0 0 24 24">
            <path d="M1.48 20.12 6.37 8.39l7.65-2.91 5.01 3.21-.64 8.27-14.65 5.53c-.21.08-.38-.19-.21-.34l7.4-6.6s.23-.28.57-.39c.65-.21 1.7-.17 2.42-1.18 1.37-1.91-1.11-4.28-3.09-3.1-1.04.62-1.12 2.04-1.24 2.89-.05.39-.32.66-.32.66L1.85 20.4c-.19.16-.47-.05-.37-.28Z" />
            <path d="m15.79 3.77 1.77-2.22c.06-.07.15-.08.23-.03l4.68 3.16c.08.06.1.17.04.25L20.64 7.2a.17.17 0 0 1-.23.03L15.8 3.92s-.05-.08 0-.14Z" />
        </symbol>

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

export function UISymbolDefs() {
    return (
        <svg id="svgfont" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
            xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"
        >
            <defs>
                {DefAppTypes()}
                {DefFieldTypes()}
                {DefFieldUseIt()}
                {DefAllOther()}
            </defs>
        </svg>
    );
}

//#region apps

// apps

// export function IconAppWindows95({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
//     return (
//         <svg fill="currentColor" {...rest}>
//             {title && <title>{title}</title>}
//             <use xlinkHref="#app-windows-95" />
//         </svg>
//     );
// }

export function IconAppWindows({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#app-windows" />
        </svg>
    );
}

// IE solid
export function IconAppWebIESolid({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#app-web-ie-solid" />
        </svg>
    );
}

export function IconAppWebIE({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        // TODO: use prev solid version for title and outline for buttons: // <svg fill="currentColor" stroke="black" strokeWidth={.7} {...rest}>

        <svg fill="none" stroke="currentColor" strokeWidth={.8} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#app-web-ie" />
        </svg>
    );
}

export function IconAppWebChrome({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth=".9" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#app-web-chrome" />
        </svg>
    );
}

export function IconCatalog({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#app-catalog" />
        </svg>
    );
}

// mode

export function IconManualMode({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth=".6" {...rest}>
            {title && <title>{title}</title>}
            <use xlinkHref="#icon-manual-mode" />
        </svg>
    );
}

//#endregion apps

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
