import React, { HTMLAttributes, useState } from "react";
import { a, config, useTransition } from "@react-spring/web";
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { classNames } from "@/utils/classnames";
import { atom, PrimitiveAtom, useAtom } from "jotai";
import { IconChevronDown } from "@ui/UIIconSymbols";
import { CheckIcon } from "@radix-ui/react-icons";

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

function Input({ className, ...rest }: HTMLAttributes<HTMLInputElement>) {
    return (
        <input className={classNames("p-2 h-9 text-primary-300 bg-primary-700 rounded", className)} {...rest} />
    );
}

const itemsRule = [
    { value: "1", name: "Letters and numbers" },
    { value: "2", name: "Numbers only" },
    { value: "3", name: "Letters only" },
    { value: "4", name: "Letters or numbers with special characters" },
    { value: "5", name: "Letters or numbers with at least one number" },
];

const itemsHistory = [
    { value: "1", name: "None" },
    { value: "2", name: "Different than the Windows password" },
    { value: "3", name: "Unique within Password Manager logons" },
    { value: "4", name: "Different than the current password" },
];

function Dropdown({ items, valueAtom, className }: { items: { value: string; name: string; }[]; valueAtom: PrimitiveAtom<string>; } & HTMLAttributes<HTMLButtonElement>) {
    const [val, setVal] = useAtom(valueAtom);
    return (<>
        <Select.Root value={val} onValueChange={(v: string) => setVal(v)}>
            <Select.Trigger className={className}>
                <div className="p-2 flex items-center justify-between space-x-1 text-primary-300 bg-primary-700 rounded">
                    <Select.Value />
                    <Select.Icon><IconChevronDown className="w-4 h-4" /></Select.Icon>
                </div>
            </Select.Trigger>

            <Select.Portal container={document.getElementById('portal')}>
                <Select.Content>
                    <Select.Viewport className={
                        classNames(
                            "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
                            "px-1.5 py-1 grid grid-cols-1 rounded shadow-md",
                            "bg-primary-100 dark:bg-gray-800 rounded",
                        )}
                    >
                        {items.map((item, idx) => (
                            <Select.Item className={
                                classNames(
                                    "relative pl-8 pr-4 py-2 text-xs flex items-center cursor-default select-none rounded outline-none",
                                    "text-primary-700 data-highlighted:bg-primary-700 data-highlighted:text-primary-100",
                                    "focus:bg-primary-100",
                                    "radix-disabled:opacity-50",
                                    "focus:outline-none select-none"
                                )}
                                value={item.value}
                                key={idx}
                            >
                                <Select.ItemText>{item.name}</Select.ItemText>
                                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                                    <CheckIcon />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>

        </Select.Root>
    </>);
}

function EditorBody() {
    const ruleAtom = useState(atom('1'))[0];
    const historyAtom = useState(atom('1'))[0];
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

            <div className="space-y-8">
                <div>
                    <Radio>Predefined rule</Radio>
                    <Dropdown className="mt-2 w-full" items={itemsRule} valueAtom={ruleAtom} />
                </div>

                <div>
                    <Radio>Custom rule</Radio>
                    <div className="mt-2 flex items-center space-x-2">
                        <Input className="flex-1" />
                        <button className="self-stretch px-4 p-1 bg-primary-700 rounded">?</button>
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <div className="">Length:</div>
                <Input className="max-w-[6ch]" />
                <div className="">to</div>
                <Input className="max-w-[6ch]" />
            </div>

            <h2 className="text-sm font-bold border-primary-700 border-b">Test complexity</h2>

            <div className="flex items-center space-x-2">
                <Input className="" />
                <button>Verify</button>
            </div>
            <div className="flex items-center space-x-2">
                <Input className="" />
                <button>Generate</button>
            </div>

            <h2 className="text-sm font-bold border-primary-700 border-b">History</h2>

            <div>
                <Dropdown items={itemsHistory} valueAtom={historyAtom} />
            </div>

            <h2 className="text-sm font-bold border-primary-700 border-b">Generation</h2>

            <div className="grid space-y-2">
                <Radio>By user</Radio>
                <Radio>By system</Radio>
            </div>

            <div className="flex items-center justify-center gap-x-2">
                <Dialog.Close>
                    <div className="px-4 py-2 inline-block border-primary-500 active:scale-[.97] border rounded select-none">
                        OK
                    </div>
                </Dialog.Close>
                <Dialog.Close>
                    <div className="px-4 py-2 inline-block border-primary-500 active:scale-[.97] border rounded select-none">
                        Cancel
                    </div>
                </Dialog.Close>
            </div>
        </div>
    );
}

export function PolicyEditor() {
    const [open, setOpen] = React.useState(false);
    const transitions = useTransition(Number(open), {
        from: { opacity: 0, y: -10, scale: 0.97 },
        enter: { opacity: 1, y: 0, scale: 1 },
        leave: { opacity: 0, y: 10, scale: 0.97 },
        config: config.stiff,
    });
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className="px-4 py-3 text-primary-300 border-primary-500 active:scale-[.97] border rounded select-none">
                Edit
            </Dialog.Trigger>

            {transitions((styles, item) => !item ? null : <>
                <Dialog.Portal container={document.getElementById('portal')}>
                    <a.div className="fixed inset-0 bg-primary-900/80" style={{ opacity: styles.opacity, }} />

                    <Dialog.Content forceMount asChild className="fixed inset-0 flex justify-center items-center">
                        <a.div style={styles}>
                            <EditorBody />
                        </a.div>
                    </Dialog.Content>

                </Dialog.Portal>
            </>)}
        </Dialog.Root>
    );
}
