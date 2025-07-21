import { atom } from "jotai";
import { type UrlsEditorDataAtom, areDiffRawMatchData } from "./9-types";
import { Matching } from "@/store/manifest";

export const setUrlsEditorDataAtom = atom(
    null,
    (get, set, { urlsEditorDataAtom, o, q, how, opt, url }: { urlsEditorDataAtom: UrlsEditorDataAtom, o?: string; q?: string; how?: Matching.How; opt?: Matching.Options; url?: string; }) => {
        const urlsEditorData = get(urlsEditorDataAtom);

        if (o !== undefined) {
            set(urlsEditorData.oAtom, o);
        }

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

            set(urlsEditorData.mAtom, Matching.stringifyRawMatchData(current, get(urlsEditorData.oAtom)));
        }

        if (q !== undefined) {
            set(urlsEditorData.qAtom, q);
        }

        const isChanged =
            q !== urlsEditorData.fromFile.q ||
            o !== urlsEditorData.fromFile.o ||
            areDiffRawMatchData(current, urlsEditorData.fromFileMatchData); //TODO: we can compare only current areUrlStates() instead

        set(urlsEditorData.isChangedAtom, isChanged);
    }
);
