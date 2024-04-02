import { atom, PrimitiveAtom, useAtomValue } from 'jotai';
import { atomWithCallback, OnValueChange } from '@/hooks/atomsX';
import { EditorData } from '@/store';
import { MatchWebState } from '../3-tabs/3-tab1-matching';

export function createUrlsAtom(editorData: EditorData, onChange: OnValueChange<MatchWebState>): PrimitiveAtom<MatchWebState> {
    const fileUs = useAtomValue(editorData.fileUsAtom);

    // Page Web Matching
    const { web_ourl: o = '', web_murl: m = '', web_qurl: q = '' } = fileUs.meta?.[editorData.formIdx]?.mani?.detection || {};
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
