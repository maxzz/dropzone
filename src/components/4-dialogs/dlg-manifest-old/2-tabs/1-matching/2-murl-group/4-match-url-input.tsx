import { Matching } from '@/store/manifest';
import { classNames } from '@/utils';
import { MatchWebState } from '../0-all';

type MatchUrlInputProps = {
    rawMD: Matching.RawMatchData;
    urls: MatchWebState;
    setUrls: (urls: MatchWebState) => void;
    errorHint: string;
    disabled: boolean;
};

export function MatchUrlInput({ rawMD, urls, setUrls, errorHint, disabled }: MatchUrlInputProps) {
    return (<>
        <div className={`mt-1 mb-1 ${disabled ? 'opacity-50' : ''}`}>
            {messageStyle(rawMD.style)}
        </div>

        <input
            className={classNames(
                "px-2 py-1.5 w-full border rounded shadow-inner", errorHint ? 'border-red-400' : 'border-gray-400', disabled && 'opacity-50'
            )}
            {...(errorHint && { title: errorHint })}
            disabled={disabled}
            spellCheck={false}
            title={urls.m}
            value={rawMD.url}
            onChange={(e) => setUrls({ ...urls, m: Matching.makeRawMatchData({ ...rawMD, url: e.target.value }, urls.o) })}
        />
    </>);
}

function messageStyle(style: Matching.Style) {
    const names = [
        "Original url",
        "Match only domain of original url",
        "Wildcard string",
        "Regular expresssion",
        (<>
            Match original url <span className="text-xs">(url params will be ignored)</span>
        </>), // without params
    ];
    return names[style] || 'No way';
}
