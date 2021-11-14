import React from 'react';
import { atom, PrimitiveAtom, useAtom, WritableAtom } from 'jotai';
import { a, useSpring } from '@react-spring/web';
import { EditorData, formEditorDataAtom } from '../../store/store';
import atomWithCallback from '../../hooks/atomsX';
import { classNames } from '../../utils/classnames';
import { Matching } from '../../store/manifest/mani-i';
import UIUpDownIcon from '../UI/UIUpDownIcon';
import { useAtomValue } from 'jotai/utils';

type RadioButtonProps = {
    label: string;
    groupName?: string;
    value?: number;
    checked: boolean;
} & React.HTMLAttributes<HTMLLabelElement>;

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
            onChange={(v: React.ChangeEvent<HTMLInputElement>) => setValue(+v.target.value)}
        >
            <RadioButton groupName={"how"} value={0} checked={value === 0} label="Same as original url" />
            <RadioButton groupName={"how"} value={1} checked={value === 1} label="Match domain from original url" />
            <RadioButton groupName={"how"} value={2} checked={value === 2} label="Wildcard match" />
            <RadioButton groupName={"how"} value={3} checked={value === 3} label="Regular expresssion" />
            <RadioButton groupName={"how"} value={4} checked={value === 4} label="No domain match" title="Exclude this login from domain match" />
        </div>
    );
}

function MatchHow({ urlsAtom }: { urlsAtom: MatchWebStateAtom; }) {
    const [urls, setUrls] = useAtom(urlsAtom);
    const [dirty, setDirty] = useAtom(urls.dirtyAtom);
    const [initialMD] = React.useState<Matching.RawMatchData>(Matching.getMatchRawData(urls.m));
    const [rawMD, setRawMD] = React.useState<Matching.RawMatchData>(initialMD);
    React.useEffect(() => setRawMD(Matching.getMatchRawData(urls.m)), [urls]);
    const [errorHint, setErrorHint] = React.useState(''); // 'This pattern is not valid'
    return (<>
        <div className="flex space-x-4">
            {/* How match radio buttons */}
            <RadioGroup
                value={rawMD.style}
                setValue={(v: number) => setUrls({ ...urls, m: Matching.makeRawMatchData({ ...rawMD, style: v, }, urls.o) })}
            />

            {/* Match case: show only for legacy manifests to allow reset this to none */}
            {!!initialMD.opt &&
                <div>
                    <label className="mt-1 h-6 flex items-center space-x-1">
                        <input type="checkbox" className="rounded focus:ring-indigo-500 focus:ring-offset-0"
                            checked={(rawMD.opt & Matching.Options.caseinsensitive) !== 0}
                            onChange={(event) => {
                                let opt = event.target.checked ? rawMD.opt | Matching.Options.caseinsensitive : rawMD.opt & ~Matching.Options.caseinsensitive;
                                setUrls({ ...urls, m: Matching.makeRawMatchData({ ...rawMD, opt }, urls.o) });
                                if (!dirty && urls.m !== urls.initial.m) {
                                    setDirty(true);
                                }
                            }}
                        />
                        <div>Case sensitive</div>
                    </label>
                    <label className="mt-1 h-6 flex items-center space-x-1">
                        <input type="checkbox" className="rounded focus:ring-indigo-500 focus:ring-offset-0"
                            checked={(rawMD.opt & Matching.Options.matchtext) !== 0}
                            onChange={(event) => {
                                let opt = event.target.checked ? rawMD.opt | Matching.Options.matchtext : rawMD.opt & ~Matching.Options.matchtext;
                                setUrls({ ...urls, m: Matching.makeRawMatchData({ ...rawMD, opt }, urls.o) });
                            }}
                        />
                        <div>Match text</div>
                    </label>
                </div>
            }
        </div>
        <div className="mt-1 mb-1">Name</div>
        <input
            className={classNames("px-2 py-1.5 w-full border rounded shadow-inner", errorHint ? 'border-red-400' : 'border-gray-400',)}
            {...(errorHint && { title: errorHint })}
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
    const [sameMurl, setSameMurl] = React.useState(true);
    const stylesHow = useSpring({ height: !sameMurl ? 'auto' : 0, opacity: !sameMurl ? 1 : 0, config: { duration: 200 } });
    return (<>
        <div className="mt-6 mb-1 flex items-center">
            <div className="w-28 font-bold text-gray-600 flex items-center space-x-1" onClick={() => setSameMurl(!sameMurl)}>
                <div className="">Matching url</div>
                <UIUpDownIcon double={true} open={sameMurl} className="w-5 h-5 border rounded" />
            </div>

            <label className="h-6 flex items-center text-xs">
                <div className="ml-5">same as original url</div>
            </label>
        </div>

        {!sameMurl &&
            <a.div style={stylesHow}>
                <MatchHow urlsAtom={urlsAtom} />
            </a.div>
        }
    </>);
}

function OurlGroup({ urlsAtom }: { urlsAtom: MatchWebStateAtom; }) {
    const [urls, setUrls] = useAtom(urlsAtom);
    const firstFocusRef = React.useRef<HTMLInputElement>(null);
    // React.useEffect(() => { firstFocusRef.current?.focus(); }, []);
    return (<>
        <div className="mb-1 font-bold text-gray-600">Original url</div>
        <input ref={firstFocusRef}
            className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
            spellCheck={false}
            value={urls.o} readOnly
        />
    </>);
}

function QurlGroup({ urlsAtom }: { urlsAtom: MatchWebStateAtom; }) {
    const [urls, setUrls] = useAtom(urlsAtom);

    const [sameQurl, setSameQurl] = React.useState(true);
    const stylesQL = useSpring({ height: !sameQurl ? 'auto' : 0, opacity: !sameQurl ? 1 : 0, config: { duration: 200 } });

    return (
        <>
            <div className="mt-6 mb-1 flex items-center">
                <div className="w-28 font-bold text-gray-600">Quicklink url</div>
                <label className="h-6 flex items-center space-x-1">
                    <input
                        type="checkbox"
                        className="rounded focus:ring-indigo-500 focus:ring-offset-0"
                        checked={sameQurl} onChange={(event) => setSameQurl(event.target.checked)}
                    />
                    <div>same as original url</div>
                </label>
            </div>

            {!sameQurl &&
                <a.div style={stylesQL} className="">
                    <input
                        className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
                        spellCheck={false}
                        value={urls.q} readOnly
                    />
                </a.div>
            }
        </>
    );
}

type UrlsState = {
    o: string;
    m: string;
    q: string;
};

type MatchWebState = UrlsState & {
    initial: UrlsState;
    dirtyAtom: PrimitiveAtom<boolean>;
};

type MatchWebStateAtom = WritableAtom<MatchWebState, MatchWebState>;

export function TabMatchWeb({ editorData }: { editorData: EditorData; }) {
    const fileUs = useAtomValue(editorData.fileUsAtom);
    const { web_ourl: o = '', web_murl: m = '', web_qurl: q = '' } = fileUs.meta?.[editorData.formIdx]?.mani?.detection || {};
    const initial = { o, m, q, };
    const [urlsAtom] = React.useState(atomWithCallback<MatchWebState>({...initial, initial, dirtyAtom: atom<boolean>(false)}, ({ nextValue }) => {
        console.log('updated', nextValue);
    }));

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

export function TabMatchWindows({ editorData }: { editorData: EditorData; }) {
    return (
        <div className="p-4">
            Windows match is comming soon...
        </div>
    );
}

function TabFieldsScript({ editorData }: { editorData: EditorData; }) {
    return (
        <div className="p-4">
            Windows form script fields editor is comming soon...
        </div>
    );
}

export function TabFields({ editorData }: { editorData: EditorData; }) {
    const [fileUs, setFileUs] = useAtom(editorData.fileUsAtom);
    const isScript = fileUs.meta?.[editorData.formIdx]?.disp.isScript;
    return (
        <>
            {isScript
                ? <TabFieldsScript editorData={editorData} />
                :
                <div className="p-4">
                    Web form fields editor is comming soon...
                </div>
            }
        </>
    );
}

//TODO: RadioButton: background-image: url(data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e);
//TODO: add checks for other urls: the same as original url
//test on: {cd2a9c44-f588-4010-ba99-9d3e58bf69cb}.dpm
