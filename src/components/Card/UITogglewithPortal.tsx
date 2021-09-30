import React from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { useElementClickAway } from '../../hooks/useElementClickAway';

function ToggleWithPortal({ children, toggle }: { children?: React.ReactNode; toggle?: React.ReactNode; }) {
    const [referenceElm, setReferenceElm] = React.useState<HTMLButtonElement | null>(null);
    const [popperElm, setPopperElm] = React.useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(referenceElm, popperElm, { placement: 'bottom-end' });
    const [open, setOpen] = React.useState(false);

    useElementClickAway(popperElm, (event) => event.target !== popperElm && !referenceElm?.contains(event.target as HTMLElement) && setOpen(false));

    return (
        <>
            <button type="button" ref={setReferenceElm} onClick={() => setOpen((v) => !v)}> {toggle} </button>
            {open && ReactDOM.createPortal(
                <div ref={setPopperElm} style={styles.popper} {...attributes.popper} onClick={() => setOpen((v) => !v)}>
                    {/* <div className="w-[100px] h-[200px] bg-red-500">Popper</div> */}
                    {children}
                </div>
                , document.getElementById('portal')!
            )}
        </>
    );
}

export default ToggleWithPortal;
