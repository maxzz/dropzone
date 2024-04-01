import React, { InputHTMLAttributes } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { classNames } from '@/utils';

export function Column2_Label({ useItAtom, valueAtom, className, ...rest }: { useItAtom: PrimitiveAtom<boolean>; valueAtom: PrimitiveAtom<string>; } & InputHTMLAttributes<HTMLInputElement>) {
    const [value, setValue] = useAtom(valueAtom);
    const [useIt, setUseIt] = useAtom(useItAtom);
    return (
        <input
            className={classNames(
                "px-2 py-3 h-8",
                "bg-primary-700 text-primary-200 focus:ring-offset-primary-800 ring-primary-600 focus:ring-primary-400",
                "focus:ring-1 focus:ring-offset-1",
                "outline-none rounded",
                !useIt && "opacity-30 cursor-pointer",
                className,
            )}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            title={useIt ? "The label is shown to the user next to\nthe field for entering a value." : undefined}
            autoComplete="off" list="autocompleteOff" spellCheck={false}
            {...rest}
        />
    );
}

//TODO: add default text 'Give me a name' or 'No name, give me one';
