import { type PrimitiveAtom, atom } from "jotai";
import { type OnValueChange, atomWithCallback } from "@/utils/util-hooks";
import { type FileUs, FormIdx } from "@/store";
import { type MatchWebState } from "./9-types";

export function createEditorUrlsAtom(fileUs: FileUs, formIdx: FormIdx, onChange: OnValueChange<MatchWebState>): PrimitiveAtom<MatchWebState> {

    // Page Web Matching
    const {
        web_ourl: o = '',
        web_murl: m = '',
        web_qurl: q = '',
    } = fileUs.parsedSrc.meta?.[formIdx]?.mani?.detection || {};

    const initial = { o, m, q, };

    console.log('createUrlsAtom', initial);

    return atomWithCallback<MatchWebState>(
        {
            ...initial,
            initial,
            isChangedAtom: atom<boolean>(false)
        },
        onChange
    );
}
