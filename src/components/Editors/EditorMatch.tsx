import React from 'react';
import { FileUsAtom } from '../../store/store';

function RadioButton({ label, type = "radio", group, val = 0, checked }: { label: string; type?: string; group?: string; val?: number; checked: boolean; }) {
    return (
        <label className="h-6 flex items-center space-x-1.5">
            <input type={type} {...(group && { name: group })} value={val} defaultChecked={checked} />
            <div >{label}</div>
        </label>
    );
}

function RadioGroup() {
    const [value, setValue] = React.useState(3);
    return (
        <div
            className="mt-2 px-3 py-2 max-w-max flex flex-col space-y-1 border border-gray-300 rounded"
            onChange={(v: React.ChangeEvent<HTMLInputElement>) => setValue(+v.target.value)}
        >
            <RadioButton group={"how"} val={1} checked={value === 1} label="Do not match" />
            <RadioButton group={"how"} val={2} checked={value === 2} label="String match" />
            <RadioButton group={"how"} val={3} checked={value === 3} label="Wildcard match" />
            <RadioButton group={"how"} val={4} checked={value === 4} label="Regular expresssion" />
            <RadioButton group={"how"} val={5} checked={value === 5} label="No domain match" />
        </div>
    );
}

export function MatchWeb({ fileUsAtom, setShow = (v: boolean) => { } }: { fileUsAtom: FileUsAtom; setShow?: (v: boolean) => void; }) {
    const firstFocusRef = React.useRef<HTMLInputElement>(null);
    // React.useEffect(() => { firstFocusRef.current?.focus(); }, []);

    const [checked, setChecked] = React.useState(true);
    return (
        <div className="p-4">

            <div className="flex flex-col">
                <div className="mb-1">Website url to match</div>
                <input ref={firstFocusRef} className="px-2 py-1 w-full border border-gray-400 rounded shadow-inner" />

                <RadioGroup />

                <label className="mt-2 h-6 flex items-center space-x-1">
                    <input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
                    <div>Case sensitive</div>
                </label>

                <div className="mt-2 mb-4 w-full border-t border-gray-300" />

                <div className="mt-2 mb-1">Website original url</div>
                <input className="px-2 py-1 w-full border border-gray-400 rounded shadow-inner" />

                <div className="mt-2 mb-1">Quicklink url</div>
                <input className="px-2 py-1 w-full border border-gray-400 rounded shadow-inner" />

            </div>
        </div>
    );
}

export function MatchWindows({ fileUsAtom, setShow = (v: boolean) => { } }: { fileUsAtom: FileUsAtom; setShow?: (v: boolean) => void; }) {
    return (
        <div className="p-4">Windows match comming soon...</div>
    );
}