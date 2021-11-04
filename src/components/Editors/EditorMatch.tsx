import React from 'react';

function MatchRow({ label, type = "radio", group, idx = 0 }: { label: string; type?: string; group?: string; idx?: number; }) {
    return (
        <label className="h-7 flex items-center space-x-1">
            <input type={type} {...(group && { name: group })} />
            <div>{label}</div>
        </label>
    );
}

function MatchTo() {
    return (
        <div className="flex flex-col">
            <MatchRow group={"how"} idx={0} label="Do not match" />
            <MatchRow group={"how"} idx={1} label="String match" />
            <MatchRow group={"how"} idx={2} label="Wildcard match" />
            <MatchRow group={"how"} idx={3} label="Regular expresssion" />
            <MatchRow group={"how"} idx={4} label="No domain match" />
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
                    <div className="flex flex-col">
                        <MatchRow label="Case sensitive" type="checkbox" />
                    </div>

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
