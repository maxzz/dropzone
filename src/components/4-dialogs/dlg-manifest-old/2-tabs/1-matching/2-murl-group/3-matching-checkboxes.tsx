import { Matching } from '@/store/manifest';
import { MatchWebState, areUrlsChanged } from '../0-all';

export function MatchingCheckboxes({ rawMD, urls, setUrls, setDirty }: { rawMD: Matching.RawMatchData; urls: MatchWebState; setUrls: (urls: MatchWebState) => void; setDirty: (dirty: boolean) => void; }) {
    return (
        <div>
            <Checkbox
                label="Case sensitive"
                checked={(rawMD.opt & Matching.Options.caseinsensitive) !== 0}
                onChange={(event) => {
                    let opt = event.target.checked ? rawMD.opt | Matching.Options.caseinsensitive : rawMD.opt & ~Matching.Options.caseinsensitive;
                    const newState = { ...urls, m: Matching.makeRawMatchData({ ...rawMD, opt }, urls.o) };
                    setUrls(newState);
                    setDirty(areUrlsChanged(newState));
                }}
            />

            <Checkbox
                label="Match text"
                checked={(rawMD.opt & Matching.Options.matchtext) !== 0}
                onChange={(event) => {
                    let opt = event.target.checked ? rawMD.opt | Matching.Options.matchtext : rawMD.opt & ~Matching.Options.matchtext;
                    const newState = { ...urls, m: Matching.makeRawMatchData({ ...rawMD, opt }, urls.o) };
                    setUrls(newState);
                    setDirty(areUrlsChanged(newState));
                }}
            />

            <Checkbox
                label="Use url query params"
                checked={(rawMD.opt & Matching.Options.usequery) !== 0}
                onChange={(event) => {
                    let opt = event.target.checked ? rawMD.opt | Matching.Options.usequery : rawMD.opt & ~Matching.Options.usequery;
                    const newState = { ...urls, m: Matching.makeRawMatchData({ ...rawMD, opt }, urls.o) };
                    setUrls(newState);
                    setDirty(areUrlsChanged(newState));
                }}
            />
        </div>
    );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; }) {
    return (
        <label className="mt-1 h-6 flex items-center space-x-1">
            <input type="checkbox" className="rounded focus:ring-indigo-500 focus:ring-offset-0" checked={checked} onChange={onChange} />
            <div>
                {label}
            </div>
        </label>
    );
}
