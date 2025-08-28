import { type HTMLAttributes, type SVGAttributes } from "react";

export function IconDocument({ title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) { // temp for now as a copy of IconDocumentsAccepted() wo/ horizontal alignment
    return (
        <svg viewBox="0 0 100 100" fill="currentColor" {...rest}>
            {title && <title>{title}</title>}
            <path d="M86.71 29.38V77.5a6.86 6.86 0 0 1-6.87 6.87H29.33a6.87 6.87 0 0 1-6.88-6.87V13.34a6.88 6.88 0 0 1 6.88-6.88H63.8ZM63.8 31.67a2.29 2.29 0 0 1-2.29-2.29V11H29.33A2.29 2.29 0 0 0 27 13.34V77.5a2.29 2.29 0 0 0 2.29 2.29h50.55a2.3 2.3 0 0 0 2.29-2.29V31.67Zm2.29-16.44 11.85 11.85H66.09Z" fillRule="evenodd" />
            <path d="M17.87 20.21v61.87A6.88 6.88 0 0 0 24.74 89h52.81v4.58H24.74a11.46 11.46 0 0 1-11.45-11.5V20.21Z" />
        </svg>
    );
}
