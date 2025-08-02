import { type HTMLAttributes, type SVGAttributes } from "react"; //match-streamline-ultimate-color--file-copyright-equal.svg
import { classNames } from "@/utils";

export function IconStopHand({ className, title, ...rest }: SVGAttributes<SVGSVGElement> & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg className={classNames("stroke-[1.5] stroke-red-500 fill-none scale-x-[-1]", className)} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...rest}>
            {title && <title>{title}</title>}
            {/* https://icones.js.org/collection/all?s=stop&icon=tabler:hand-stop */}
            <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-6.5v-2a1.5 1.5 0 1 1 3 0V12m0-6.5a1.5 1.5 0 0 1 3 0V12" />
            <path d="M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2 .2a6 6 0 0 1-5-2.7L7 19q-.47-.72-3.29-5.73a1.5 1.5 0 0 1 .54-2.02 1.87 1.87 0 0 1 2.28.28L8 13" />
        </svg>
    );
}
