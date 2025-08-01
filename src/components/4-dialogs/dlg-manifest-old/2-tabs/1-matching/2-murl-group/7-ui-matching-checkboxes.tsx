import { Matching } from "@/store/manifest";

type IsChecked = (option: Matching.Options) => boolean;
type OnCheckboxChange = (checked: boolean, changedOption: Matching.Options) => void;

export function MatchingCheckboxes({ isChecked, onCheckboxChange }: { isChecked: IsChecked; onCheckboxChange: OnCheckboxChange; }) {
    return (
        <div>
            <Checkbox
                label="Case sensitive"
                checked={isChecked(Matching.Options.caseinsensitive)}
                onChange={(event) => onCheckboxChange(event.target.checked, Matching.Options.caseinsensitive)}
            />

            <Checkbox
                label="Match text"
                checked={isChecked(Matching.Options.matchtext)}
                onChange={(event) => onCheckboxChange(event.target.checked, Matching.Options.matchtext)}
            />

            <Checkbox
                label="Use url query params"
                checked={isChecked(Matching.Options.usequery)}
                onChange={(event) => onCheckboxChange(event.target.checked, Matching.Options.usequery)}
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
