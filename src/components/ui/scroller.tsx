import { HTMLAttributes } from "react";
import { UiSemiScrollbar } from "@ui/ui-semi-scrollbar";
import { classNames } from "@/utils";

export function Scroller({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <UiSemiScrollbar className={classNames("px-2 pt-1 pb-4 overflow-auto w-full h-full", className)} {...rest}>
            {children}
        </UiSemiScrollbar>
    );
}
