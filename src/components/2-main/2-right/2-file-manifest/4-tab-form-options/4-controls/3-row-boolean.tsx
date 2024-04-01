import React, { InputHTMLAttributes } from 'react';
import { classNames } from '@/utils';
import { PrimitiveAtom, useAtom } from 'jotai';

export function RowBoolean({ useItAtom, className, ...rest }: { useItAtom: PrimitiveAtom<boolean>; } & InputHTMLAttributes<HTMLInputElement>) {
    const [useIt, setUseIt] = useAtom(useItAtom);
    return (
        <input
            className={classNames("place-self-center w-4 h-4 dark-checkbox", className)}
            type="checkbox"
            checked={useIt}
            onChange={() => setUseIt(v => !v)}
            {...rest} />
    );
}
