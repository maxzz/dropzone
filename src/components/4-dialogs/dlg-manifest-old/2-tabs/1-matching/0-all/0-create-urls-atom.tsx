import { type PrimitiveAtom, atom } from "jotai";
import { type OnValueChange, atomWithCallback } from "@/utils/util-hooks";
import { type FileUs, FormIdx } from "@/store";
import { type MatchWebState } from "./9-types";
import { Matching } from "@/store/manifest";

export function createEditorUrlsAtom(fileUs: FileUs, formIdx: FormIdx, onChange: OnValueChange<MatchWebState>): PrimitiveAtom<MatchWebState> {

    // Page Web Matching
    const {
        web_ourl: o = '',
        web_murl: m = '',
        web_qurl: q = '',
    } = fileUs.parsedSrc.meta?.[formIdx]?.mani?.detection || {};

    const initial = { o, m, q, };

    console.log('createUrlsAtom', initial);

    const { how, opt, url } = Matching.parseRawMatchData(m);

    return atomWithCallback<MatchWebState>(
        {
            current: { ...initial },
            initial,
            isChangedAtom: atom<boolean>(false),

            oAtom: atom(o),
            mAtom: atom(m),
            qAtom: atom(q),
            
            howAtom: atom(how),
            optAtom: atom(opt),
            urlAtom: atom(url),
        },
        onChange
    );
}
