import { useAtomValue } from 'jotai';
import { SymbolAttention } from '@ui/icons';
import { MatchWebStateAtom } from '../3-tabs/3-tab1-matching';

//import { toastWarning } from '@ui/UIToaster';
export function ManifestState({ urlsAtom }: { urlsAtom: MatchWebStateAtom; }) {
    const urls = useAtomValue(urlsAtom);
    const dirty = useAtomValue(urls.dirtyAtom);
    return (<>
        {dirty &&
            <SymbolAttention
                className="self-end w-4 h-4 text-[#f6673b]"
                fill="#ffad42" // #ff5400 stroke="#f6673b" strokeWidth={0.8}
                style={{ filter: 'drop-shadow(#f66b3b7a 0px 0px 0.15rem)' }}
                title="Modified" />}
    </>);
}
