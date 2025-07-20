import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { Matching } from "@/store/manifest";
import { type MatchWebStateAtom, areUrlsChanged } from "../0-all";
import { RadioGroupTooltips } from "./7-ui-radio-group-tooltips";
import { MatchingCheckboxes } from "./7-ui-matching-checkboxes";
import { MatchUrlInput } from "./4-match-url-input";
import { FinalMatchUrl } from "./5-final-match-url";
import { setUrlsAtom } from "../0-all/7-set-atoms";

export function MatchHow({ urlsAtom, initialMD }: { urlsAtom: MatchWebStateAtom; initialMD: Matching.RawMatchData; }) {
    const [urls, setUrls] = useAtom(urlsAtom);
    const setIsChanged = useSetAtom(urls.isChangedAtom);

    const [errorHint, setErrorHint] = useState(''); // 'This pattern is not valid'
    const [rawMD, setRawMD] = useState<Matching.RawMatchData>(initialMD);

    const setUrls2 = useSetAtom(setUrlsAtom);

    useEffect(
        () => {
            setRawMD(Matching.parseRawMatchData(urls.current.m));
        }, [urls.current.m]
    );

    useEffect(
        () => {
            if (rawMD.how === Matching.How.undef) {
                setUrls2({ editorUrlsAtom: urlsAtom, m: urls.current.o });

                // const newState = { ...urls, current: { ...urls.current, m: urls.current.o } };
                // setUrls(newState);
                // setIsChanged(areUrlsChanged(newState));
            }
        }, [urls.current.o]
    );

    function onChangeHow(v: Matching.How) {
        const newState = { ...urls, current: { ...urls.current, m: Matching.stringifyRawMatchData({ ...rawMD, how: v, }, urls.current.o) } };
        setUrls(newState);
        setIsChanged(areUrlsChanged(newState));
    }

    function isOptionChecked(option: Matching.Options) {
        return (rawMD.opt & option) !== 0;
    }

    function onOptionChange(checked: boolean, changedOption: Matching.Options) {
        let opt = checked ? rawMD.opt | changedOption : rawMD.opt & ~changedOption;
        const newState = { ...urls, current: { ...urls.current, m: Matching.stringifyRawMatchData({ ...rawMD, opt }, urls.current.o) } };
        setUrls(newState);
        setIsChanged(areUrlsChanged(newState));
    }

    const disabled = rawMD.how === Matching.How.undef;

    return (<>
        <div className="flex space-x-4">
            {/* How match radio buttons */}
            <RadioGroupTooltips value={rawMD.how} setValue={onChangeHow} />

            {/* Match case: show only for legacy manifests to allow reset this to none */}
            {!!initialMD.opt && (
                <MatchingCheckboxes isChecked={isOptionChecked} onCheckboxChange={onOptionChange} />
            )}
        </div>

        <MatchUrlInput rawMD={rawMD} urls={urls} setUrls={setUrls} errorHint={errorHint} disabled={disabled} />
        <FinalMatchUrl urls={urls} />
    </>);
}
