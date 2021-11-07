import React from 'react';
import { FileUsAtom } from '../../store/store';

function RadioButton({ label, type = "radio", group, val = 0, checked }: { label: string; type?: string; group?: string; val?: number; checked: boolean; }) {
    return (
        <label className="h-6 flex items-center space-x-1">
            <input type={type} {...(group && { name: group })} value={val} defaultChecked={checked} />
            <div>{label}</div>
        </label>
    );
}

function RadioGroup() {
    const [value, setValue] = React.useState(3);
    return (
        <div className="flex flex-col" onChange={(v: React.ChangeEvent<HTMLInputElement>) => setValue(+v.target.value)}>
            <RadioButton group={"how"} val={1} checked={value === 1} label="Do not match" />
            <RadioButton group={"how"} val={2} checked={value === 2} label="String match" />
            <RadioButton group={"how"} val={3} checked={value === 3} label="Wildcard match" />
            <RadioButton group={"how"} val={4} checked={value === 4} label="Regular expresssion" />
            <RadioButton group={"how"} val={5} checked={value === 5} label="No domain match" />
        </div>
    );
}

export default function EditorMatch({ atom, setShow = (v: boolean) => { } }: { atom: FileUsAtom; setShow?: (v: boolean) => void; }) {
    const firstFocusRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => { firstFocusRef.current?.focus(); }, []);

    const [checked, setChecked] = React.useState(true);
    return (
        <div className="py-4 text-sm">
            <h4 className="px-4 py-2 text-base font-bold">URL matching</h4>

            <div className="px-4">
                <div className="flex flex-col space-y-1">
                    <div className="">Matching URL</div>
                    <input ref={firstFocusRef} className="px-2 py-1 w-full border border-gray-400 rounded shadow-inner" />

                    <RadioGroup />

                    <label className="h-6 flex items-center space-x-1">
                        <input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
                        <div>Case sensitive</div>
                    </label>

                    <div className="">Quicklink URL</div>
                    <input className="px-2 py-1 w-full border border-gray-400 rounded shadow-inner" />

                    <div className="">Original URL</div>
                    <input className="px-2 py-1 w-full border border-gray-400 rounded shadow-inner" />
                </div>

                <div className="!mt-4 flex justify-end space-x-2">
                    <button className="px-4 py-2 min-w-[5rem] h-8 leading-4 text-gray-200 bg-gray-600 rounded"
                        onClick={() => {
                            setShow(false);
                        }}
                    >OK</button>
                    <button className="px-4 py-2 min-w-[5rem] h-8 leading-4 text-gray-200 bg-gray-600 rounded"
                        onClick={() => {
                            setShow(false);
                        }}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
}
