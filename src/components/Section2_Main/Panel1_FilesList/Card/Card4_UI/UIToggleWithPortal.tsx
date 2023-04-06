import React, { HTMLAttributes, useState } from 'react';
import { UIPortal } from '@ui/UIPortal';
import { usePopper } from 'react-popper';
import { useElementClickAway } from '@/hooks/useElementClickAway';

export function UIToggleWithPortal({ toggle, children, ...rest }: { toggle?: React.ReactNode; } & HTMLAttributes<HTMLButtonElement>) {
    const [referenceElm, setReferenceElm] = useState<HTMLButtonElement | null>(null);
    const [popperElm, setPopperElm] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(referenceElm, popperElm, { placement: 'bottom-end' });
    const [open, setOpen] = useState(false);

    useElementClickAway(popperElm, (event) => event.target !== popperElm && !referenceElm?.contains(event.target as HTMLElement) && setOpen(false));

    return (<>
        <button
            ref={setReferenceElm}
            onClick={() => setOpen((v) => !v)}
            {...rest}
        >
            {toggle}
        </button>

        {open && children &&
            <UIPortal>
                <div ref={setPopperElm} style={{ ...styles.popper, zIndex: 'inherit' }} {...attributes.popper} onClick={() => setOpen((v) => !v)}>
                    {children}
                </div>
            </UIPortal>
        }
    </>);
}