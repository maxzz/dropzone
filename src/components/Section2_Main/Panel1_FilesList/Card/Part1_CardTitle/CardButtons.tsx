import React, { Dispatch, SetStateAction } from "react";
import { FormIdx } from "@/store";
import { UICardFormButton, UICardFormMediumButton } from "../Part4_CardUI/UICardFormButton";

export function CardNormalButtons({ hasLogin, hasCpass, disp, state }: { hasLogin: boolean; hasCpass: boolean; disp: Array<Meta.Disp | undefined>; state: [boolean, Dispatch<SetStateAction<boolean>>]; }) {
    const [formsExpanded, setFormsExpanded] = state;
    const toogleFormsExpanded = () => setFormsExpanded((v) => !v);
    return (
        <div className="flex items-center space-x-2 text-sm">
            {hasLogin && <UICardFormButton disp={disp[0]} opened={formsExpanded} onClick={toogleFormsExpanded} formIdx={FormIdx.login} />}
            {hasCpass && <UICardFormButton disp={disp[1]} opened={formsExpanded} onClick={toogleFormsExpanded} formIdx={FormIdx.cpass} />}
        </div>
    );
}

export function CardMediumButtons({ hasLogin, hasCpass, disp, state }: { hasLogin: boolean; hasCpass: boolean; disp: Array<Meta.Disp | undefined>; state: [boolean, Dispatch<SetStateAction<boolean>>]; }) {
    const [formsExpanded, setFormsExpanded] = state;
    const toogleFormsExpanded = () => setFormsExpanded((v) => !v);
    return (
        <div className="flex items-center space-x-2 text-sm">
            {hasLogin && <UICardFormMediumButton disp={disp[0]} opened={formsExpanded} onClick={toogleFormsExpanded} formIdx={FormIdx.login} />}
            {hasCpass && <UICardFormMediumButton disp={disp[1]} opened={formsExpanded} onClick={toogleFormsExpanded} formIdx={FormIdx.cpass} />}
        </div>
    );
}
