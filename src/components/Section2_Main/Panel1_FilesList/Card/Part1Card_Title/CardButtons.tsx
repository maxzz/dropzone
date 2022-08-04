import React, { Fragment, HTMLAttributes, MouseEvent, ReactNode } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { FormIdx, formIdxName } from "@/store";
import { classNames } from "@/utils/classnames";
import { IconFormChange, IconFormLogin } from "@ui/UIIconSymbols";
import { appBigIcons, appMediumIcons, ButtonsDisp, dispToIcons } from "../Part4Card_UI/UICardFormButtonTypes";

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

export function CardNormalButtons({ buttonsDisp, openAtom }: { buttonsDisp: ButtonsDisp; openAtom: PrimitiveAtom<boolean>; }) {
    const [open, setOpen] = useAtom(openAtom);
    const toogleOpen = (event: MouseEvent) => { event.stopPropagation(); setOpen((v) => !v); };
    return (
        <div className="py-2 flex items-center space-x-2 text-sm">
            {buttonsDisp.map(([hasForm, disp], idx) => (
                <Fragment key={idx}>
                    {hasForm &&
                        <UICardFormButton disp={disp} opened={open} onClick={toogleOpen} formIdx={idx} />
                    }
                </Fragment>
            ))}
        </div>
    );
}

function UICardFormMediumButton({ icons, formIdx }: { icons: ReactNode; formIdx: FormIdx; }) {
    return (
        <div className="p-0.5 h-8 flex items-center" title={formIdxName(formIdx)}>
            <div className="p-px w-4 h-4">
                {formIdx === FormIdx.login ? <IconFormLogin className="w-full h-full" /> : <IconFormChange className="w-full h-full" />}
            </div>

            <div className="-mt-1 ml-2">{icons}</div>
        </div>
    );
}

export function CardMediumButtons({ buttonsDisp, openAtom }: { buttonsDisp: ButtonsDisp; openAtom: PrimitiveAtom<boolean>; }) {
    const [open, setOpen] = useAtom(openAtom);
    const icons = buttonsDisp.map(([_, disp]) => dispToIcons(disp, appMediumIcons));
    return (
        <button
            className={classNames(
                "text-sm border border-primary-700 rounded shadow-md active:scale-[.97] select-none", open && 'bg-primary-800 text-primary-100'
            )}
            onClick={(event: MouseEvent) => { event.stopPropagation(); setOpen((v) => !v); }}
        >
            <div className="flex items-center space-x-1">
                {buttonsDisp.map(([hasForm, disp], idx) => (
                    <Fragment key={idx}>
                        {hasForm ?
                            <UICardFormMediumButton icons={icons[idx]} formIdx={idx} />
                            :
                            <div className="p-0.5 h-4 flex items-center">
                                <IconFormChange className="p-px w-4 h-4" />
                                <div className="-mt-1 ml-4 w-5 h-5"></div>
                            </div>
                        }
                    </Fragment>
                ))}
            </div>
        </button>
    );
}

//TODO: add minimal, compact, and normal views
//TODO: Card title is setting class 'card-current'. use it or use custom CSS vars
