import { Fragment } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { formIdxName } from "@/store";
import { appBigIcons, ButtonsDisp, dispToIcons } from "../4-ui/UICardFormButtonTypes";
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
