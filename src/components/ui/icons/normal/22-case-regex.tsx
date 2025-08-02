import { type HTMLAttributes, type SVGAttributes } from "react"; //match-pajamas--regular-expression.svg
import { classNames } from "@/utils";

export function IconCaseRegex({ className, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("fill-current", className)} viewBox="0 0 16 16" {...rest}>
            {title && <title>{title}</title>}
            <path d="M10.25 1.75a.75.75 0 0 0-1.5 0V5.2L5.76 3.47a.75.75 0 1 0-.75 1.3L8 6.5 5.01 8.22a.75.75 0 1 0 .75 1.3L8.75 7.8v3.45a.75.75 0 0 0 1.5 0V7.8l2.99 1.73a.75.75 0 1 0 .75-1.3L11 6.5l2.99-1.73a.75.75 0 1 0-.75-1.3L10.25 5.2zM3 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
        </svg>
    );
}

// <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
//   <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" 
//     d="M10.25 1.75a.75.75 0 0 0-1.5 0V5.2L5.76 3.47a.75.75 0 1 0-.75 1.3L8 6.5 5.01 8.22a.75.75 0 1 0 .75 1.3L8.75 7.8v3.45a.75.75 0 0 0 1.5 0V7.8l2.99 1.73a.75.75 0 1 0 .75-1.3L11 6.5l2.99-1.73a.75.75 0 1 0-.75-1.3L10.25 5.2zM3 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4" 
//   />
// </svg>
