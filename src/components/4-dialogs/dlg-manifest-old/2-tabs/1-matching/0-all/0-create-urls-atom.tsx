import { type PrimitiveAtom, atom } from "jotai";
import { type OnValueChange, atomWithCallback } from "@/utils/util-hooks";
import { type FileUs, FormIdx } from "@/store";
import { type UrlsEditorData, type UrlsEditorDataAtom } from "./9-types";
import { Matching } from "@/store/manifest";

export function createUrlsEditorData(fileUs: FileUs, formIdx: FormIdx, onChange: OnValueChange<UrlsEditorData>): UrlsEditorDataAtom {

    // Page Web Matching
    const {
        web_ourl: o = '',
        web_murl: m = '',
        web_qurl: q = '',
    } = fileUs.parsedSrc.meta?.[formIdx]?.mani?.detection || {};

    const initial = { o, m, q, };

    console.log('createUrlsAtom', initial);

    const fromFileMatchData = Matching.parseRawMatchData(m);
    const { how, opt, url } = fromFileMatchData;

    return atomWithCallback<UrlsEditorData>(
        {
            fromFile: initial,
            fromFileMatchData,
            isChangedAtom: atom<boolean>(false),

            oAtom: atom(o),
            mAtom: atom(m),
            qAtom: atom(q),
            
            howAtom: atom(how),
            optAtom: atom(opt),
            urlAtom: atom(url),
        },
        onChange //TODO: callback onChange is on the wrong atom (or do callback with name scope). later
    );
}
