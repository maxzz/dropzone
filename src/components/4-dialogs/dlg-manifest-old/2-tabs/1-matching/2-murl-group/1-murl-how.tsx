import { useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Matching } from "@/store/manifest";
import { type UrlsEditorDataAtom } from "../0-all";
import { RadioGroupTooltips } from "./7-ui-radio-group-tooltips";
import { MatchingCheckboxes } from "./7-ui-matching-checkboxes";
import { MatchUrlInput } from "./5-match-url-input";
import { FinalMatchUrl } from "./6-final-match-url";
import { setUrlsEditorDataAtom } from "../0-all/7-set-atoms";
import { MatchUrlInputLabel } from "./5-match-url-caption";

export function MatchHow({ urlsEditorDataAtom }: { urlsEditorDataAtom: UrlsEditorDataAtom; }) {
    const [errorHint, setErrorHint] = useState(''); // 'This pattern is not valid'

    const urlsEditorData = useAtomValue(urlsEditorDataAtom);
    
    const o = useAtomValue(urlsEditorData.oAtom);
    const m = useAtomValue(urlsEditorData.mAtom);
    const q = useAtomValue(urlsEditorData.qAtom);
    const how = useAtomValue(urlsEditorData.howAtom);
    const opt = useAtomValue(urlsEditorData.optAtom);
    const url = useAtomValue(urlsEditorData.urlAtom);

    const setUrlsEditorData = useSetAtom(setUrlsEditorDataAtom);


    const [urls, setUrls] = useAtom(urlsEditorDataAtom);
    const setIsChanged = useSetAtom(urls.isChangedAtom);

    function onChangeHow(v: Matching.How) {
        setUrlsEditorData({ urlsEditorDataAtom, how: v });
    }

    function isOptionChecked(option: Matching.Options) {
        return (opt & option) !== 0;
    }

    function onOptionChange(checked: boolean, changedOption: Matching.Options) {
        let opt2 = checked ? opt | changedOption : opt & ~changedOption;
        setUrlsEditorData({ urlsEditorDataAtom, opt: opt2 });
    }

    function onUrlChange(url: string) {
        setUrlsEditorData({ urlsEditorDataAtom, url });
    }

    const disabled = how === Matching.How.undef;

    return (<>
        <div className="flex space-x-4">
            {/* How match radio buttons */}
            <RadioGroupTooltips value={how} setValue={onChangeHow} />

            {/* Match case: show only for legacy manifests to allow reset this to none */}
            {!!urlsEditorData.fromFileMatchData.opt && (
                <MatchingCheckboxes isChecked={isOptionChecked} onCheckboxChange={onOptionChange} />
            )}
        </div>

        <MatchUrlInputLabel how={how} disabled={disabled} />
        <MatchUrlInput rawUrl={url} title={m} onUrlChange={onUrlChange} errorHint={errorHint} disabled={disabled} />

        <FinalMatchUrl url={m} />
    </>);
}
