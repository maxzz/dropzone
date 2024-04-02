import React, { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { Matching } from '@/store/manifest';
import { classNames } from '@/utils';
import { RadioGroupTooltips } from './4-radio-group-tooltips';
import { MatchWebState, MatchWebStateAtom, urlsDirty } from '../4-0-urls-dirty';

export function MatchHow({ urlsAtom, initialMD }: { urlsAtom: MatchWebStateAtom; initialMD: Matching.RawMatchData; }) {
    const [urls, setUrls] = useAtom(urlsAtom);
    const setDirty = useSetAtom(urls.dirtyAtom);
    const [rawMD, setRawMD] = React.useState<Matching.RawMatchData>(initialMD);

    useEffect(
        () => {
            setRawMD(Matching.getMatchRawData(urls.m));
        }, [urls.m]
    );

    useEffect(
        () => {
            if (rawMD.style === Matching.Style.undef) {
                const newState = { ...urls, m: urls.o };
                setUrls(newState);
                setDirty(urlsDirty(newState));
            }
        }, [urls.o]
    );

    const [errorHint, setErrorHint] = useState(''); // 'This pattern is not valid'
    const disabled = rawMD.style === Matching.Style.undef;

    return (<>
        <div className="flex space-x-4">
            {/* How match radio buttons */}
            <RadioGroupTooltips
                value={rawMD.style}
                setValue={(v: number) => {
                    const newState = { ...urls, m: Matching.makeRawMatchData({ ...rawMD, style: v, }, urls.o) };
                    setUrls(newState);
                    setDirty(urlsDirty(newState));
                }}
            />

            {/* Match case: show only for legacy manifests to allow reset this to none */}
            {!!initialMD.opt && (
                <MatchingCheckboxes rawMD={rawMD} urls={urls} setUrls={setUrls} setDirty={setDirty} />
            )}
        </div>

        <MatchUrlInput rawMD={rawMD} urls={urls} setUrls={setUrls} errorHint={errorHint} disabled={disabled} />
        <FinalMatchUrl urls={urls} />
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

function MatchingCheckboxes({ rawMD, urls, setUrls, setDirty }: { rawMD: Matching.RawMatchData; urls: MatchWebState; setUrls: (urls: MatchWebState) => void; setDirty: (dirty: boolean) => void; }) {
    return (
        <div>
            <Checkbox
                label="Case sensitive"
                checked={(rawMD.opt & Matching.Options.caseinsensitive) !== 0}
                onChange={(event) => {
                    let opt = event.target.checked ? rawMD.opt | Matching.Options.caseinsensitive : rawMD.opt & ~Matching.Options.caseinsensitive;
                    const newState = { ...urls, m: Matching.makeRawMatchData({ ...rawMD, opt }, urls.o) };
                    setUrls(newState);
                    setDirty(urlsDirty(newState));
                }}
            />

            <Checkbox
                label="Match text"
                checked={(rawMD.opt & Matching.Options.matchtext) !== 0}
                onChange={(event) => {
                    let opt = event.target.checked ? rawMD.opt | Matching.Options.matchtext : rawMD.opt & ~Matching.Options.matchtext;
                    const newState = { ...urls, m: Matching.makeRawMatchData({ ...rawMD, opt }, urls.o) };
                    setUrls(newState);
                    setDirty(urlsDirty(newState));
                }}
            />

            <Checkbox
                label="Use url query params"
                checked={(rawMD.opt & Matching.Options.usequery) !== 0}
                onChange={(event) => {
                    let opt = event.target.checked ? rawMD.opt | Matching.Options.usequery : rawMD.opt & ~Matching.Options.usequery;
                    const newState = { ...urls, m: Matching.makeRawMatchData({ ...rawMD, opt }, urls.o) };
                    setUrls(newState);
                    setDirty(urlsDirty(newState));
                }}
            />
        </div>
    );
}

type MatchUrlInputProps = {
    rawMD: Matching.RawMatchData;
    urls: MatchWebState;
    setUrls: (urls: MatchWebState) => void;
    errorHint: string;
    disabled: boolean;
};

function MatchUrlInput({ rawMD, urls, setUrls, errorHint, disabled }: MatchUrlInputProps) {
    return (<>
        <div className={`mt-1 mb-1 ${disabled ? 'opacity-50' : ''}`}>
            {messageStyle(rawMD.style)}
        </div>

        <input
            className={classNames(
                "px-2 py-1.5 w-full border rounded shadow-inner",
                errorHint ? 'border-red-400' : 'border-gray-400',
                disabled ? 'opacity-50' : ''
            )}
            {...(errorHint && { title: errorHint })}
            disabled={disabled}
            spellCheck={false}
            value={rawMD.url}
            title={urls.m}
            onChange={(e) => setUrls({ ...urls, m: Matching.makeRawMatchData({ ...rawMD, url: e.target.value }, urls.o) })}
        />
    </>);
}

function FinalMatchUrl({ urls }: { urls: MatchWebState; }) {
    return (
        <div className="mt-3 px-2 pt-2 text-[.65rem] bg-yellow-100 border border-yellow-400 rounded-sm cursor-default" title="This is how url will be stored">
            <div className="-mt-4 ">
                <span className="px-1 bg-yellow-200 border border-yellow-500 rounded-sm select-none">
                    Final raw format
                </span>
            </div>

            <div className="overflow-x-auto break-all">
                {urls.m}
            </div>
        </div>
    );
}
