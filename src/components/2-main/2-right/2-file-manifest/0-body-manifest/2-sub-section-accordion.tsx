import { HTMLAttributes, ReactNode } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { UiArrow } from '@ui/ui-arrow';
import { UiAccordion } from '@ui/ui-accordion';

export function SubSectionAccordion({ label, openAtom, children }: { label: ReactNode; openAtom: PrimitiveAtom<boolean>; } & HTMLAttributes<HTMLDivElement>) {
    const [open, setOpen] = useAtom(openAtom);
    return (<>
        <div className="inline-block">
            <div className="pb-1 text-base flex items-center select-none cursor-pointer text-[#32ffdaa0]" onClick={() => setOpen(v => !v)}>
                <UiArrow className="size-4 pt-1" open={open} />
                {label}
            </div>
        </div>

        <UiAccordion open={open}>
            <div className="ml-4 pt-2 pb-4">
                {children}
            </div>
        </UiAccordion>
    </>);
}
