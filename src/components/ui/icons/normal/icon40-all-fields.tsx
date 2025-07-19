import { HTMLAttributes, SVGAttributes } from "react";

// Field icons

export function IconInputFieldText({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeWidth={1.5} stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"></path>
            <path d="M5 8.5h1.5m1.5 0H6.5m0 0v7m0 0H5m1.5 0H8" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    );
}

export function IconInputFieldPsw({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
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

export function IconInputFieldChk({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 21 21" fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M5.5 3.5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z" />
            <path d="M7.5 10.5l2 2l4-4" />
        </svg>
    );
}

export function IconInputFieldChkEmpty({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 21 21" fill="none" stroke="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M5.5 3.5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z" />
        </svg>
    );
}

export function IconInputFieldList({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 16 16" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h8A1.5 1.5 0 0 1 11 1.5v2A1.5 1.5 0 0 1 9.5 5h-8A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-8z" />
            <path d="M7.823 2.823l-.396-.396A.25.25 0 0 1 7.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
        </svg>
    );
}

export function IconFieldText({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 16 16" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M6.5 10.5A.5.5 0 0 1 7 10h.5V6H6v.5a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V6H8.5v4H9a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5z" />
            <path d="M1 5.5A2.5 2.5 0 0 1 3.5 3h9A2.5 2.5 0 0 1 15 5.5v5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 10.5v-5zM3.5 4A1.5 1.5 0 0 0 2 5.5v5A1.5 1.5 0 0 0 3.5 12h9a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 12.5 4h-9z" />
        </svg>
    );
}

// Field icons old

export function IconAirplay({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
            <polygon points="12 15 17 21 7 21 12 15"></polygon>
        </svg>
    );
}

export function IconCheckSquare({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            <polyline points="9 11 12 14 23 3"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
    );
}

export function IconEyeOff({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
    );
}

export function IconEye({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
            </path><circle cx="12" cy="12" r="3"></circle>
        </svg>
    );
}

export function IconToggleLeft({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            <rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect>
            <circle cx="8" cy="12" r="3"></circle>
        </svg>
    );
}

export function IconToggleRight({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} {...rest}>
            {title && <title>{title}</title>}
            <rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect>
            <circle cx="16" cy="12" r="3"></circle>
        </svg>
    );
}

export function IconButton({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={5} {...rest}>
            {title && <title>{title}</title>}
            <path d="M9 72.6A11.43 11.43 0 0 0 20.43 84h59.14A11.43 11.43 0 0 0 91 72.6" stroke="#999" />
            <rect x="6.56" y="15.97" width="86.87" height="63.19" rx="13.64" stroke="#0060c1" fill="#9bccfd" /> {/* #b7ffb7 */}
            <path stroke="none" fill="#2a61ff"
                d="M18.85 63.59c.1-1.49.2-3.72.2-5.68v-26.6h4.28v13.82h.1c1.53-2.45 4.28-4.05 8.13-4.05 5.91 0 10.1 4.55 10.05 11.24 0 7.86-5.37 11.78-10.69 11.78-3.45 0-6.21-1.23-8-4.14h-.14l-.2 3.63Zm4.48-8.82a7 7 0 0 0 .2 1.46A6.62 6.62 0 0 0 30 60.91c4.53 0 7.24-3.41 7.24-8.46 0-4.41-2.46-8.18-7.09-8.18a6.81 6.81 0 0 0-6.6 4.91 7.18 7.18 0 0 0-.25 1.64ZM52.3 35.26v6.32h6.21v3.05H52.3V56.5c0 2.73.84 4.28 3.26 4.28a10.2 10.2 0 0 0 2.51-.28l.19 3a11.29 11.29 0 0 1-3.84.55 6.29 6.29 0 0 1-4.68-1.68c-1.23-1.18-1.68-3.14-1.68-5.73v-12h-3.69v-3.06h3.69v-5.27ZM63.39 47.54c0-2.27 0-4.14-.2-6H67l.25 3.64h.1a8.9 8.9 0 0 1 7.88-4.14c3.3 0 8.42 1.82 8.42 9.37v13.18h-4.3V50.91c0-3.55-1.43-6.51-5.52-6.51A6.11 6.11 0 0 0 68 48.5a5.26 5.26 0 0 0-.3 1.86v13.23h-4.31Z"
            />
        </svg>
    );
}

export function IconInOut({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M21.71 9.29l-4-4a1 1 0 0 0-1.42 1.42L18.59 9H7a1 1 0 0 0 0 2h14a1 1 0 0 0 .92-.62a1 1 0 0 0-.21-1.09zM17 13H3a1 1 0 0 0-.92.62a1 1 0 0 0 .21 1.09l4 4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L5.41 15H17a1 1 0 0 0 0-2z" />
        </svg>
    );
}
