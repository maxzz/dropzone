import { type PrimitiveAtom, type WritableAtom } from 'jotai';

type UrlsState = {
    o: string;
    m: string;
    q: string;
};

export type MatchWebState = Prettify<
    & UrlsState
    & {
        initial: UrlsState;                         // Initial state of urls from file
        isChangedAtom: PrimitiveAtom<boolean>;      // It should be not dirty but: is initial value?
    }
>;

export type MatchWebStateAtom = WritableAtom<MatchWebState, [MatchWebState], void>;

export function areUrlsChanged(urls: MatchWebState): boolean {
    return urls.m !== urls.initial.m || urls.o !== urls.initial.o || urls.q !== urls.initial.q;
}
