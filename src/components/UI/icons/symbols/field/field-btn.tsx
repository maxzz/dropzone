import { HTMLAttributes, SVGAttributes } from 'react';

export function SymbolFieldBtn() {
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

export function IconFieldBtn({ title, children, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" strokeWidth={.7} {...rest}>
            {title && <title>{title}</title>}
            {children}
            <use xlinkHref="#ifield-btn" />
        </svg>
    );
}
