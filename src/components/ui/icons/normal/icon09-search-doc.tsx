import { type HTMLAttributes, type SVGAttributes } from "react";

export function IconSearchDoc({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M15.5 2C13 2 11 4 11 6.5s2 4.5 4.5 4.5c.9 0 1.7-.3 2.4-.7l3.1 3.1l1.4-1.4l-3.1-3.1c.4-.7.7-1.5.7-2.4C20 4 18 2 15.5 2M4 4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5l-2-2v7H4V6h5.03c.06-.7.23-1.35.47-2H4m11.5 0C16.9 4 18 5.1 18 6.5S16.9 9 15.5 9S13 7.9 13 6.5S14.1 4 15.5 4z" />
        </svg>
    );
}
