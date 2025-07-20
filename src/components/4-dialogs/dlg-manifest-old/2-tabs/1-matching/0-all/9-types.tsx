import { type PrimitiveAtom, type WritableAtom } from "jotai";

type UrlsState = {
    o: string;
    m: string;
    q: string;
};

export type MatchWebState = Prettify<{
    current: UrlsState;
    initial: UrlsState;                         // Initial state of urls from file
    isChangedAtom: PrimitiveAtom<boolean>;      // It should be not dirty but: is initial value?
}>;

export type MatchWebStateAtom = WritableAtom<MatchWebState, [MatchWebState], void>;

export function areUrlsChanged(urls: MatchWebState): boolean {
    return urls.current.m !== urls.initial.m || urls.current.o !== urls.initial.o || urls.current.q !== urls.initial.q;
}
