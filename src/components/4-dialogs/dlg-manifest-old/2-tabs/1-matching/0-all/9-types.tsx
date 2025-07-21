import { type PrimitiveAtom } from "jotai";
import { type Atomize } from "@/utils";
import { Matching } from "@/store/manifest";

export type UrlsState = {
    o: string;
    m: string;
    q: string;
};

export type UrlsEditorData = Prettify<
    & Atomize<Matching.RawMatchData>
    & Atomize<UrlsState>
    & {
        isChangedAtom: PrimitiveAtom<boolean>;
        fromFile: UrlsState;                        // Initial state of urls from file
        fromFileMatchData: Matching.RawMatchData;  // Initial state of urls from file
    }
>;

export type UrlsEditorDataAtom = PrimitiveAtom<UrlsEditorData>; // to have callback onChange

export function areUrlStates(a: UrlsState, b: UrlsState): boolean {
    return a.m !== b.m || a.o !== b.o || a.q !== b.q;
}
