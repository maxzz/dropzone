import { atom } from "jotai";
import { type MatchWebStateAtom, areUrlsChanged } from "./9-types";

export const setUrlsAtom = atom(
    null,
    (get, set, { editorUrlsAtom, m, o, q }: { editorUrlsAtom: MatchWebStateAtom, m?: string, o?: string, q?: string; }) => {
        const editorUrls = get(editorUrlsAtom);

        const newState = {
            ...editorUrls,
            current: {
                ...editorUrls.current,
                m: m || editorUrls.current.m,
                o: o || editorUrls.current.o,
                q: q || editorUrls.current.q,
            }
        };

        set(editorUrlsAtom, newState);
        set(editorUrls.isChangedAtom, areUrlsChanged(newState));
    }
);
