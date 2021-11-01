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
    opacity: 0.5
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

function ModalExample() {
    const [show, setShow] = React.useState(false);

    const renderBackdrop = (props: any) => <Backdrop {...props} />;

    return (
        <div className="modal-example">
            <button type="button" className="px-2 py-1 text-gray-200 bg-gray-600 rounded" onClick={() => setShow(true)}>
                Open Modal
            </button>

            <RandomlyPositionedModal
                show={show}
                onHide={() => setShow(false)}
                renderBackdrop={renderBackdrop}
                aria-labelledby="modal-label"
            >
                <div>
                    <h4 id="modal-label">Text in a modal</h4>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum perspiciatis nulla quod sint ad. Quia earum repellat optio explicabo alias amet, quibusdam ex ullam laborum totam pariatur quos facere deleniti!
                        Dolor excepturi ratione modi quidem dolorem ab! Debitis illum repellendus vel cum doloribus, officiis nemo expedita nesciunt dolor reprehenderit laborum odit ab dignissimos magnam fugiat delectus nihil nam molestias impedit.
                        Eveniet assumenda, explicabo exercitationem dolores voluptas fuga accusantium natus labore porro ipsa vero distinctio consequuntur odit inventore non hic voluptatem ipsum soluta itaque animi. Perspiciatis suscipit odit recusandae! Dolores, sapiente.
                    </p>
                    <ModalExample />
                </div>
            </RandomlyPositionedModal>
        </div>
    );
}

function EditorMatch() {
    return (
        <div>

        </div>
    );
}

export default ModalExample;
