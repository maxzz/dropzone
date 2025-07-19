import { InputHTMLAttributes } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { classNames } from "@/utils";

export function Column1_UseIt({ useItAtom, className, ...rest }: { useItAtom: PrimitiveAtom<boolean>; } & InputHTMLAttributes<HTMLInputElement>) {
    const [useIt, setUseIt] = useAtom(useItAtom);
    return (
        <input
            className={classNames("place-self-center size-4 dark-checkbox", className)}
            type="checkbox"
            checked={useIt}
            onChange={() => setUseIt(v => !v)}
            {...rest}
        />
    );
}
