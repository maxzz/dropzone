import { type HTMLAttributes, type SVGAttributes } from "react";

export function IconAppLogoMicroscope({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 139 139" fill="none" stroke="currentColor" strokeWidth="5" {...rest}>
            {title && <title>{title}</title>}
            <path d="M34 18h26v53H34zM34 9h26M31 71h32M47 9v9M38 72h19v11H38zM60 49c32 0 35 10 35 37" />
            <circle cx="94.6" cy="99.7" r="13.6" />
            <path d="M95 128v-14" />
            <path strokeWidth="6" d="M36 110h23" />
            <path d="M47 129v-19M31 129h77" />
        </svg>
    );
}
