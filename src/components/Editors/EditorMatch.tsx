import React from 'react';

function MatchRow({ label, type = "radio", group, val = 0, checked }:
    { label: string; type?: string; group?: string; val?: number; checked: boolean; }) {
    return (
        <label className="h-7 flex items-center space-x-1">
            <input type={type} {...(group && { name: group })} value={val} defaultChecked={checked} />
            <div>{label}</div>
        </label>
    );
}

function MatchTo() {
    const [value, setValue] = React.useState(3);
    console.log({ value });

    return (
        <div className="flex flex-col"
            onChange={(v: React.ChangeEvent<HTMLInputElement>) => {
                console.log({ group: v.target.value });
                setValue(+v.target.value);
            }}>
            <MatchRow group={"how"} val={1} checked={(console.log('aaa_1', value, value === 1), value === 1)} label="Do not match" />
            <MatchRow group={"how"} val={2} checked={(console.log('aaa_2', value, value === 2), value === 2)} label="String match" />
            <MatchRow group={"how"} val={3} checked={(console.log('aaa_3', value, value === 3), value === 3)} label="Wildcard match" />
            <MatchRow group={"how"} val={4} checked={(console.log('aaa_4', value, value === 4), value === 4)} label="Regular expresssion" />
            <MatchRow group={"how"} val={5} checked={(console.log('aaa_5', value, value === 5), value === 5)} label="No domain match" />
        </div>
    );
}

export default function EditorMatch({ atom, setShow = (v: boolean) => { } }: { atom: number; setShow?: (v: boolean) => void; }) {
    const firstFocusRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => { firstFocusRef.current?.focus(); }, []);
    return (
        <div className="py-4 text-sm">
            <h4 className="px-4 py-2 text-base font-bold">URL matching</h4>

            <div className="px-4">
                <div className="flex flex-col space-y-1">
                    <div className="">Matching URL</div>
                    <input ref={firstFocusRef} className="px-2 py-1 w-full border border-gray-400 rounded shadow-inner" />

                    <MatchTo />
                    {/* <div className="flex flex-col">
                        <MatchRow label="Case sensitive" type="checkbox" />
                    </div> */}

                    <div className="">Quicklink URL</div>
                    <input className="px-2 py-1 w-full border border-gray-400 rounded shadow-inner" />

                    <div className="">Original URL</div>
                    <input className="px-2 py-1 w-full border border-gray-400 rounded shadow-inner" />
                </div>

                <div className="!mt-4 flex justify-end space-x-2">
                    <button className="px-4 py-2 min-w-[5rem] h-8 leading-4 text-gray-200 bg-gray-600 rounded" onClick={() => setShow(false)}>OK</button>
                    <button className="px-4 py-2 min-w-[5rem] h-8 leading-4 text-gray-200 bg-gray-600 rounded" onClick={() => setShow(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
