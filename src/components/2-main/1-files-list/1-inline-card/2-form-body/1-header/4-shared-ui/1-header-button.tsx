import { forwardRef } from "react";
import { UIIconUpDown } from "@ui/icons";
import { classNames } from "@/utils";

type DropDownButtonProps = {
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
};

const BtnGradientShading: React.CSSProperties = {
    backgroundImage: 'linear-gradient(360deg, #ffffff3f 0%, #9d9d9d2f 30%, #9d9d9d2f 70%, #ffffff3f 100%)',
    boxShadow: '0px 1px #64646420',
};

export const HeaderButton = forwardRef<HTMLButtonElement, DropDownButtonProps>(function ({ open = false, setOpen, text }, ref) {
    const disabled = !setOpen;
    return (
        <button
            ref={ref}
            className={classNames(
                "pl-2 pr-1 h-6 card-header-btn__popup",
                open && "bg-primary-300",
                disabled && "opacity-25"
            )}
            onClick={() => !disabled && setOpen((v) => !v)}
        >
            <div className="">
                {text}
            </div>

            {disabled ?
                <div className="list-owner size-4 pt-0.5" />
                : <UIIconUpDown isUp={open} className="list-owner size-4 pt-0.5" />}
        </button>
    );
});
