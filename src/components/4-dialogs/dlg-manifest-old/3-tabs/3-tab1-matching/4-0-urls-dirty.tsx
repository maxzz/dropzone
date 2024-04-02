import { PrimitiveAtom, WritableAtom } from 'jotai';

type UrlsState = {
    o: string;
    m: string;
    q: string;
};

export type MatchWebState = UrlsState & {
    initial: UrlsState;
    dirtyAtom: PrimitiveAtom<boolean>; // it should be not dirty but: is initial value?
};

export type MatchWebStateAtom = WritableAtom<MatchWebState, [MatchWebState], void>;

export function urlsDirty(urls: MatchWebState): boolean {
    return urls.m !== urls.initial.m || urls.o !== urls.initial.o || urls.q !== urls.initial.q;
}
