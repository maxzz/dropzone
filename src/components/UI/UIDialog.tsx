import React from 'react';
import Modal from 'react-overlays/Modal';

export const RenderBackdrop = (props: any) => <div className="fixed inset-0 z-[1040] bg-black opacity-40" {...props} />;

const className = "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1040] focus:outline-none";

function ButtonTrigger(props: React.HTMLAttributes<HTMLElement>) {
    return (
        <button type="button" className="px-2 py-1 text-gray-200 bg-gray-600 rounded" {...props}>
            Open Modal
        </button>
    );
}

type PortalModalProps = {
    children: JSX.Element;
    allowClickOutside?: boolean;
    show: boolean;
    setShow: (v: boolean) => void;
}

type ControlledDialogProps = PortalModalProps & {
    trigger?: JSX.Element;
};

type DialogProps = Omit<ControlledDialogProps, 'show' | 'setShow'>;

export function PortalModal({ children, allowClickOutside, show, setShow }: PortalModalProps) {
    return (
        <>
            {show &&
                <Modal
                    className={className}
                    show={show}
                    onHide={() => { allowClickOutside && setShow(false); }}
                    onEscapeKeyDown={() => setShow(false)}
                    renderBackdrop={RenderBackdrop}
                    aria-labelledby="modal-label"
                    container={document.getElementById('portal')}
                >
                    {React.cloneElement(children, { setShow })}
                </Modal>
            }
        </>
    );
}

export function ControlledDialog({ trigger, show, setShow, ...rest }: ControlledDialogProps) {
    const portalRef = React.useRef<HTMLElement | null>(null);
    React.useEffect(() => { portalRef.current = document.getElementById('portal'); }, []);
    return (
        <>
            {trigger
                ? React.cloneElement(trigger, {
                    onClick: (event: Event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        //console.log('triiger');

                        setShow(true);
                    }
                })
                : <ButtonTrigger onClick={() => setShow(true)} />
            }

            <PortalModal {...rest} show={show} setShow={setShow} />
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
