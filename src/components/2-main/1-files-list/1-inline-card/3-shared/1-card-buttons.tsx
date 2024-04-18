import React, { Fragment, MouseEvent } from "react";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { FormIdx, formIdxName, UISize, uiSizeAtom } from "@/store";
import { SymbolFormChange, SymbolFormLogin } from "@ui/icons";
import { appBigIcons, appMediumIcons, ButtonsDisp, dispToIcons } from "../4-ui/UICardFormButtonTypes";
import { classNames } from "@/utils";

const normalTriggerClasses = "p-2 border-primary-700 border rounded shadow-md active:scale-[.97] select-none flex items-center";

export function CardNormalButtons({ buttonsDisp, openAtom }: { buttonsDisp: ButtonsDisp; openAtom: PrimitiveAtom<boolean>; }) {

    const [open, setOpen] = useAtom(openAtom);
    const icons = buttonsDisp.map(([_, disp]) => dispToIcons(disp, appBigIcons));

    return (
        <div className="py-2 flex items-center space-x-2 text-sm">
            {buttonsDisp.map(
                ([hasForm, disp], idx) => (
                    <Fragment key={idx}>
                        {hasForm && (
                            <button
                                className={classNames(normalTriggerClasses, open ? 'bg-primary-800 text-primary-100' : "hover:bg-primary-300")}
                                onClick={() => setOpen((v) => !v)}
                            >
                                {formIdxName(idx)}
                                {icons[idx]}
                            </button>
                        )}
                    </Fragment>
                )
            )}
        </div>
    );
}

const mediumTriggerClasses = "\
px-1.5 py-0.5 \
\
border-primary-700 \
hover:bg-primary-800 \
active:scale-[.97] \
\
border border-dotted rounded shadow-md \
\
flex items-stretch space-x-1 \
select-none";

export function CardMediumButtons({ buttonsDisp, openAtom }: { buttonsDisp: ButtonsDisp; openAtom: PrimitiveAtom<boolean>; }) {

    const minimal = useAtomValue(uiSizeAtom) === UISize.minimal;

    const [open, setOpen] = useAtom(openAtom);

    const icons = buttonsDisp.map(([_, disp]) => dispToIcons(disp, appMediumIcons));

    const PrefixIcon = (idx: FormIdx) => {
        const prefixClasses = { className: minimal ? "self-start size-2" : "self-start size-3" };
        return idx === FormIdx.login
            ? SymbolFormLogin(prefixClasses)
            : SymbolFormChange(prefixClasses)
    };

    const triggerClasses = classNames(mediumTriggerClasses, minimal ? "h-8" : "h-10", open ? 'bg-primary-800 text-primary-300' : "text-primary-500")

    return (
        <button className={triggerClasses} onClick={(event: MouseEvent) => { event.stopPropagation(); setOpen((v) => !v); }}>

            {buttonsDisp.map(
                ([hasForm, disp], idx) => (
                    <div className="flex items-end pb-0.5" title={formIdxName(idx)} key={idx}>
                        {PrefixIcon(idx)}

                        {hasForm
                            ? <div className="flex">{icons[idx]}</div>
                            : <div className="size-5"></div>
                        }
                    </div>
                )
            )}

        </button>
    );
}

//TODO: add minimal, compact, and normal views - done
//TODO: Card title is setting class 'card-current'. use it or use custom CSS vars - no need, won't do

//TODO: field catalog special buttons
//TODO: goto file index, i.e. scroll
