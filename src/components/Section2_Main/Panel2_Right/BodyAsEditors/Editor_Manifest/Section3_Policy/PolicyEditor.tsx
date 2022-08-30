import React, { HTMLAttributes } from "react";
import { a, config, useTransition } from "@react-spring/web";
import * as Dialog from '@radix-ui/react-dialog';
import { classNames } from "@/utils/classnames";

function Check({ children, className, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <label className={classNames("w-max inline-flex items-center gap-x-2 select-none cursor-pointer", className)} {...rest}>
            <input className="place-self-center w-4 h-4 dark-checkbox" type="checkbox" />
            {children}
        </label>
    );
}

function Radio({ children, className, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <label className={classNames("w-max inline-flex items-center gap-x-2 select-none cursor-pointer", className)} {...rest}>
            <input className="w-4 h-4 dark-radio" type="radio" />
            {children}
        </label>
    );
}

function EditorBody() {
    return (
        <div className="p-4 text-sm text-primary-400 bg-primary-800 rounded flex flex-col space-y-4">

            <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-primary-300">Policy Editor</div>
                <Dialog.Close>
                    <div className="px-4 p-1 bg-primary-700 rounded" tabIndex={-1}>x</div>
                </Dialog.Close>
            </div>

            <h1>Specify password complexity, history and generation requirements.</h1>
            <Check>Enable password policy</Check>

            <h2 className="text-sm font-bold border-primary-700 border-b">Complexity</h2>

            <div className="space-y-4">
                <div className="">
                    <Radio>Predefined rule</Radio>
                    <select className="mt-2 p-2 block text-primary-300 bg-primary-700 rounded" value={4} onChange={() => { }}>
                        <option value="1">Letters and numbers</option>
                        <option value="2">Numbers only</option>
                        <option value="3">letters only</option>
                        <option value="4">Letters or numbers with special characters</option>
                        <option value="5">Letters or numbers with at least one number</option>
                    </select>
                </div>

                <div className="">
                    <Radio>Custom rule</Radio>
                    <div className="mt-2 flex items-center space-x-2">
                        <input className="flex-1 p-2 text-primary-300 bg-primary-700 rounded" />
                        <button className="self-stretch px-4 p-1 bg-primary-700 rounded">?</button>
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <div className="">Length:</div>
                <input className="p-2 max-w-[6ch] text-primary-300 bg-primary-700 rounded" />
                <div className="">to</div>
                <input className="p-2 max-w-[6ch] text-primary-300 bg-primary-700 rounded" />
            </div>

            <h2 className="text-sm font-bold border-primary-700 border-b">Test complexity</h2>

            <div className="flex items-center space-x-2">
                <input className="p-2 text-primary-300 bg-primary-700 rounded" />
                <button>Verify</button>
            </div>
            <div className="flex items-center space-x-2">
                <input className="p-2 text-primary-300 bg-primary-700 rounded" />
                <button>Generate</button>
            </div>

            <h2 className="text-sm font-bold border-primary-700 border-b">History</h2>

            <select className="p-2 block text-primary-300 bg-primary-700 rounded" value={2} onChange={() => { }}>
                <option value="0">None</option>
                <option value="1">Different than the Windows password</option>
                <option value="2">Unique within Password Manager logons</option>
                <option value="3">Different than the current password</option>
            </select>

            <h2 className="text-sm font-bold border-primary-700 border-b">Generation</h2>

            <div className="grid space-y-2">
                <Radio>By user</Radio>
                <Radio>By system</Radio>
            </div>

            <Dialog.Close>
                <div className="px-4 py-3 inline-block border-primary-500 active:scale-[.97] border rounded select-none">
                    Close
                </div>
            </Dialog.Close>
        </div>
    );
}

export function PolicyEditor() {
    const [open, setOpen] = React.useState(false);
    const transitions = useTransition(open, {
        from: { opacity: 0, y: -10, scale: 0.97 },
        enter: { opacity: 1, y: 0, scale: 1 },
        leave: { opacity: 0, y: 10, scale: 0.97 },
        config: config.stiff,
    });
    return (<>
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className="px-4 py-3 border-primary-500 active:scale-[.97] border rounded select-none">
                Edit
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
