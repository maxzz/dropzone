import { atom } from "jotai";
import { type UrlsEditorDataAtom, areUrlStates } from "./9-types";
import { Matching } from "@/store/manifest";

export const setUrlsEditorDataAtom = atom(
    null,
    (get, set, { urlsEditorDataAtom, o, q, how, opt, url }: { urlsEditorDataAtom: UrlsEditorDataAtom, o?: string; q?: string; how?: Matching.How; opt?: Matching.Options; url?: string; }) => {
        const urlsEditorData = get(urlsEditorDataAtom);

        if (o !== undefined) {
            set(urlsEditorData.oAtom, o);
        }

        if (q !== undefined) {
            set(urlsEditorData.qAtom, q);
        }

        if (how !== undefined || opt !== undefined || url !== undefined) {
            const current: Matching.RawMatchData = { how: get(urlsEditorData.howAtom), opt: get(urlsEditorData.optAtom), url: get(urlsEditorData.urlAtom) };

            if (how !== undefined) {
                current.how = how;
                set(urlsEditorData.howAtom, how);

                if (how === Matching.How.undef) {
                    set(urlsEditorData.urlAtom, get(urlsEditorData.oAtom));
                }
            }
            if (opt !== undefined) {
                current.opt = opt;
                set(urlsEditorData.optAtom, opt);
            }
            if (url !== undefined) {
                current.url = url;
                set(urlsEditorData.urlAtom, url);
            }

            set(urlsEditorData.mAtom, Matching.stringifyRawMatchData(current, get(urlsEditorData.oAtom)));
        }

        const currentUrls = { o: get(urlsEditorData.oAtom), m: get(urlsEditorData.mAtom), q: get(urlsEditorData.qAtom) };
        const isChanged = areUrlStates(currentUrls, urlsEditorData.fromFile);
        set(urlsEditorData.isChangedAtom, isChanged);
    }
);
