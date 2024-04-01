import React, { InputHTMLAttributes } from 'react';
import { classNames } from '@/utils';

export function RowInput({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={classNames(
                "px-2 py-1 h-6",
                "bg-primary-800 text-primary-300 focus:ring-offset-primary-800 ring-primary-600 focus:ring-primary-500",
                "focus:ring-1 focus:ring-offset-1",
                "outline-none rounded-sm",
                className
            )}
            {...rest} />
    );
}
