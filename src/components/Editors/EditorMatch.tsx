import { useAtom } from 'jotai';
import React, { ChangeEvent } from 'react';
import { FileUsAtom, formEditorDataAtom, FormEditorDataAtom } from '../../store/store';

type RadioButtonProps = {
    label: string;
    type?: string;
    group?: string;
    val?: number;
    checked: boolean;
} & React.HTMLAttributes<HTMLLabelElement>;

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

const MultilineEdit = ({ value, setValue }: { value: string, setValue: (v: string) => void; }) => {
    const [editingValue, setEditingValue] = React.useState(value);

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => setEditingValue(event.target.value);

    const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        if (event.key === "Enter" || event.key === "Escape") {
            (event.target as HTMLTextAreaElement)?.blur && (event.target as HTMLTextAreaElement)?.blur();
        }
    };

    const onBlur: React.FocusEventHandler<HTMLTextAreaElement> = (event) => {
        if (event.target?.value.trim() === "") {
            setEditingValue(value);
        } else {
            setValue(event.target.value);
        }
    };

    const onInput = (target?: HTMLTextAreaElement) => {
        if (target && target?.scrollHeight > 33) {
            target.style.height = "5px";
            target.style.height = target.scrollHeight - 16 + "px";
        }
    };

    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        textareaRef.current && onInput(textareaRef.current);
    }, [onInput, textareaRef]);

    return (
        <textarea
            ref={textareaRef}
            rows={1}
            aria-label="Field name"
            value={editingValue}
            onBlur={onBlur}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onInput={(event) => onInput(event.target as HTMLTextAreaElement)}
        />
    );
};

export function MatchWeb() {
    const firstFocusRef = React.useRef<HTMLInputElement>(null);
    // React.useEffect(() => { firstFocusRef.current?.focus(); }, []);

    const [checked, setChecked] = React.useState(true);

    const [editorData, setEditorData] = useAtom(formEditorDataAtom);
    if (!editorData) {
        return null;
    }
    const [fileUs, setFileUs] = useAtom(editorData.fileUsAtom);
    const detection = fileUs.meta?.[editorData.formIdx]?.mani?.detection;

    const [mLine, setMLine] = React.useState('');

    return (
        <div className="p-4">
            <div className="flex flex-col">
                <div className="mb-1">Website url to match</div>
                <input ref={firstFocusRef} className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner" value={detection?.web_murl} readOnly />

                <MultilineEdit value={mLine} setValue={setMLine} />

                <RadioGroup />

                <label className="mt-2 h-6 flex items-center space-x-1">
                    <input type="checkbox" className="rounded focus:ring-indigo-500 focus:ring-offset-0" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
                    <div>Case sensitive</div>
                </label>

                <div className="mt-2 mb-4 w-full border-t border-gray-300" />

                <div className="mt-2 mb-1">Website original url</div>
                <input className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner" value={detection?.web_ourl} readOnly />

                <div className="mt-2 mb-1">Quicklink url</div>
                <input className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner" value={detection?.web_qurl} readOnly />
            </div>
        </div>
    );
}

export function MatchWindows() {
    const [editorAtom, setEditorAtom] = useAtom(formEditorDataAtom);
    if (!editorAtom) {
        return null;
    }
    return (
        <div className="p-4">
            Windows match is comming soon...
        </div>
    );
}

//TODO: RadioButton: background-image: url(data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e);
//TODO: add checks for other urls: the same as original url
//test on: {cd2a9c44-f588-4010-ba99-9d3e58bf69cb}.dpm
