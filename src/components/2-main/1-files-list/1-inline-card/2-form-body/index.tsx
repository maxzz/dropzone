import { Fragment, useState } from "react";
import { atom, PrimitiveAtom, useAtomValue } from "jotai";
import { FileUsAtomType, FormIdx, formIdxName, SelectRowAtomsType, UISize, uiSizeAtom } from "@/store";
import { classNames } from "@/utils";
import { getDispArrForTwoForms } from "../4-ui/4-form-disp-arr";
import { CardNormalButtons } from "../3-shared/1-card-buttons-normal";
import { CardFormBody1_Header } from "./1-header";
import { CardFormBody2_Fields } from "./2-fields";

export function Part2Card_FormBody({ fileUsAtom, openAtom }: { fileUsAtom: FileUsAtomType; openAtom: PrimitiveAtom<boolean>; }) {
    const open = useAtomValue(openAtom);
    const fileUs = useAtomValue(fileUsAtom);

    const selectRowAtoms = useState<SelectRowAtomsType>(() => ({
        loginAtom: atom({ fieldIdx: -1, formType: -1 }),
        cpassAtom: atom({ fieldIdx: -1, formType: -1 }),
    }))[0];

    const sizeNormal = useAtomValue(uiSizeAtom) === UISize.normal;

    const buttons = getDispArrForTwoForms(fileUs);
    const hasLogin = buttons[0][0];
    const hasCpass = buttons[1][0];

    if (!hasLogin && !hasCpass) {
        return null;
    }

    const items = [
        [hasLogin, FormIdx.login],
        [hasCpass, FormIdx.cpass]
    ] as const;

    return (
        <div className={classNames("px-2 bg-primary-200 text-primary-800", open && "pb-2")}>

            {sizeNormal && (
                <CardNormalButtons dispArrForTwoForm={buttons} openAtom={openAtom} />
            )}

            {open && items.map(
                ([hasForm, formIdx]) => {
                    if (!hasForm) {
                        return null;
                    }
                    return (
                        <Fragment key={formIdx}>
                            <div className="pt-2 text-sm font-bold">
                                {formIdxName(formIdx)}
                            </div>

                            <CardFormBody1_Header fileUsAtom={fileUsAtom} formIdx={formIdx} selectRowAtoms={selectRowAtoms} />
                            <CardFormBody2_Fields fileUsAtom={fileUsAtom} formType={formIdx} selectRowAtoms={selectRowAtoms} />
                        </Fragment>
                    );
                }
            )}
        </div>
    );
}
