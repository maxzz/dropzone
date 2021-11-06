import React from 'react';
import Modal from 'react-overlays/Modal';

export const RenderBackdrop = (props: any) => <div className="fixed inset-0 z-[1040] bg-black opacity-40" {...props} />;

const className = "fixed w-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1040] bg-gray-200 rounded border border-gray-100 shadow";

function ButtonTrigger(props: React.HTMLAttributes<HTMLElement>) {
    return (
        <button type="button" className="px-2 py-1 text-gray-200 bg-gray-600 rounded" {...props}>
            Open Modal
        </button>
    );
}

// <button type="button" className="px-2 py-1 text-gray-200 bg-gray-600 rounded" onClick={() => setShow(true)}>
// Open Modal
// </button>

type DialogProps = {
    children: JSX.Element;
    allowClickOutside?: boolean;
    trigger?: JSX.Element;
};

type ControlledDialogProps = DialogProps & {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ControlledDialog({ children, allowClickOutside, trigger, show, setShow }: ControlledDialogProps) {
    const portalRef = React.useRef<HTMLElement | null>(null);
    React.useEffect(() => { portalRef.current = document.getElementById('portal'); }, []);
    return (
        <>
            {trigger
                ? React.cloneElement(trigger, {
                    onClick: (event: Event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        console.log('triiger');

                        setShow(true);
                    }
                })
                : <ButtonTrigger onClick={() => setShow(true)} />
            }

            {/* <button type="button" className="px-2 py-1 text-gray-200 bg-gray-600 rounded" onClick={() => setShow(true)}>
                Open Modal
            </button> */}

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

function Dialog(props: DialogProps) {
    const [show, setShow] = React.useState(false);
    return (
        <ControlledDialog {...props} show={show} setShow={setShow} />
    );
}

export default Dialog;
