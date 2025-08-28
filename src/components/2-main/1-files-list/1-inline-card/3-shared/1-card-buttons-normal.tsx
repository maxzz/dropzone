import { PrimitiveAtom, useAtom } from "jotai";
import { formIdxName } from "@/store";
import { getUpToTreeIconsForForm } from "../4-ui/3-card-form-button-types";
import { DispArrForTwoForm } from "../4-ui/4-form-disp-arr";
import { classNames } from "@/utils";

const triggerClasses = "p-2 border-primary-700 border rounded shadow-md active:scale-[.97] select-none flex items-center";

export function CardNormalButtons({ dispArrForTwoForm, openAtom }: { dispArrForTwoForm: DispArrForTwoForm; openAtom: PrimitiveAtom<boolean>; }) {

    const [open, setOpen] = useAtom(openAtom);

    const trippleIcons = dispArrForTwoForm.map(([_, disp]) => getUpToTreeIconsForForm(disp, false));

    return (
        <div className="py-2 flex items-center space-x-2 text-sm">
            {dispArrForTwoForm.map(
                ([hasForm, disp], idx) => {
                    if (!hasForm) {
                        return null;
                    }
                    return (
                        <button
                            className={classNames(triggerClasses, open ? 'bg-primary-800 text-primary-100' : "hover:bg-primary-300")}
                            onClick={() => setOpen((v) => !v)}
                            key={idx}
                        >
                            {formIdxName(idx)}
                            {trippleIcons[idx]}
                        </button>
                    );
                }
            )}
        </div>
    );
}
