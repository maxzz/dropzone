import { type HTMLAttributes, type SVGAttributes } from "react";

export function IconInfo({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...rest}>
            {title && <title>{title}</title>}
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}
