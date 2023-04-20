import React, { ChangeEvent, HTMLAttributes, useEffect, useState } from 'react';
import { PrimitiveAtom, useAtom, useAtomValue, useSetAtom, WritableAtom } from 'jotai';
import { Matching } from '@/store/manifest';
import { a, useSpring } from '@react-spring/web';
import { UIIconUpDown } from '@ui/icons/UIIconUpDown';
import { UITip, tipSmall } from '@ui/UITooltip';
import { classNames } from '@/utils';

type RadioButtonProps = {
    label: string;
    groupName?: string;
    value?: number;
    checked: boolean;
} & HTMLAttributes<HTMLLabelElement>;

function RadioButton({ label, groupName, value, checked, ...rest }: RadioButtonProps) {
    return (
        <label className="h-6 flex items-center space-x-1.5" {...rest}>
            <input
                className="w-3 h-3 checked:bg-gray-400 focus:ring-indigo-500 focus:ring-offset-0"
                type="radio"
                value={value}
                defaultChecked={checked}
                {...(groupName && { name: groupName })}
            />
            <div >{label}</div>
        </label>
    );
}

function RadioGroup({ value, setValue }: { value: number, setValue: (v: number) => void; }) {
    return (
        <div
            className="px-3 py-2 max-w-max flex flex-col space-y-1 border border-gray-300 rounded"
            onChange={(v: ChangeEvent<HTMLInputElement>) => setValue(+v.target.value)}
        >
            <UITip trigger={<RadioButton groupName={"how"} value={0} checked={value === 0} label="Same as original url" />} {...tipSmall()}>
                <div className="text-xs">Same as original url</div>
            </UITip>

            <UITip trigger={<RadioButton groupName={"how"} value={1} checked={value === 1} label="Match only domain of original url" />} {...tipSmall()}>
                <div className="text-xs">Match only domain of original url</div>
            </UITip>

            <UITip trigger={<RadioButton groupName={"how"} value={2} checked={value === 2} label="Wildcard match" />} {...tipSmall()}>
                <div className="text-xs">Wildcard match</div>
            </UITip>

            <UITip trigger={<RadioButton groupName={"how"} value={3} checked={value === 3} label="Regular expresssion" />} {...tipSmall()}>
                <div className="text-xs">Regular expresssion</div>
            </UITip>

            <UITip trigger={<RadioButton groupName={"how"} value={4} checked={value === 4} label="No domain match" />} {...tipSmall()}>
                <div className="text-xs">Exclude this login from domain match</div>
            </UITip>
        </div>
    );
}

function messageStyle(style: Matching.Style) {
    const names = [
        "Original url",
        "Match only domain of original url",
        "Wildcard string",
        "Regular expresssion",
        <>Match original url <span className="text-xs">(url params will be ignored)</span></>, // without params
    ];
    return names[style] || 'No way';
}

function MatchHow({ urlsAtom, initialMD }: { urlsAtom: MatchWebStateAtom; initialMD: Matching.RawMatchData; }) {
    const [urls, setUrls] = useAtom(urlsAtom);
    const setDirty = useSetAtom(urls.dirtyAtom);
    const [rawMD, setRawMD] = React.useState<Matching.RawMatchData>(initialMD);
    useEffect(() => {
        setRawMD(Matching.getMatchRawData(urls.m));
    }, [urls.m]);
    useEffect(() => {
        if (rawMD.style === Matching.Style.undef) {
            const newState = { ...urls, m: urls.o };
            setUrls(newState);
            setDirty(urlsDirty(newState));
        }
    }, [urls.o]);
    const [errorHint, setErrorHint] = useState(''); // 'This pattern is not valid'
    const disabled = rawMD.style === Matching.Style.undef;
    return (<>
        <div className="flex space-x-4">
            {/* How match radio buttons */}
            <RadioGroup
                value={rawMD.style}
                setValue={(v: number) => {
                    const newState = { ...urls, m: Matching.makeRawMatchData({ ...rawMD, style: v, }, urls.o) };
                    setUrls(newState);
                    setDirty(urlsDirty(newState));
                }}
            />

            {/* Match case: show only for legacy manifests to allow reset this to none */}
            {!!initialMD.opt &&
                <div>
                    <label className="mt-1 h-6 flex items-center space-x-1">
                        <input type="checkbox" className="rounded focus:ring-indigo-500 focus:ring-offset-0"
                            checked={(rawMD.opt & Matching.Options.caseinsensitive) !== 0}
                            onChange={(event) => {
                                let opt = event.target.checked ? rawMD.opt | Matching.Options.caseinsensitive : rawMD.opt & ~Matching.Options.caseinsensitive;
                                const newState = { ...urls, m: Matching.makeRawMatchData({ ...rawMD, opt }, urls.o) };
                                setUrls(newState);
                                setDirty(urlsDirty(newState));
                            }}
                        />
                        <div>Case sensitive</div>
                    </label>
                    <label className="mt-1 h-6 flex items-center space-x-1">
                        <input type="checkbox" className="rounded focus:ring-indigo-500 focus:ring-offset-0"
                            checked={(rawMD.opt & Matching.Options.matchtext) !== 0}
                            onChange={(event) => {
                                let opt = event.target.checked ? rawMD.opt | Matching.Options.matchtext : rawMD.opt & ~Matching.Options.matchtext;
                                const newState = { ...urls, m: Matching.makeRawMatchData({ ...rawMD, opt }, urls.o) };
                                setUrls(newState);
                                setDirty(urlsDirty(newState));
                            }}
                        />
                        <div>Match text</div>
                    </label>


                    <label className="mt-1 h-6 flex items-center space-x-1">
                        <input type="checkbox" className="rounded focus:ring-indigo-500 focus:ring-offset-0"
                            checked={(rawMD.opt & Matching.Options.usequery) !== 0}
                            onChange={(event) => {
                                let opt = event.target.checked ? rawMD.opt | Matching.Options.usequery : rawMD.opt & ~Matching.Options.usequery;
                                const newState = { ...urls, m: Matching.makeRawMatchData({ ...rawMD, opt }, urls.o) };
                                setUrls(newState);
                                setDirty(urlsDirty(newState));
                            }}
                        />
                        <div>Use url query params</div>
                    </label>


                </div>
            }
        </div>
        <div className={`mt-1 mb-1 ${disabled ? 'opacity-50' : ''}`}>
            {messageStyle(rawMD.style)}
        </div>
        <input
            className={classNames(
                "px-2 py-1.5 w-full border rounded shadow-inner",
                errorHint ? 'border-red-400' : 'border-gray-400',
                disabled ? 'opacity-50' : '',
            )}
            {...(errorHint && { title: errorHint })}
            disabled={disabled}
            spellCheck={false}
            value={rawMD.url}
            title={urls.m}
            onChange={(e) => setUrls({ ...urls, m: Matching.makeRawMatchData({ ...rawMD, url: e.target.value }, urls.o) })}
        />
        <div className="mt-3 px-2 pt-2 text-[.65rem] bg-yellow-100 border border-yellow-400 rounded-sm cursor-default" title="This is how url will be stored">
            <div className="-mt-4 "><span className="px-1 bg-yellow-200 border border-yellow-500 rounded-sm select-none">Final raw format</span></div>
            <div className="overflow-x-auto break-all">{urls.m}</div>
        </div>
    </>);
}

function MurlGroup({ urlsAtom }: { urlsAtom: MatchWebStateAtom; }) {
    const urls = useAtomValue(urlsAtom);
    const [isOpen, setIsOpen] = useState(urls.o !== urls.m);
    const [initialMD] = useState<Matching.RawMatchData>(Matching.getMatchRawData(urls.m));
    const stylesDropdown = useSpring({ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0, config: { duration: 200 } });
    return (<>
        <div className="mt-6 mb-1 flex items-center">
            <div className="w-28 font-bold text-gray-600 flex items-center space-x-1" onClick={() => setIsOpen(!isOpen)}>
                <div className="">Matching url</div>
                <UIIconUpDown double={true} isUp={isOpen} className="w-5 h-5 border rounded" />
            </div>

            {urls.o === urls.m &&
                <label className="flex items-center text-xs">
                    <div className="ml-5">same as original url</div>
                </label>
            }
        </div>

        {isOpen &&
            <a.div style={stylesDropdown}>
                <MatchHow urlsAtom={urlsAtom} initialMD={initialMD} />
            </a.div>
        }
    </>);
}

function OurlGroup({ urlsAtom }: { urlsAtom: MatchWebStateAtom; }) {
    const [urls, setUrls] = useAtom(urlsAtom);
    const setDirty = useSetAtom(urls.dirtyAtom);
    return (<>
        <div className="mb-1 font-bold text-gray-600">Original url</div>
        <input
            className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
            spellCheck={false}
            value={urls.o}
            onChange={(event) => {
                const newState = { ...urls, o: event.target.value };
                setUrls(newState);
                setDirty(urlsDirty(newState));
            }}
        />
    </>);
}

function QurlGroup({ urlsAtom }: { urlsAtom: MatchWebStateAtom; }) {
    const [urls, setUrls] = useAtom(urlsAtom);
    const setDirty = useSetAtom(urls.dirtyAtom);
    const [isOpen, setIsOpen] = useState(false);
    const stylesDropdown = useSpring({ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0, config: { duration: 200 } });
    return (<>
        <div className="mt-6 mb-1 flex items-center">
            <div className="w-28 font-bold text-gray-600 flex items-center space-x-1" onClick={() => setIsOpen(!isOpen)}>
                <div className="">Quicklink url</div>
                <UIIconUpDown double={true} isUp={isOpen} className="w-5 h-5 border rounded" />
            </div>

            {urls.o === urls.q &&
                <label className="flex items-center text-xs">
                    <div className="ml-5">same as original url</div>
                </label>
            }
        </div>

        {isOpen &&
            <a.div style={stylesDropdown}>
                <input
                    className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
                    spellCheck={false}
                    value={urls.q}
                    onChange={(event) => {
                        const newState = { ...urls, q: event.target.value };
                        setUrls(newState);
                        setDirty(urlsDirty(newState));
                    }}
                />
            </a.div>
        }
    </>);
}

type UrlsState = {
    o: string;
    m: string;
    q: string;
};

export type MatchWebState = UrlsState & {
    initial: UrlsState;
    dirtyAtom: PrimitiveAtom<boolean>; // it should be not dirty but: is initial value?
};

export type MatchWebStateAtom = WritableAtom<MatchWebState, [MatchWebState], void>;

function urlsDirty(urls: MatchWebState): boolean {
    return urls.m !== urls.initial.m || urls.o !== urls.initial.o || urls.q !== urls.initial.q;
}

export function Tab1_MatchWeb({ urlsAtom }: { urlsAtom: MatchWebStateAtom; }) {
    return (
        <div className="p-4">
            <div className="grid grid-cols-1">
                <OurlGroup urlsAtom={urlsAtom} />
                {/* Separator */} {/* <div className="mt-2 mb-4 w-full border-t border-gray-300" /> */}
                <MurlGroup urlsAtom={urlsAtom} />
                <QurlGroup urlsAtom={urlsAtom} />
            </div>
        </div>
    );
}
