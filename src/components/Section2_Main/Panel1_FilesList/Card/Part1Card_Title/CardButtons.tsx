import React, { Fragment, HTMLAttributes, MouseEvent } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { FormIdx, formIdxName } from "@/store";
import { classNames } from "@/utils/classnames";
import { IconFormChange, IconFormLogin } from "@ui/UIIconSymbols";
import { appBigIcons, appMediumIcons, ButtonsDisp, dispToIcons } from "../Part4Card_UI/UICardFormButton";

type UICardFormButtonProps = {
    disp: Meta.Disp | undefined;
    formIdx: FormIdx;
    opened: boolean;
};

function UICardFormButton({ disp, formIdx, opened, ...rest }: UICardFormButtonProps & HTMLAttributes<HTMLButtonElement>) {
    const icons = dispToIcons(disp, appBigIcons);
    return (
        <button
            className={classNames(
                "p-2 border border-primary-700 rounded flex items-center shadow-md active:scale-[.97] select-none",
                opened && 'bg-primary-800 text-primary-100'
            )}
            {...rest}
        >
            <span>{formIdxName(formIdx)}</span>
            {icons}
        </button>
    );
}

function UICardFormMediumButton({ disp, formIdx, opened, ...rest }: UICardFormButtonProps & HTMLAttributes<HTMLButtonElement>) {
    const icons = dispToIcons(disp, appMediumIcons);
    return (
        <button
            className={classNames(
                "p-0.5 border border-primary-700 rounded shadow-md active:scale-[.97] select-none",
                opened && 'bg-primary-800 text-primary-100'
            )}
            title={formIdxName(formIdx)}
            {...rest}
        >
            <div className={classNames("p-px w-4 h-4", !opened && "bg-primary-700")}>
                {formIdx === FormIdx.login
                    ? <IconFormLogin className="w-full h-full" />
                    : <IconFormChange className="w-full h-full" />
                }
            </div>

            <div className="w-1 self-stretch border-r border-primary-700"></div>

            <div className="-mt-1 ml-2">{icons}</div>
        </button>
    );
}

export function CardNormalButtons({ buttonsDisp, openAtom }: { buttonsDisp: ButtonsDisp; openAtom: PrimitiveAtom<boolean>; }) {
    const [open, setOpen] = useAtom(openAtom);
    const toogleOpen = (event: MouseEvent) => { event.stopPropagation(); setOpen((v) => !v); };
    return (
        <div className="py-2 flex items-center space-x-2 text-sm">
            {buttonsDisp.map(([hasForm, disp], idx) => (
                <Fragment key={idx}>
                    {hasForm && <UICardFormButton disp={disp} opened={open} onClick={toogleOpen} formIdx={idx} />}
                </Fragment>
            ))}
        </div>
    );
}

export function CardMediumButtons({ buttonsDisp, openAtom }: { buttonsDisp: ButtonsDisp; openAtom: PrimitiveAtom<boolean>; }) {
    const [open, setOpen] = useAtom(openAtom);
    const toogleOpen = (event: MouseEvent) => { event.stopPropagation(); setOpen((v) => !v); };

    const hasLogin = buttonsDisp[0][0];
    const hasCpass = buttonsDisp[1][0];
    const disp = [buttonsDisp[0][1], buttonsDisp[1][1]];

    return (
        <div className="flex items-center space-x-1 text-sm">
            {hasLogin && <UICardFormMediumButton disp={disp[0]} opened={open} onClick={toogleOpen} formIdx={FormIdx.login} />}
            {hasCpass && <UICardFormMediumButton disp={disp[1]} opened={open} onClick={toogleOpen} formIdx={FormIdx.cpass} />}
        </div>
    );
}
// export function CardMediumButtons({ hasLogin, hasCpass, disp, openAtom }: { hasLogin: boolean; hasCpass: boolean; disp: Array<Meta.Disp | undefined>; openAtom: PrimitiveAtom<boolean>; }) {
//     const [open, setOpen] = useAtom(openAtom);
//     const toogleOpen = (event: MouseEvent) => { event.stopPropagation(); setOpen((v) => !v); };
//     return (
//         <div className="flex items-center space-x-1 text-sm">
//             {hasLogin && <UICardFormMediumButton disp={disp[0]} opened={open} onClick={toogleOpen} formIdx={FormIdx.login} />}
//             {hasCpass && <UICardFormMediumButton disp={disp[1]} opened={open} onClick={toogleOpen} formIdx={FormIdx.cpass} />}
//         </div>
//     );
// }
