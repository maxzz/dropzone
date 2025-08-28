import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";

export function SectionName({ children, className, ...rest }: ComponentPropsWithoutRef<"div">) {
    return (
        <div className={classNames("mb-0.5 w-max text-sm font-bold text-gray-600", className)} {...rest}>
            {children}
        </div>
    );
}
