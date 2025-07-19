import { HTMLAttributes } from "react";
import { classNames } from "@/utils";

type RadioProps = HTMLAttributes<HTMLElement> & {
    name: string;
    checked: boolean;
};

export function Radio({ children, name, checked, onChange, className, ...rest }: RadioProps) {
    return (
        <label className={classNames("w-max inline-flex items-center gap-x-2 select-none cursor-pointer", className)} {...rest}>
            <input className="size-4 dark-radio" name={name} checked={checked} onChange={onChange} type="radio" />
            {children}
        </label>
    );
}
