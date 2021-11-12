import React from 'react';
import { useAtom, WritableAtom } from 'jotai';
import { a, useSpring } from '@react-spring/web';
import { EditorData, formEditorDataAtom } from '../../store/store';
import atomWithCallback from '../../hooks/atomsX';
import { classNames } from '../../utils/classnames';
import { Matching } from '../../store/manifest/mani-i';

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
            className="mt-2 px-3 py-2 max-w-max flex flex-col space-y-1 border border-gray-300 rounded"
            onChange={(v: React.ChangeEvent<HTMLInputElement>) => setValue(+v.target.value)}
        >
            {/* <RadioButton groupName={"how"} value={0} checked={value === 0} label="String match" /> */}
            <RadioButton groupName={"how"} value={1} checked={value === 1} label="Match domain from original url" />
            <RadioButton groupName={"how"} value={2} checked={value === 2} label="Wildcard match" />
            <RadioButton groupName={"how"} value={3} checked={value === 3} label="Regular expresssion" />
            <RadioButton groupName={"how"} value={4} checked={value === 4} label="No domain match" title="Exclude this login from domain match" />
        </div>
    );
}

function MatchHow({ murlAtom }: { murlAtom: WritableAtom<string, string>; }) {
    const [murl, setMurl] = useAtom(murlAtom);
    const [errorHint, setErrorHint] = React.useState(''); // 'This pattern is not valid'
    const [raw, setRaw] = React.useState<Matching.RawMatchData>(Matching.getMatchRawData(murl));
    React.useEffect(() => {
        const newRaw = Matching.getMatchRawData(murl);

        console.log('newRaw', newRaw);

        setRaw(newRaw);
    }, [murl]);

    console.log('raw', raw);

    return (
        <>
            <input
                className={classNames("px-2 py-1.5 w-full border rounded shadow-inner", errorHint ? 'border-red-400' : 'border-gray-400',)}
                {...(errorHint && { title: errorHint })}
                spellCheck={false}
                value={murl} onChange={(e) => setMurl(e.target.value)}
            />
            <div className="flex space-x-4">
                {/* How match radio buttons */}
                <RadioGroup value={raw.style} setValue={(v: number) => setRaw(prev => ({ ...prev, style: v }))} />

                {/* Match case */}
                <label className="mt-1 h-6 flex items-center space-x-1">
                    <input type="checkbox" className="rounded focus:ring-indigo-500 focus:ring-offset-0"
                        checked={(raw.opt & Matching.Options.caseinsensitive) !== 0}
                        onChange={(event) => {
                            setRaw(prev => ({ ...prev, opt: event.target.checked ? prev.opt | Matching.Options.caseinsensitive : prev.opt & ~Matching.Options.caseinsensitive }));
                        }}
                    />
                    <div>Case sensitive</div>
                </label>
            </div>
        </>
    );
}

function MurlGroup({ maniMurl }: { maniMurl: string; }) {
    const [sameMurl, setSameMurl] = React.useState(true);
    const stylesHow = useSpring({ height: !sameMurl ? 'auto' : 0, opacity: !sameMurl ? 1 : 0, config: { duration: 200 } });

    const [murlAtom] = React.useState(atomWithCallback(maniMurl, ({ nextValue }) => {
        console.log('updated', nextValue);
    }));
    return (
        <>
            <div className="mt-6 mb-1 flex items-center">
                <div className="w-28 font-bold text-gray-600">Matching url</div>
                <label className="h-6 flex items-center space-x-1">
                    <input
                        className="rounded focus:ring-indigo-500 focus:ring-offset-0"
                        type="checkbox"
                        checked={sameMurl} onChange={(event) => setSameMurl(event.target.checked)}
                    />
                    <div>same as original url</div>
                </label>
            </div>

            {!sameMurl &&
                <a.div style={stylesHow}>
                    <MatchHow murlAtom={murlAtom} />
                </a.div>
            }
        </>
    );
}

function OurlGroup({ maniOurl }: { maniOurl: string; }) {
    const firstFocusRef = React.useRef<HTMLInputElement>(null);
    // React.useEffect(() => { firstFocusRef.current?.focus(); }, []);
    return (<>
        <div className="mb-1 font-bold text-gray-600">Original url</div>
        <input ref={firstFocusRef} className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner" spellCheck={false} value={maniOurl} readOnly />
    </>);
}

function QurlGroup({ maniQurl }: { maniQurl: string; }) {
    const [sameQurl, setSameQurl] = React.useState(true);
    const stylesQL = useSpring({ height: !sameQurl ? 'auto' : 0, opacity: !sameQurl ? 1 : 0, config: { duration: 200 } });
    return (
        <>
            <div className="mt-6 mb-1 flex items-center">
                <div className="w-28 font-bold text-gray-600">Quicklink url</div>
                <label className="h-6 flex items-center space-x-1">
                    <input
                        className="rounded focus:ring-indigo-500 focus:ring-offset-0"
                        type="checkbox"
                        checked={sameQurl} onChange={(event) => setSameQurl(event.target.checked)}
                    />
                    <div>same as original url</div>
                </label>
            </div>

            {!sameQurl &&
                <a.div style={stylesQL} className="">
                    <input className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner" spellCheck={false} value={maniQurl} readOnly />
                </a.div>
            }
        </>
    );
}

type MatchWebProps = {
    urls: {
        o?: string;
        m?: string;
        q?: string;
    },
};

export function TabMatchWeb({ editorData }: { editorData: EditorData; }) {
    const [fileUs, setFileUs] = useAtom(editorData.fileUsAtom);
    const detection = fileUs.meta?.[editorData.formIdx]?.mani?.detection;

    const ourl = detection?.web_ourl || '';
    const murl = detection?.web_murl || '';
    const qurl = detection?.web_qurl || '';

    return (
        <div className="p-4">
            <div className="flex flex-col">
                <OurlGroup maniOurl={ourl} />
                {/* Separator */} {/* <div className="mt-2 mb-4 w-full border-t border-gray-300" /> */}
                <MurlGroup maniMurl={murl} />
                <QurlGroup maniQurl={qurl} />
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
