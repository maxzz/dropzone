import React, { Fragment, HTMLAttributes, MouseEvent, ReactNode } from "react";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { FormIdx, formIdxName, UISize, uiSizeAtom } from "@/store";
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

export function CardMediumButtons({ buttonsDisp, openAtom }: { buttonsDisp: ButtonsDisp; openAtom: PrimitiveAtom<boolean>; }) {
    const minimal = useAtomValue(uiSizeAtom) === UISize.minimal;
    const [open, setOpen] = useAtom(openAtom);
    const icons = buttonsDisp.map(([_, disp]) => dispToIcons(disp, appMediumIcons));
    const prefix = (idx: FormIdx) => idx === FormIdx.login ? <IconFormLogin className="w-4 h-4" /> : <IconFormChange className="w-4 h-4" />;
    return (
        <button
            className={classNames(
                "px-2 border border-primary-700 rounded shadow-md active:scale-[.97] select-none",
                minimal ? "h-8" : "h-10",
                open && 'bg-primary-800 text-primary-100',
            )}
            onClick={(event: MouseEvent) => { event.stopPropagation(); setOpen((v) => !v); }}
        >
            <div className="flex items-center space-x-1">
                {buttonsDisp.map(([hasForm, disp], idx) => (
                    <Fragment key={idx}>
                        <div className="p-0.5 flex items-center" title={formIdxName(idx)}>
                            {prefix(idx)}
                            {hasForm
                                ? <div className="-mt-1 ml-2">{icons[idx]}</div>
                                : <div className="-mt-1 ml-4 w-5 h-5"></div>
                            }
                        </div>
                    </Fragment>
                ))}
            </div>
        </button>
    );
}

//TODO: add minimal, compact, and normal views
//TODO: Card title is setting class 'card-current'. use it or use custom CSS vars
