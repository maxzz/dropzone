import { type ComponentPropsWithoutRef } from "react";

export function ThesameAsOriginalUrl({ isTheSame, ...rest }: { isTheSame: boolean; } & ComponentPropsWithoutRef<"div">) {
    return (<>
        {isTheSame && (
            <div {...rest}>
                same as original url
            </div>
        )}
    </>);
}
