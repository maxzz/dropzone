import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { Matching } from "@/store/manifest";
import { type MatchWebStateAtom, areUrlsChanged } from "../0-all";
import { RadioGroupTooltips } from "./2-radio-group-tooltips";
import { MatchingCheckboxes } from "./3-matching-checkboxes";
import { MatchUrlInput } from "./4-match-url-input";
import { FinalMatchUrl } from "./5-final-match-url";

export function MatchHow({ urlsAtom, initialMD }: { urlsAtom: MatchWebStateAtom; initialMD: Matching.RawMatchData; }) {
    const [urls, setUrls] = useAtom(urlsAtom);
    const setIsChanged = useSetAtom(urls.isChangedAtom);

    const [errorHint, setErrorHint] = useState(''); // 'This pattern is not valid'
    const [rawMD, setRawMD] = useState<Matching.RawMatchData>(initialMD);

    useEffect(
        () => {
            setRawMD(Matching.parseRawMatchData(urls.current.m));
        }, [urls.current.m]
    );

    useEffect(
        () => {
            if (rawMD.how === Matching.How.undef) {
                const newState = { ...urls, current: { ...urls.current, m: urls.current.o } };
                setUrls(newState);
                setIsChanged(areUrlsChanged(newState));
            }
        }, [urls.current.o]
    );

    function setSelectedMatch(v: Matching.How) {
        const newState = { ...urls, current: { ...urls.current, m: Matching.stringifyRawMatchData({ ...rawMD, how: v, }, urls.current.o) } };
        setUrls(newState);
        setIsChanged(areUrlsChanged(newState));
    }

    const disabled = rawMD.how === Matching.How.undef;

    return (<>
        <div className="flex space-x-4">
            {/* How match radio buttons */}
            <RadioGroupTooltips value={rawMD.how} setValue={setSelectedMatch} />

            {/* Match case: show only for legacy manifests to allow reset this to none */}
            {!!initialMD.opt && (
                <MatchingCheckboxes rawMD={rawMD} urls={urls} setUrls={setUrls} setDirty={setIsChanged} />
            )}
        </div>

        <MatchUrlInput rawMD={rawMD} urls={urls} setUrls={setUrls} errorHint={errorHint} disabled={disabled} />
        <FinalMatchUrl urls={urls} />
    </>);
}
