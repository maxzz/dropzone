import { type HTMLAttributes, type SVGAttributes } from "react";

export function IconBtnFormChangePsw({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M17.66 9.53l-7.07 7.07l-4.24-4.24l1.41-1.41l2.83 2.83l5.66-5.66l1.41 1.41zM4 12c0-2.33 1.02-4.42 2.62-5.88L9 8.5v-6H3l2.2 2.2C3.24 6.52 2 9.11 2 12c0 5.19 3.95 9.45 9 9.95v-2.02c-3.94-.49-7-3.86-7-7.93zm18 0c0-5.19-3.95-9.45-9-9.95v2.02c3.94.49 7 3.86 7 7.93c0 2.33-1.02 4.42-2.62 5.88L15 15.5v6h6l-2.2-2.2c1.96-1.82 3.2-4.41 3.2-7.3z" />
        </svg>
    );
}
