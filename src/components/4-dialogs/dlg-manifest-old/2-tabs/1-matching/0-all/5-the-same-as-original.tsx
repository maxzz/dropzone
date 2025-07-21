import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";

export function ThesameAsOriginalUrl({ isTheSame, className, ...rest }: { isTheSame: boolean; } & ComponentPropsWithoutRef<"div">) {
    return (<>
        {isTheSame && (
            <div className={classNames("text-xs", className)} {...rest}>
                same as original url
            </div>
        )}
    </>);
}
