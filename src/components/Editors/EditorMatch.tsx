import React from 'react';
import Modal from 'react-overlays/Modal';

function MatchRow({ label, type = "radio", group, idx = 0 }: { label: string; type?: string; group?: string; idx?: number; }) {
    return (
        <label className="h-7 flex items-center space-x-1">
            <input type={type} {...(group && { name: group })} />
            <div>{label}</div>
        </label>
    );
}

function MatchTo() {
    return (
        <div className="flex flex-col">
            <MatchRow group={"how"} idx={0} label="Do not match" />
            <MatchRow group={"how"} idx={1} label="String match" />
            <MatchRow group={"how"} idx={2} label="Wildcard match" />
            <MatchRow group={"how"} idx={3} label="Regular expresssion" />
            <MatchRow group={"how"} idx={4} label="No domain match" />
        </div>
    );
}

function EditorContent() {
    return (
        <div className="py-4 text-sm">
            <h4 className="px-4 py-2 text-base font-bold">URL matching</h4>

            <div className="px-4">
                <div className="flex flex-col space-y-1">
                    <div className="">Matching URL</div>
                    <input className="px-2 py-1 w-full border border-gray-400 rounded shadow-inner" />

                    <MatchTo />
                    <div className="flex flex-col">
                        <MatchRow label="Case sensitive" type="checkbox" />
                    </div>

                    <div className="">Quicklink URL</div>
                    <input className="px-2 py-1 w-full border border-gray-400 rounded shadow-inner" />

                    <div className="">Original URL</div>
                    <input className="px-2 py-1 w-full border border-gray-400 rounded shadow-inner" />
                </div>

                <div className="!mt-4 flex justify-end space-x-2">
                    <button className="px-4 py-2 min-w-[5rem] h-8 leading-4 text-gray-200 bg-gray-600 rounded" onClick={() => setShow(false)}>OK</button>
                    <button className="px-4 py-2 min-w-[5rem] h-8 leading-4 text-gray-200 bg-gray-600 rounded" onClick={() => setShow(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

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
                <EditorContent />
            </Modal>
        </div>
    );
}

export default EditorMatch;
