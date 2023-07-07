import React from 'react';
import { PrimitiveAtom as PA, useAtom, useAtomValue } from 'jotai';
import { LabeledSwitch } from '@ui/USwitch';

function LabeWithNumber({ label, counterAtom }: { label: string; counterAtom: PA<number>; }) {
    const total = useAtomValue(counterAtom);
    return (
        <div className="ml-2 flex items-center">
            <div className="inline-block">{label}</div>
            <div className="inline-block ml-1 pb-3">{total}</div>
        </div>
        // version w/ frames around numbers
        // <div className="ml-2 flex items-center">
        //     <div className="inline-block">{label}</div>
        //     <div className="inline-block ml-1 pb-3"><div className="border leading-3 text-[9px] px-1 py-[2px] rounded">{total}</div></div>
        // </div>
    );
}

export function FilterManiCounter({ showAtom, counterAtom, label, title }: { showAtom: PA<boolean>, counterAtom: PA<number>, label: string, title: string; }) {
    const [show, setShow] = useAtom(showAtom);
    return (
        <LabeledSwitch value={show} onChange={() => setShow(!show)} title={title}>
            <LabeWithNumber label={label} counterAtom={counterAtom} />
        </LabeledSwitch>
    );
}
