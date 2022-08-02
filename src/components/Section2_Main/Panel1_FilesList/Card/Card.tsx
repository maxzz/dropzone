import React, { forwardRef, HTMLAttributes, memo } from 'react';
import { FileUsAtomType } from '@/store';
import { Part1_CardTitle } from './Part1_CardTitle/Part1_CardTitle';
import { Part2_CardFormBody } from './Part2_CardFormBody/Part2_CardBody';
import { classNames } from '@/utils/classnames';

type CardProps = {
    fileUsAtom: FileUsAtomType;
} & HTMLAttributes<HTMLDivElement>;

function Card_({ fileUsAtom, ...props }: CardProps) {
    const { className, ...rest } = props;
    return (
        <div className={classNames("grid grid-rows-[min-content,minmax(auto,1fr)] grid-cols-1 overflow-hidden rounded shadow-md select-none", className)} {...rest}>
            <Part1_CardTitle fileUsAtom={fileUsAtom} />
            <Part2_CardFormBody fileUsAtom={fileUsAtom} />
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
