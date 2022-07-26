import React from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { useElementClickAway } from '../../../../hooks/useElementClickAway';

function UIToggleWithPortal({ children, toggle, ...rest }: { children?: React.ReactNode; toggle?: React.ReactNode; } & React.HTMLAttributes<HTMLButtonElement> ) {
    const [referenceElm, setReferenceElm] = React.useState<HTMLButtonElement | null>(null);
    const [popperElm, setPopperElm] = React.useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(referenceElm, popperElm, { placement: 'bottom-end' });
    const [open, setOpen] = React.useState(false);

    useElementClickAway(popperElm, (event) => event.target !== popperElm && !referenceElm?.contains(event.target as HTMLElement) && setOpen(false));

    return (
        <>
            <button type="button" ref={setReferenceElm} onClick={() => setOpen((v) => !v)} {...rest}>
                {toggle}
            </button>

            {open && children &&
                ReactDOM.createPortal(
                    <div ref={setPopperElm} style={{ ...styles.popper, zIndex: 'inherit' }} {...attributes.popper} onClick={() => setOpen((v) => !v)}>
                        {children}
                    </div>
                    , document.getElementById('portal')!
                )
            }
        </>
    );
}

export default UIToggleWithPortal;
