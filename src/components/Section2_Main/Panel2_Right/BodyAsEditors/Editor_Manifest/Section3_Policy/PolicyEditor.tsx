import React from "react";
import { a, config, useTransition } from "@react-spring/web";
import * as Dialog from '@radix-ui/react-dialog';

function EditorBody() {
    return (
        <div className="p-4 text-sm text-primary-400 bg-primary-800 rounded flex flex-col space-y-4">

            <h1>Specify password complexity, history and generation requirements.</h1>
            <label>
                <input type="checkbox" />
                Enable password policy
            </label>

            <h2>Complexity</h2>
            <div className="space-y-4">
                <div className="">
                    <label className="block"> <input type="radio" />Predefined rule</label>
                    <select className="px-2 py-1 text-primary-800" value={4} onChange={() => { }}>
                        <option value="1">Letters and numbers</option>
                        <option value="2">Numbers only</option>
                        <option value="3">letters only</option>
                        <option value="4">Letters or numbers with special characters</option>
                        <option value="5">Letters or numbers with at least one number</option>
                    </select>
                </div>

                <div className="">
                    <label> <input type="radio" />Custom rule</label>
                    <div className="flex items-center space-x-2">
                        <input type="text" />
                        <button>?</button>
                    </div>
                </div>
            </div>

            <div className="flex items-center">
                <div className="">Length:</div>
                <input />
                <div className="">to</div>
                <input />
            </div>

            <h2>Test complexity</h2>
            <div className="flex items-center space-x-2">
                <input />
                <button>Verify</button>
            </div>
            <div className="flex items-center space-x-2">
                <input />
                <button>Generate</button>
            </div>

            <h2>History</h2>
            <select className="px-2 py-1 text-primary-800" value={2} onChange={() => { }}>
                <option value="0">None</option>
                <option value="1">Different than the Windows password</option>
                <option value="2">Unique within Password Manager logons</option>
                <option value="3">Different than the current password</option>
            </select>

            <h2>Generation</h2>
            <div className="">
                <label className="block"> <input type="radio" /> By user </label>
                <label className="block"> <input type="radio" /> By system </label>
            </div>

            <Dialog.Close>close</Dialog.Close>
        </div>
    );
}

export function PolicyEditor() {
    const [open, setOpen] = React.useState(false);
    const transitions = useTransition(open, {
        from: { opacity: 0, y: -200 },
        enter: { opacity: 1, y: 0 },
        leave: { opacity: 0, y: 200 },
        config: config.stiff,
    });
    return (<>
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className="px-4 py-3 border-primary-500 active:scale-[.97] border rounded select-none">
                Open Dialog
            </Dialog.Trigger>

            {transitions((styles, item) =>
                item ? (<>
                    <Dialog.Portal container={document.getElementById('portal')}>
                        <Dialog.Overlay forceMount asChild className="fixed inset-0 bg-primary-900/80">
                            <a.div style={{ opacity: styles.opacity, }} />
                        </Dialog.Overlay>

                        <Dialog.Content forceMount asChild className="fixed inset-0 flex justify-center items-center">
                            <a.div style={styles}>
                                <EditorBody />
                            </a.div>
                        </Dialog.Content>

                    </Dialog.Portal>
                </>) : null
            )}
        </Dialog.Root>

    </>
    );
}
