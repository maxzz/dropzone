import React from 'react'

const UIMultilineEdit = ({ value, setValue }: { value: string, setValue: (v: string) => void; }) => {
    const [editingValue, setEditingValue] = React.useState(value);

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setEditingValue(event.target.value);

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
        if (target && target?.scrollHeight > 34) {
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
            className="px-2 py-1.5 w-full text-sm border border-gray-400 rounded shadow-inner"
        />
    );
};

export default UIMultilineEdit;

// const [mLine, setMLine] = React.useState('');
// <MultilineEdit value={mLine} setValue={setMLine} />
