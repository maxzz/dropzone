import { classNames } from '@/utils/classnames';
import { PrimitiveAtom, useAtom } from 'jotai';
import React, { InputHTMLAttributes } from 'react';

export function Column1_UseIt({ useItAtom, className, ...rest }: { useItAtom: PrimitiveAtom<boolean>; } & InputHTMLAttributes<HTMLInputElement>) {
    const [useIt, setUseIt] = useAtom(useItAtom);
    return (
        <input
            className={classNames(
                "place-self-center w-4 h-4 form-checkbox text-primary-700 bg-primary-800 ring-1 focus:ring-1 focus:ring-offset-primary-800 ring-primary-600 focus:ring-primary-400 rounded border-none cursor-pointer transition-all",
                className,
            )}
            type="checkbox"
            checked={useIt}
            onChange={() => setUseIt(v => !v)}
            {...rest}
        />
    );
}
