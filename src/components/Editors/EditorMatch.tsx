import React from 'react';
import { styled } from '../../stitches.config';
import Modal from 'react-overlays/Modal';

let rand = () => Math.floor(Math.random() * 20) - 10;

const Backdrop = styled('div', {
    position: "fixed",
    zIndex: 1040,
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "#000",
    opacity: 0.4
});

// we use some pseudo random coords so nested modals
// don't sit right on top of each other.
const RandomlyPositionedModal = styled(Modal, {
    position: "fixed",
    width: "400px",
    // top: `${() => 50 + rand()}%`,
    // left: `${() => 50 + rand()}%`,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: 1040,
    border: "1px solid #e5e5e5",
    backgroundColor: "white",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
    padding: "20px"
});

function EditorMatch() {
    const [show, setShow] = React.useState(false);

    const renderBackdrop = (props: any) => <Backdrop {...props} />;

    const portalRef = React.useRef<HTMLElement | null>(null);
    React.useEffect(() => { portalRef.current = document.getElementById('portal'); }, []);

    return (
        <div className="modal-example">
            <button type="button" className="px-2 py-1 text-gray-200 bg-gray-600 rounded" onClick={() => setShow(true)}>
                Open Modal
            </button>

            <RandomlyPositionedModal
                css={{
                    top: '25px',
                    left: `${() => 50 + rand()}%`,
                }}
                show={show}
                onHide={() => {
                    //setShow(false);
                }}
                onEscapeKeyDown={(e: KeyboardEvent) => {
                    console.log('key', { e });
                    setShow(false);
                }}
                onBackdropClick={(e: React.SyntheticEvent) => {
                    console.log('bkg', { e });
                    //e.preventDefault();
                }}
                renderBackdrop={renderBackdrop}
                aria-labelledby="modal-label"
                container={portalRef}
            >
                <div>
                    <h4>Text in a modal</h4>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum perspiciatis nulla quod sint ad. Quia earum repellat optio explicabo alias amet, quibusdam ex ullam laborum totam pariatur quos facere deleniti!
                    </p>
                    <EditorMatch />
                </div>
            </RandomlyPositionedModal>
        </div>
    );
}

export default EditorMatch;
