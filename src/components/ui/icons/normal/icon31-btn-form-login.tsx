import { type HTMLAttributes, type SVGAttributes } from "react";

export function IconBtnFormLogin({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 1025 1024" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M960.356 1024h-896q-26 0-45-19t-19-45V640q0-27 19-45.5t45-18.5h896q26 0 45 18.5t19 45.5v320q0 26-19 45t-45 19zm0-352q0-13-9.5-22.5t-22.5-9.5h-832q-13 0-22.5 9.5t-9.5 22.5v256q0 13 9.5 22.5t22.5 9.5h832q13 0 22.5-9.5t9.5-22.5V672zm-192 224q-27 0-45.5-19t-18.5-45.5t18.5-45t45.5-18.5t45.5 18.5t18.5 45t-18.5 45.5t-45.5 19zm-191.5 0q-26.5 0-45.5-19t-19-45.5t19-45t45.5-18.5t45 18.5t18.5 45t-18.5 45.5t-45 19zm-192.5 0q-27 0-45.5-19t-18.5-45.5t18.5-45t45.5-18.5t45.5 18.5t18.5 45t-18.5 45.5t-45.5 19zm-192 0q-27 0-45.5-19t-18.5-45.5t18.5-45t45.5-18.5t45.5 18.5t18.5 45t-18.5 45.5t-45.5 19zm768-448h-896q-26 0-45-19t-19-45V64q0-27 19-45.5t45-18.5h896q26 0 45 18.5t19 45.5v320q0 26-19 45t-45 19zm0-352q0-13-9.5-22.5t-22.5-9.5h-832q-13 0-22.5 9.5t-9.5 22.5v256q0 13 9.5 22.5t22.5 9.5h832q13 0 22.5-9.5t9.5-22.5V96zm-800 224q-13 0-22.5-9.5t-9.5-22.5V160q0-13 9.5-22.5t22.5-9.5t22.5 9.5t9.5 22.5v128q0 13-9.5 22.5t-22.5 9.5z" />
        </svg>
    );
}
