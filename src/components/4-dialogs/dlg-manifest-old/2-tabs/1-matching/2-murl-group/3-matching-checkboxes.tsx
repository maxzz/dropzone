import { Matching } from "@/store/manifest";
import { type MatchWebState, areUrlsChanged } from "../0-all";

export function MatchingCheckboxes({ rawMD, urls, setUrls, setDirty }: { rawMD: Matching.RawMatchData; urls: MatchWebState; setUrls: (urls: MatchWebState) => void; setDirty: (dirty: boolean) => void; }) {

    function ischecked(option: Matching.Options) {
        return (rawMD.opt & option) !== 0;
    }

    function onChange(checked: boolean, changedOption: Matching.Options) {
        let opt = checked ? rawMD.opt | changedOption : rawMD.opt & ~changedOption;
        const newState = { ...urls, current: { ...urls.current, m: Matching.stringifyRawMatchData({ ...rawMD, opt }, urls.current.o) } };
        setUrls(newState);
        setDirty(areUrlsChanged(newState));
    }

    return (
        <div>
            <Checkbox
                label="Case sensitive"
                checked={ischecked(Matching.Options.caseinsensitive)}
                onChange={(event) => onChange(event.target.checked, Matching.Options.caseinsensitive)}
            />

            <Checkbox
                label="Match text"
                checked={ischecked(Matching.Options.matchtext)}
                onChange={(event) => onChange(event.target.checked, Matching.Options.matchtext)}
            />

            <Checkbox
                label="Use url query params"
                checked={ischecked(Matching.Options.usequery)}
                onChange={(event) => onChange(event.target.checked, Matching.Options.usequery)}
            />
        </div>
    );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; }) {
    return (
        <label className="mt-1 h-6 flex items-center space-x-1">
            <input
                type="checkbox"
                className="rounded focus:ring-indigo-500 focus:ring-offset-0"
                checked={checked}
                onChange={onChange}
            />
            
            <div>
                {label}
            </div>
        </label>
    );
}
