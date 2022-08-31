import React, { useState } from "react";
import { atom, PrimitiveAtom, useAtom } from "jotai";
import { a, config, useTransition } from "@react-spring/web";
import * as Dialog from '@radix-ui/react-dialog';
import { Check, Dropdown, Input, Radio } from "./PolicyeditorUi";
import { classNames } from "@/utils/classnames";
import { IconCross } from "@ui/UIIconSymbols";
import { ConstrainPsw, ConstrainSet, namesConstrainPsw, namesConstrainSet, UseAs } from "@/store/policy";

type PolicyUi = {
    enabled: boolean;       // Enable password policy
    isCustomRule: boolean;  // rule type: predefined or custom rule

    constrainSet: ConstrainSet; // predefined rule
    custom: string;         // customRule

    minLength: number;      // min password length
    maxLength: number;      // max password length

    textVerify: string;     // text to verify policy
    textGenerate: string;   // text to verify policy generation

    constrainsPsw: ConstrainPsw;

    useAs: UseAs;       // by user / by system
};

function EditorBody() {
    const ruleAtom = useState(atom('1'))[0];
    const historyAtom = useState(atom('1'))[0];

    const ruleTypeAtom = useState(atom('1'))[0];
    const [ruleType, setRuleType] = useAtom(ruleTypeAtom);

    const genTypeAtom = useState(atom('1'))[0];
    const [genType, setGenType] = useAtom(genTypeAtom);

    return (
        <div className="p-4 text-sm text-primary-400 bg-primary-800 rounded flex flex-col space-y-4">

            <div className="">
                <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-primary-300">
                        Policy Editor
                    </div>
                    <Dialog.Close tabIndex={-1}>
                        <div className="px-2 py-1 hover:bg-primary-700 active:scale-[.97] rounded"><IconCross className="w-5 h-5 py-1" /> </div>
                    </Dialog.Close>
                </div>
                <h1 className="mt-4 mb-6">
                    Specify password complexity, history and generation requirements.
                </h1>
            </div>

            <Check>Enable password policy</Check>

            <h2 className="text-sm font-bold border-primary-700 border-b">Complexity</h2>

            <div className="space-y-8">
                <div>
                    <Radio name="rule-type" checked={ruleType === '1'} onChange={() => setRuleType('1')}>Predefined rule</Radio>
                    <div className="mt-2">
                        <Dropdown items={namesConstrainSet} valueAtom={ruleAtom} />
                    </div>
                </div>

                <div>
                    <Radio name="rule-type" checked={ruleType === '2'} onChange={() => setRuleType('2')}>Custom rule</Radio>
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
                <button className="px-4 py-2 inline-block hover:bg-primary-700 border-primary-500 active:scale-[.97] border rounded select-none">Verify</button>
            </div>
            <div className="flex items-center space-x-2">
                <Input className="" />
                <button className="px-4 py-2 inline-block hover:bg-primary-700 border-primary-500 active:scale-[.97] border rounded select-none">Generate</button>
            </div>

            <h2 className="text-sm font-bold border-primary-700 border-b">History</h2>

            <div>
                <Dropdown items={namesConstrainPsw} valueAtom={historyAtom} />
            </div>

            <h2 className="text-sm font-bold border-primary-700 border-b">Generation</h2>

            <div className="grid space-y-2">
                <Radio name="gen-type" checked={genType === '1'} onChange={() => setGenType('1')}>By user</Radio>
                <Radio name="gen-type" checked={genType === '2'} onChange={() => setGenType('2')}>By system</Radio>
            </div>

            <div className="flex items-center justify-center gap-x-2">
                <Dialog.Close>
                    <div className="px-4 py-2 inline-block hover:bg-primary-700 border-primary-500 active:scale-[.97] border rounded select-none">
                        OK
                    </div>
                </Dialog.Close>
                <Dialog.Close>
                    <div className="px-4 py-2 inline-block hover:bg-primary-700 border-primary-500 active:scale-[.97] border rounded select-none">
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
