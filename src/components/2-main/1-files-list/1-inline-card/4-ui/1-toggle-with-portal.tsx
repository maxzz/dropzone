import { type HTMLAttributes, type ReactNode, useState } from 'react';
import { useElementClickAway } from '@/utils';
import { usePopper } from 'react-popper';
import { UiPortal } from '@ui/ui-portal';

export function UIToggleWithPortal({ toggle, children, ...rest }: { toggle?: ReactNode; } & HTMLAttributes<HTMLButtonElement>) {
    const [open, setOpen] = useState(false);
    
    const [referenceElm, setReferenceElm] = useState<HTMLButtonElement | null>(null);
    const [popperElm, setPopperElm] = useState<HTMLDivElement | null>(null);
    
    const { styles, attributes } = usePopper(referenceElm, popperElm, { placement: 'bottom-end' });

    useElementClickAway(popperElm, (event) => event.target !== popperElm && !referenceElm?.contains(event.target as HTMLElement) && setOpen(false));

    return (<>
        <button ref={setReferenceElm} onClick={() => setOpen((v) => !v)} {...rest}>
            {toggle}
        </button>

        {open && children && (
            <UiPortal>
                <div ref={setPopperElm} style={{ ...styles.popper, zIndex: 'inherit' }} {...attributes.popper} onClick={() => setOpen((v) => !v)}>
                    {children}
                </div>
            </UiPortal>
        )}
    </>);
}
