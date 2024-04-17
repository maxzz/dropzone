import { useState } from 'react';
import { usePopper } from 'react-popper';
import { useElementClickAway } from '@/util-hooks';
import { UiPortal } from '@ui/ui-portal';
import { HeaderButton } from './1-header-button';

export function ToggleWithPortal({ children, text }: { children?: React.ReactNode; text: string; }) {
    const [referenceElm, setReferenceElm] = useState<HTMLButtonElement | null>(null);
    const [popperElm, setPopperElm] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(referenceElm, popperElm, { placement: 'bottom-end', strategy: 'fixed' });
    const [open, setOpen] = useState(false);

    useElementClickAway(popperElm, (event) => event.target !== popperElm && !referenceElm?.contains(event.target as HTMLElement) && setOpen(false));

    return (<>
        <HeaderButton text={text} ref={setReferenceElm} open={open} setOpen={setOpen} />

        {open &&
            <UiPortal>
                <div
                    ref={setPopperElm}
                    style={{ ...styles.popper, zIndex: 'inherit' }}
                    {...attributes.popper}
                    onClick={() => setOpen((v) => !v)}
                >
                    {children}
                </div>
            </UiPortal>
        }
    </>);
}
