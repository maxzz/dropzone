import { type ComponentPropsWithoutRef } from "react";

export function ThesameAsOriginalUrl({ isTheSame, isOpen = false, ...rest }: { isTheSame: boolean; isOpen?: boolean; } & ComponentPropsWithoutRef<"div">) {
    return (<>
        {isTheSame && !isOpen && (
            <div {...rest}>
                same as original url
            </div>
        )}
    </>);
}
