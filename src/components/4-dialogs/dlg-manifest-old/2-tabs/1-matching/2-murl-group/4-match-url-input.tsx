import { classNames } from "@/utils";
import { Matching } from "@/store/manifest";

type MatchUrlInputProps = {
    rawUrl: string;
    how: Matching.How;
    url: string;
    onUrlChange: OnUrlChange;
    errorHint: string;
    disabled: boolean;
};

type OnUrlChange = (value: string) => void;

export function MatchUrlInput({ rawUrl, how, url, onUrlChange, errorHint, disabled }: MatchUrlInputProps) {
    return (
        <input
            className={classNames("px-2 py-1.5 w-full border rounded shadow-inner", errorHint ? 'border-red-400' : 'border-gray-400', disabled && 'opacity-50')}
            spellCheck={false}
            title={url}
            value={rawUrl}
            onChange={(event) => onUrlChange(event.target.value)}
            
            disabled={disabled} // TODO: we may hide this input
            {...(errorHint && { title: errorHint })} // TODO: this should not be here
        />
    );
}
