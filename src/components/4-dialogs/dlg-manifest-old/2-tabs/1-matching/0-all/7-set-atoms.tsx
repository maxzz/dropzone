import { atom } from "jotai";
import { type UrlsEditorDataAtom, areDiffRawMatchData } from "./9-types";
import { Matching } from "@/store/manifest";

export const setUrlsAtom = atom(
    null,
    (get, set, { urlsEditorDataAtom, q, how, opt, url }: { urlsEditorDataAtom: UrlsEditorDataAtom, q?: string; how?: Matching.How; opt?: Matching.Options; url?: string; }) => {
        const urlsEditorData = get(urlsEditorDataAtom);

        const current: Matching.RawMatchData = { how: get(urlsEditorData.howAtom), opt: get(urlsEditorData.optAtom), url: get(urlsEditorData.urlAtom) };

        if (how !== undefined || opt !== undefined || url !== undefined) {
            if (how !== undefined) {
                current.how = how;
                set(urlsEditorData.howAtom, how);
            }
            if (opt !== undefined) {
                current.opt = opt;
                set(urlsEditorData.optAtom, opt);
            }
            if (url !== undefined) {
                current.url = url;
                set(urlsEditorData.urlAtom, url);
            }

            set(urlsEditorData.mAtom, Matching.stringifyRawMatchData(current, urlsEditorData.fromFile.o));
        }

        if (q !== undefined) {
            set(urlsEditorData.qAtom, q);
        }

        const isChanged = q !== urlsEditorData.fromFile.q || areDiffRawMatchData(current, urlsEditorData.fromFileMatchData);
        set(urlsEditorData.isChangedAtom, isChanged);
    }
);
