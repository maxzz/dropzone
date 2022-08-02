import React, { HTMLAttributes, memo, useState } from 'react';
import { atom } from 'jotai';
import { FileUsAtomType } from '@/store';
import { Part1_CardTitle } from './Part1_CardTitle/Part1_CardTitle';
import { Part2_CardFormBody } from './Part2_CardFormBody/Part2_CardBody';
import { classNames } from '@/utils/classnames';

function Card_({ fileUsAtom, ...props }: {fileUsAtom: FileUsAtomType;} & HTMLAttributes<HTMLDivElement>) {
    const { className, ...rest } = props;
    const openAtom = useState(atom(false))[0];
    return (
        <div className={classNames("grid grid-rows-[min-content,minmax(auto,1fr)] grid-cols-1 overflow-hidden rounded shadow-md select-none", className)} {...rest}>
            <Part1_CardTitle fileUsAtom={fileUsAtom} openAtom={openAtom} />
            <Part2_CardFormBody fileUsAtom={fileUsAtom} openAtom={openAtom}  />
        </div>
    );
}

export const Card = memo(Card_);

//OK: but no need
/*
export const CardWRef = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const { fileUsAtom, className, ...rest } = props;
    return (
        <div ref={ref} className={classNames("grid grid-rows-[min-content,minmax(auto,1fr)] overflow-hidden rounded shadow-md select-none", className)} {...rest}>
            <Part1_CardTitle fileUsAtom={fileUsAtom} />
            <Part2_CardBody fileUsAtom={fileUsAtom} />
        </div>
    );
});
*/

//TODO: add card index of total - done
//TODO: compact view - tbd
//TODO: some IE forms have no detection section: but we can check IE_Server and presences of locations
