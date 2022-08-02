import React, { HTMLAttributes, memo, useEffect, useState } from 'react';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { allCards, FileUsAtomType } from '@/store';
import { Part1Card_Title } from './Part1Card_Title/Part1Card_Title';
import { Part2Card_Body } from './Part2Card_FormBody/Part2Card_Body';
import { classNames } from '@/utils/classnames';

function Card_({ fileUsAtom, ...props }: {fileUsAtom: FileUsAtomType;} & HTMLAttributes<HTMLDivElement>) {
    const { className, ...rest } = props;
    const openAtom = useState(atom(false))[0];

    const setOpen = useSetAtom(openAtom);
    const allOpenCounter = useAtomValue(allCards.areFoldedCounterAtom);
    useEffect(() => {
        if (allOpenCounter >= 0) {
            const collapse = allOpenCounter % 2 === 0;
            setOpen(collapse);
        }
    }, [allOpenCounter]);

    return (
        <div className={classNames("grid grid-rows-[min-content,minmax(auto,1fr)] grid-cols-1 overflow-hidden rounded shadow-md select-none", className)} {...rest}>
            <Part1Card_Title fileUsAtom={fileUsAtom} openAtom={openAtom} />
            <Part2Card_Body fileUsAtom={fileUsAtom} openAtom={openAtom}  />
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
