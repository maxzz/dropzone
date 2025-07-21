import { atom } from "jotai";
import { type OnValueChangeParams, atomWithCallback } from "@/utils";
import { Matching } from "@/store/manifest";
import { type FileUs, FormIdx } from "@/store";
import { type UrlsEditorData, type UrlsEditorDataAtom } from "./9-types";

export type OnChangeParamsWithNameScope = (params: OnValueChangeParams & { name: string; }) => void;

export function createUrlsEditorData(fileUs: FileUs, formIdx: FormIdx, onChange: OnChangeParamsWithNameScope): UrlsEditorDataAtom {

    // Page Web Matching
    const {
        web_ourl: o = '',
        web_murl: m = '',
        web_qurl: q = '',
    } = fileUs.parsedSrc.meta?.[formIdx]?.mani?.detection || {};

    const initial = { o, m, q, };

    console.log('createUrlsAtom', JSON.stringify(initial, null, 4));

    const fromFileMatchData = Matching.parseRawMatchData(m);
    const { how, opt, url } = fromFileMatchData;

    function onChangeLocal(name: string) {
        function onChangeWithNameScope({ get, set, nextValue }: OnValueChangeParams) {
            onChange({ name, get, set, nextValue });
        }
        return onChangeWithNameScope;
    }

    const urlsEditorData: UrlsEditorData = {
        fromFile: initial,
        fromFileMatchData,
        isChangedAtom: atom<boolean>(false),

        oAtom: atomWithCallback(o, onChangeLocal('o')),
        mAtom: atomWithCallback(m, onChangeLocal('m')),
        qAtom: atomWithCallback(q, onChangeLocal('q')),

        howAtom: atomWithCallback(how, onChangeLocal('how')),
        optAtom: atomWithCallback(opt, onChangeLocal('opt')),
        urlAtom: atomWithCallback(url, onChangeLocal('url')),
    };

    return atom(urlsEditorData);
}
