import { useAtomValue } from 'jotai';
import { SymbolAttention } from '@ui/icons';
import { MatchWebStateAtom } from '../2-tabs/1-matching';
//import { toastWarning } from '@ui/UIToaster';

const shadowStyles = { filter: 'drop-shadow(#f66b3b7a 0px 0px 0.15rem)' };

export function ManiModifiedState({ urlsAtom }: { urlsAtom: MatchWebStateAtom; }) {
    const urls = useAtomValue(urlsAtom);
    const dirty = useAtomValue(urls.dirtyAtom);
    return (<>
        {dirty && (
            <SymbolAttention className="self-end size-4 text-[#f6673b] fill-[#ffad42]" style={shadowStyles} title="Modified" />
        )}
    </>);
}

// fill variations #ff5400 stroke="#f6673b" strokeWidth={0.8}
