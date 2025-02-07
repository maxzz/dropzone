import { atom, PrimitiveAtom } from 'jotai';
import { atomWithCallback, OnValueChange } from '@/util-hooks';
import { FileUs, FormIdx } from '@/store';
import { MatchWebState } from '../2-tabs/1-matching/0-urls-dirty';

export function createUrlsAtom(fileUs: FileUs, formIdx: FormIdx, onChange: OnValueChange<MatchWebState>): PrimitiveAtom<MatchWebState> {

    // Page Web Matching
    const {
        web_ourl: o = '',
        web_murl: m = '',
        web_qurl: q = '',
    } = fileUs.parsedSrc.meta?.[formIdx]?.mani?.detection || {};

    const initial = { o, m, q, };

    return atomWithCallback<MatchWebState>(
        {
            ...initial,
            initial,
            dirtyAtom: atom<boolean>(false)
        },
        onChange
    );
}
