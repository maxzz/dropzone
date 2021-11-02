import React from 'react';
import Modal from 'react-overlays/Modal';

function EditorMatch() {
    const [show, setShow] = React.useState(false);

    const renderBackdrop = (props: any) => <div {...props} className="fixed inset-0 z-[1040] bg-black opacity-40" />;

    const portalRef = React.useRef<HTMLElement | null>(null);
    React.useEffect(() => { portalRef.current = document.getElementById('portal'); }, []);

    return (
        <div className="modal-example">
            <button type="button" className="px-2 py-1 text-gray-200 bg-gray-600 rounded" onClick={() => setShow(true)}>
                Open Modal
            </button>

            <Modal
                className="fixed w-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1040] bg-gray-200 rounded border border-gray-100 shadow"
                show={show}
                onHide={() => {
                    //setShow(false);
                }}
                onEscapeKeyDown={(e: KeyboardEvent) => setShow(false)}
                renderBackdrop={renderBackdrop}
                aria-labelledby="modal-label"
                container={portalRef}
            >
                <div className="py-4 text-sm">
                    <h4 className="px-4 py-2 text-base font-bold">URL matching</h4>

                    <div className="px-4">
                        <div className="flex flex-col space-y-1">
                            <div className="">Matching</div>
                            <input className="px-2 py-1 w-full border border-gray-400 rounded shadow-inner" />
                            <div className="flex space-x-2">
                                <label className="flex items-center">
                                    <input type="radio" name="how" />
                                    regex
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="how" />
                                    regex
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="how" />
                                    regex
                                </label>
                            </div>
                            <div className="">Quicklink</div>
                            <input className="px-2 py-1 w-full border border-gray-400 rounded shadow-inner" />
                            <div className="">Original</div>
                            <input className="px-2 py-1 w-full border border-gray-400 rounded shadow-inner" />
                        </div>

                        <div className="!mt-4 flex justify-end space-x-2">
                            <button className="px-4 py-2 min-w-[5rem] h-8 leading-4 text-gray-200 bg-gray-600 rounded" onClick={() => setShow(false)}>OK</button>
                            <button className="px-4 py-2 min-w-[5rem] h-8 leading-4 text-gray-200 bg-gray-600 rounded" onClick={() => setShow(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default EditorMatch;
