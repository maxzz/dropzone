import React, { useState } from "react";
import { atom, PrimitiveAtom, useAtom } from "jotai";
import { Atomize } from "@/hooks/atomsX";
import * as Dialog from '@radix-ui/react-dialog';
import { Check, Dropdown, Input, Radio } from "./PolicyeditorUi";
import { IconCross } from "@ui/UIIconSymbols";
import { ConstrainPsw, ConstrainSet, namesConstrainPsw, namesConstrainSet, UseAs } from "@/store/policy";

type PolicyUi = {
    enabled: boolean;       // Enable password policy
    isCustomRule: '0' | '1';  // boolean; rule type: predefined or custom rule

    constrainSet: string;   // ConstrainSet; predefined rule
    custom: string;         // customRule

    minLength: number;      // min password length
    maxLength: number;      // max password length

    textVerify: string;     // text to verify policy
    textGenerate: string;   // text to verify policy generation

    constrainsPsw: string;  // ConstrainPsw

    useAs: string;          // UseAs; by user / by system
};

function Header() {
    return (
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
    );
}

function RuleTypes({ atoms }: { atoms: Atomize<PolicyUi>; }) {
    const [isCustomRule, setIsCustomRule] = useAtom(atoms.isCustomRuleAtom);
    return (
        <div className="space-y-8">
            <div>
                <Radio name="rule-type" checked={isCustomRule === '0'} onChange={() => setIsCustomRule('0')}>Predefined rule</Radio>
                <div className="mt-2">
                    <Dropdown items={namesConstrainSet} valueAtom={atoms.constrainSetAtom} />
                </div>
            </div>

            <div>
                <Radio name="rule-type" checked={isCustomRule === '1'} onChange={() => setIsCustomRule('1')}>Custom rule</Radio>
                <div className="mt-2 flex items-center space-x-2">
                    <Input className="flex-1" />
                    <button className="self-stretch px-4 p-1 bg-primary-700 rounded">?</button>
                </div>
            </div>
        </div>
    );
}

function MinMaxLength({ atoms }: { atoms: Atomize<PolicyUi>; }) {
    const [min, setMin] = useAtom(atoms.minLengthAtom);
    const [max, setMax] = useAtom(atoms.maxLengthAtom);
    return (
        <div className="flex items-center space-x-2">
            <div className="">Length:</div>
            <Input className="max-w-[6ch]" value={`${min}`} onChange={(e) => setMin(+e.target.value)} />
            <div className="">to</div>
            <Input className="max-w-[6ch]" value={`${max}`} onChange={(e) => setMax(+e.target.value)} />
        </div>
    );
}

function TestSection({ atoms }: { atoms: Atomize<PolicyUi>; }) {
    return (<>
        <div className="flex items-center space-x-2">
            <Input className="" />
            <button className="px-4 py-2 inline-block hover:bg-primary-700 border-primary-500 active:scale-[.97] border rounded select-none">Verify</button>
        </div>
        <div className="flex items-center space-x-2">
            <Input className="" />
            <button className="px-4 py-2 inline-block hover:bg-primary-700 border-primary-500 active:scale-[.97] border rounded select-none">Generate</button>
        </div>
    </>);
}

function Buttons() {
    return (
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
    );
}

function createUiAtoms(policy: string, onChange: () => void): Atomize<PolicyUi> {
    //TODO: parse policy and assign onChange callback
    return {
        enabledAtom: atom<boolean>(true),
        isCustomRuleAtom: atom<'0' | '1'>('0'),
        constrainSetAtom: atom<string>(`${ConstrainSet.withspecial}`),
        customAtom: atom<string>(''),
        minLengthAtom: atom<number>(8),
        maxLengthAtom: atom<number>(12),
        textVerifyAtom: atom<string>(''),
        textGenerateAtom: atom<string>(''),
        constrainsPswAtom: atom<string>(`${ConstrainPsw.diffAp}`),
        useAsAtom: atom<string>(`${UseAs.verify}`),
    };
}

export function PolicyEditorBody() {
    const atoms = useState(createUiAtoms('', () => {
        console.log('changed');
    }))[0];

    const [enabled, setEnabled] = useAtom(atoms.enabledAtom);
    const [useAs, setUseUs] = useAtom(atoms.useAsAtom);

    return (
        <div className="p-4 text-sm text-primary-400 bg-primary-800 rounded flex flex-col space-y-4">

            {/* Header */}
            <Header />

            <Check checked={enabled} onChange={() => setEnabled(v => !v)}>Enable password policy</Check>

            {/* Predefined or Custom rule */}
            <h2 className="text-sm font-bold border-primary-700 border-b">Complexity</h2>
            <RuleTypes atoms={atoms} />

            {/* Min / Max length */}
            <MinMaxLength atoms={atoms} />

            {/* Test section */}
            <h2 className="text-sm font-bold border-primary-700 border-b">Test complexity</h2>
            <TestSection atoms={atoms} />

            {/* History */}
            <h2 className="text-sm font-bold border-primary-700 border-b">History</h2>
            <div>
                <Dropdown items={namesConstrainPsw} valueAtom={atoms.constrainsPswAtom} />
            </div>

            {/* Generation */}
            <h2 className="text-sm font-bold border-primary-700 border-b">Generation</h2>
            <div className="grid space-y-2">
                <Radio name="gen-type" checked={useAs === `${UseAs.verify}`} onChange={() => setUseUs(`${UseAs.verify}`)}>By user</Radio>
                <Radio name="gen-type" checked={useAs === `${UseAs.generate}`} onChange={() => setUseUs(`${UseAs.generate}`)}>By system</Radio>
            </div>

            {/* Buttons */}
            <Buttons />
        </div>
    );
}
