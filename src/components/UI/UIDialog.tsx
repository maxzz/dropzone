import React from 'react';
import Modal from 'react-overlays/Modal';

export const RenderBackdrop = (props: any) => <div className="fixed inset-0 z-[1040] bg-black opacity-40" {...props} />;

const className="fixed w-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1040] bg-gray-200 rounded border border-gray-100 shadow";

function Dialog({ children, allowClickOutside }: { children: JSX.Element; allowClickOutside?: boolean; }) {
    const [show, setShow] = React.useState(false);
    const portalRef = React.useRef<HTMLElement | null>(null);
    React.useEffect(() => { portalRef.current = document.getElementById('portal'); }, []);
    return (
        <>
            <button type="button" className="px-2 py-1 text-gray-200 bg-gray-600 rounded" onClick={() => setShow(true)}>
                Open Modal
            </button>

            {show && <Modal
                className={className}
                show={show}
                onHide={() => { allowClickOutside && setShow(false); }}
                onEscapeKeyDown={() => setShow(false)}
                renderBackdrop={RenderBackdrop}
                aria-labelledby="modal-label"
                container={portalRef}
            >
                {React.cloneElement(children, { setShow })}
            </Modal>}
        </>
    );
}

export default Dialog;
