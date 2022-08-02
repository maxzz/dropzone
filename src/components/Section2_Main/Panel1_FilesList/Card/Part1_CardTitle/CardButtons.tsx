import React from "react";
import { FormIdx } from "@/store";
import { UICardFormButton, UICardFormMediumButton } from "../Part4_CardUI/UICardFormButton";
import { PrimitiveAtom, useAtom } from "jotai";

export function CardNormalButtons({ hasLogin, hasCpass, disp, openAtom }: { hasLogin: boolean; hasCpass: boolean; disp: Array<Meta.Disp | undefined>; openAtom: PrimitiveAtom<boolean>; }) {
    const [open, setOpen] = useAtom(openAtom);
    const toogleOpen = () => setOpen((v) => !v);
    return (
        <div className="flex items-center space-x-2 text-sm">
            {hasLogin && <UICardFormButton disp={disp[0]} opened={open} onClick={toogleOpen} formIdx={FormIdx.login} />}
            {hasCpass && <UICardFormButton disp={disp[1]} opened={open} onClick={toogleOpen} formIdx={FormIdx.cpass} />}
        </div>
    );
}

export function CardMediumButtons({ hasLogin, hasCpass, disp, openAtom }: { hasLogin: boolean; hasCpass: boolean; disp: Array<Meta.Disp | undefined>; openAtom: PrimitiveAtom<boolean>; }) {
    const [open, setOpen] = useAtom(openAtom);
    const toogleOpen: React.MouseEventHandler<HTMLButtonElement> = (event) => { event.stopPropagation(); setOpen((v) => !v);}
    return (
        <div className="flex items-center space-x-1 text-sm">
            {hasLogin && <UICardFormMediumButton disp={disp[0]} opened={open} onClick={toogleOpen} formIdx={FormIdx.login} />}
            {hasCpass && <UICardFormMediumButton disp={disp[1]} opened={open} onClick={toogleOpen} formIdx={FormIdx.cpass} />}
        </div>
    );
}
