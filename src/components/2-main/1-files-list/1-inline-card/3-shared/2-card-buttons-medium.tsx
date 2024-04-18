import { MouseEvent } from "react";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { FormIdx, formIdxName, UISize, uiSizeAtom } from "@/store";
import { SymbolFormChange, SymbolFormLogin } from "@ui/icons";
import { appMediumIcons, dispToIcons } from "../4-ui/3-card-form-button-types";
import { FormDispArr } from '../4-ui/4-form-disp-arr';
import { classNames } from "@/utils";

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

export function CardMediumButtons({ buttonsDisp, openAtom }: { buttonsDisp: FormDispArr; openAtom: PrimitiveAtom<boolean>; }) {

    const minimal = useAtomValue(uiSizeAtom) === UISize.minimal;

    const [open, setOpen] = useAtom(openAtom);

    const icons = buttonsDisp.map(([_, disp]) => dispToIcons(disp, appMediumIcons));

    const PrefixIcon = (idx: FormIdx) => {
        const prefixClasses = { className: minimal ? "self-start size-2" : "self-start size-3" };
        return idx === FormIdx.login
            ? SymbolFormLogin(prefixClasses)
            : SymbolFormChange(prefixClasses);
    };

    const triggerClasses = classNames(
        mediumTriggerClasses,
        minimal ? "h-8" : "h-10",
        open ? 'bg-primary-800 text-primary-300' : "text-primary-500"
    );

    return (
        <button className={triggerClasses} onClick={(event: MouseEvent) => { event.stopPropagation(); setOpen((v) => !v); }}>

            {buttonsDisp.map(
                ([hasForm, disp], idx) => (
                    <div className="flex items-end pb-0.5" title={formIdxName(idx)} key={idx}>
                        {PrefixIcon(idx)}

                        {hasForm
                            ? <div className="flex">{icons[idx]}</div>
                            : <div className="size-5"></div>}
                    </div>
                )
            )}

        </button>
    );
}
