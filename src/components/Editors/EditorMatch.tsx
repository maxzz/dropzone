import { useAtom } from 'jotai';
import React from 'react';
import { FileUsAtom, formEditorDataAtom, FormEditorDataAtom } from '../../store/store';

type RadioButtonProps = {
    label: string;
    type?: string;
    group?: string;
    val?: number;
    checked: boolean;
} & React.HTMLAttributes<HTMLLabelElement>;

//background-image: url(data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e);

function RadioButton({ label, type = "radio", group, val = 0, checked, ...rest }: RadioButtonProps) {
    return (
        <label className="h-6 flex items-center space-x-1.5" {...rest}>
            <input
                className="w-3 h-3 checked:bg-gray-400 focus:ring-indigo-500 focus:ring-offset-0"
                type={type}
                value={val}
                defaultChecked={checked}
                {...(group && { name: group })}
            />
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
            {/* <RadioButton group={"how"} val={1} checked={value === 1} label="Do not match" /> */}
            <RadioButton group={"how"} val={2} checked={value === 2} label="String match" />
            <RadioButton group={"how"} val={3} checked={value === 3} label="Wildcard match" />
            <RadioButton group={"how"} val={4} checked={value === 4} label="Regular expresssion" />
            <RadioButton group={"how"} val={5} checked={value === 5} label="No domain match" title="Exclude this login from domain match" />
        </div>
    );
}

export function MatchWeb({ setShow = (v: boolean) => { } }: { setShow?: (v: boolean) => void; }) {
    const [editorAtom, setEditorAtom] = useAtom(formEditorDataAtom);
    const firstFocusRef = React.useRef<HTMLInputElement>(null);
    // React.useEffect(() => { firstFocusRef.current?.focus(); }, []);

    const [checked, setChecked] = React.useState(true);
    return (
        <div className="p-4">

            <div className="flex flex-col">
                <div className="mb-1">Website url to match</div>
                <input ref={firstFocusRef} className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner" />

                <RadioGroup />

                <label className="mt-2 h-6 flex items-center space-x-1">
                    <input type="checkbox" className="rounded focus:ring-indigo-500 focus:ring-offset-0" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
                    <div>Case sensitive</div>
                </label>

                <div className="mt-2 mb-4 w-full border-t border-gray-300" />

                <div className="mt-2 mb-1">Website original url</div>
                <input className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner" />

                <div className="mt-2 mb-1">Quicklink url</div>
                <input className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner" />

            </div>
        </div>
    );
}

export function MatchWindows({ setShow = (v: boolean) => { } }: { setShow?: (v: boolean) => void; }) {
    const [editorAtom, setEditorAtom] = useAtom(formEditorDataAtom);
    return (
        <div className="p-4">Windows match is comming soon...</div>
    );
}

//TODO: add checks for other urls: the same as original url
