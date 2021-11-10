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
            className="px-2 py-1.5 w-full text-sm border border-gray-400 rounded shadow-inner"
        />
    );
};

export default UIMultilineEdit;

// const [mLine, setMLine] = React.useState('');
// <MultilineEdit value={mLine} setValue={setMLine} />

// www.emgoto.com/react-inline-edit
/*
input, textarea {
  background-color: transparent;
  border: 0;
  padding: 8px 16px;
  border-radius: 3px;
  font-size: 24px;
  font-weight: bold;
  color: #D8DEE9;
  border: 2px solid #161822;
}

input:hover {
  background-color: #161822;
  cursor: pointer;
}

textarea {
  margin-top: 24px;
  resize: none;
  overflow: hidden;
  min-height: 14px;
  max-height: 100px;
  font-size: 14px;
}

textarea:focus {
  outline: 5px auto Highlight; /* Firefox * /
  outline: 5px auto -webkit-focus-ring-color; /* Chrome, Safari * /
}

#container {
  display: flex;
  flex-direction: column;
  margin: 8px;
  width: 300px;
  font-size: 24px;
  font-weight: bold;
  color: #D8DEE9;
}
*/
