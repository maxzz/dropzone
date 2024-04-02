import { atom, PrimitiveAtom } from 'jotai';
import { atomWithCallback, OnValueChange } from '@/hooks/atomsX';
import { FileUs, FormIdx } from '@/store';
import { MatchWebState } from '../3-tabs/3-tab1-matching';

export function createUrlsAtom(fileUs: FileUs, formIdx: FormIdx, onChange: OnValueChange<MatchWebState>): PrimitiveAtom<MatchWebState> {

    // Page Web Matching
    const {
        web_ourl: o = '',
        web_murl: m = '',
        web_qurl: q = '',
    } = fileUs.meta?.[formIdx]?.mani?.detection || {};

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
