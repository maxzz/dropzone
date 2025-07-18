import { type PrimitiveAtom, atom } from 'jotai';
import { type OnValueChange, atomWithCallback } from '@/util-hooks';
import { type FileUs, FormIdx } from '@/store';
import { type MatchWebState } from './9-types';

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
            isChangedAtom: atom<boolean>(false)
        },
        onChange
    );
}
