import React, { Fragment, HTMLAttributes, MouseEvent } from "react";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { FormIdx, formIdxName, UISize, uiSizeAtom } from "@/store";
import { IconFormChange, IconFormLogin } from "@ui/UIIconSymbols";
import { appBigIcons, appMediumIcons, ButtonsDisp, dispToIcons } from "../Part4Card_UI/UICardFormButtonTypes";
import { classNames } from "@/utils/classnames";

type UICardFormButtonProps = {
    disp: Meta.Disp | undefined;
    formIdx: FormIdx;
    open: boolean;
};

// function UICardFormButton({ disp, formIdx, open, ...rest }: UICardFormButtonProps & HTMLAttributes<HTMLButtonElement>) {
//     const icons = dispToIcons(disp, appBigIcons);
//     return (
//         <button
//             className={classNames(
//                 "p-2 border border-primary-700 rounded flex items-center shadow-md active:scale-[.97] select-none",
//                 open && 'bg-primary-800 text-primary-100'
//             )}
//             {...rest}
//         >
//             <span>{formIdxName(formIdx)}</span>
//             {icons}
//         </button>
//     );
// }

export function CardNormalButtons({ buttonsDisp, openAtom }: { buttonsDisp: ButtonsDisp; openAtom: PrimitiveAtom<boolean>; }) {
    const [open, setOpen] = useAtom(openAtom);
    const icons = buttonsDisp.map(([_, disp]) => dispToIcons(disp, appBigIcons));

    const toogleOpen = (event: MouseEvent) => { event.stopPropagation(); setOpen((v) => !v); };
    return (
        <div className="py-2 flex items-center space-x-2 text-sm">
            {buttonsDisp.map(([hasForm, disp], idx) => (
                <Fragment key={idx}>
                    {hasForm &&
                        // <UICardFormButton disp={disp} open={open} onClick={toogleOpen} formIdx={idx} />

                        <button
                            className={classNames(
                                "p-2 border border-primary-700 rounded flex items-center shadow-md active:scale-[.97] select-none",
                                open && 'bg-primary-800 text-primary-100'
                            )}
                        >
                            <span>{formIdxName(idx)}</span>
                            {icons[idx]}
                        </button>

                    }
                </Fragment>
            ))}
        </div>
    );
}

/*
export function CardNormalButtons({ buttonsDisp, openAtom }: { buttonsDisp: ButtonsDisp; openAtom: PrimitiveAtom<boolean>; }) {
    const [open, setOpen] = useAtom(openAtom);
    const icons = buttonsDisp.map(([_, disp]) => dispToIcons(disp, appMediumIcons));
    
    const toogleOpen = (event: MouseEvent) => { event.stopPropagation(); setOpen((v) => !v); };
    return (
        <div className="py-2 flex items-center space-x-2 text-sm">
            {buttonsDisp.map(([hasForm, disp], idx) => (
                <Fragment key={idx}>
                    {hasForm &&
                        <UICardFormButton disp={disp} open={open} onClick={toogleOpen} formIdx={idx} />
                    }
                </Fragment>
            ))}
        </div>
    );
}
*/

export function CardMediumButtons({ buttonsDisp, openAtom }: { buttonsDisp: ButtonsDisp; openAtom: PrimitiveAtom<boolean>; }) {
    const minimal = useAtomValue(uiSizeAtom) === UISize.minimal;
    const [open, setOpen] = useAtom(openAtom);
    const icons = buttonsDisp.map(([_, disp]) => dispToIcons(disp, appMediumIcons));
    const prefixClass = { className: minimal ? "self-start w-2 h-2" : "self-start w-3 h-3" };
    const prefix = (idx: FormIdx) => idx === FormIdx.login ? IconFormLogin(prefixClass) : IconFormChange(prefixClass);
    return (
        <button
            className={classNames(
                "px-1.5 py-0.5 hover:bg-primary-800 border-primary-700 border border-dotted rounded shadow-md active:scale-[.97] select-none",
                "flex items-stretch space-x-1",
                minimal ? "h-8" : "h-10",
                open ? 'bg-primary-800 text-primary-300' : "text-primary-500",
            )}
            onClick={(event: MouseEvent) => { event.stopPropagation(); setOpen((v) => !v); }}
        >
            {buttonsDisp.map(([hasForm, disp], idx) => (
                <div className="flex items-end pb-0.5" title={formIdxName(idx)} key={idx}>
                    {prefix(idx)}
                    {hasForm
                        ? <div className="flex">{icons[idx]}</div>
                        : <div className="w-5 h-5"></div>
                    }
                </div>
            ))}
        </button>
    );
}

//TODO: add minimal, compact, and normal views
//TODO: Card title is setting class 'card-current'. use it or use custom CSS vars