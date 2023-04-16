import React from "react";
import { Close as DialogCloseButton } from '@radix-ui/react-dialog';
import { Atomize } from "@/hooks/atomsX";
import { PolicyUi } from ".";
import { useAtom } from "jotai";
import { Dropdown, Input, Radio } from "./ui-controls";
import { ConstrainPsw, ConstrainSet, namesConstrainPsw, namesConstrainSet, UseAs } from "@/store/policy";
import { IconCross } from "@ui/UIIconSymbols";
import { classNames } from "@/utils";

export function DialogHeader() {
    return (
        <div className="">
            <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-primary-300">
                    Policy Editor
                </div>
                <DialogCloseButton tabIndex={-1}>
                    <div className="px-2 py-1 hover:bg-primary-700 active:scale-[.97] rounded"><IconCross className="w-5 h-5 py-1" /> </div>
                </DialogCloseButton>
            </div>
            <h1 className="mt-4 mb-6">
                Specify password complexity, history and generation requirements.
            </h1>
        </div>
    );
}

export function SectionRuleTypes({ atoms }: { atoms: Atomize<PolicyUi>; }) {
    const [isCustomRule, setIsCustomRule] = useAtom(atoms.isCustomRuleAtom);
    return (
        <div className="space-y-8">
            <div>
                <Radio name="rule-type" checked={isCustomRule === '0'} onChange={() => setIsCustomRule('0')}>Predefined rule</Radio>
                <div className={classNames("mt-2", isCustomRule !== '0' && "opacity-10 pointer-events-none")}>
                    <Dropdown items={namesConstrainSet} valueAtom={atoms.constrainSetAtom} />
                </div>
            </div>

            <div>
                <Radio name="rule-type" checked={isCustomRule === '1'} onChange={() => setIsCustomRule('1')}>Custom rule</Radio>
                <div className={classNames("mt-2 flex items-center space-x-2", isCustomRule !== '1' && "opacity-10 pointer-events-none")}>
                    <Input className="flex-1" />
                    <button className="self-stretch px-4 p-1 bg-primary-700 rounded">?</button>
                </div>
            </div>
        </div>
    );
}

export function SectionMinMaxLength({ atoms }: { atoms: Atomize<PolicyUi>; }) {
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

export function SectionTestRoom({ atoms }: { atoms: Atomize<PolicyUi>; }) {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
                <Input className="" />
                <button className="px-4 py-2 inline-block hover:bg-primary-700 border-primary-500 active:scale-[.97] border rounded select-none">Verify</button>
            </div>
            <div className="flex items-center space-x-2">
                <Input className="" />
                <button className="px-4 py-2 inline-block hover:bg-primary-700 border-primary-500 active:scale-[.97] border rounded select-none">Generate</button>
            </div>
        </div>
    );
}

export function SectionHistory({ atoms }: { atoms: Atomize<PolicyUi>; }) {
    return (
        <div>
            <Dropdown items={namesConstrainPsw} valueAtom={atoms.constrainsPswAtom} />
        </div>
    )
}

export function SectionGenerationBy({ atoms }: { atoms: Atomize<PolicyUi>; }) {
    const [useAs, setUseUs] = useAtom(atoms.useAsAtom);
    return (
        <div className="grid space-y-2">
            <Radio name="gen-type" checked={useAs === `${UseAs.verify}`} onChange={() => setUseUs(`${UseAs.verify}`)}>By user</Radio>
            <Radio name="gen-type" checked={useAs === `${UseAs.generate}`} onChange={() => setUseUs(`${UseAs.generate}`)}>By system</Radio>
        </div>
    );
}

export function DialogButtons() {
    return (
        <div className="flex items-center justify-center gap-x-2">
            <DialogCloseButton>
                <div className="px-4 py-2 inline-block hover:bg-primary-700 border-primary-500 active:scale-[.97] border rounded select-none">
                    OK
                </div>
            </DialogCloseButton>
            <DialogCloseButton>
                <div className="px-4 py-2 inline-block hover:bg-primary-700 border-primary-500 active:scale-[.97] border rounded select-none">
                    Cancel
                </div>
            </DialogCloseButton>
        </div>
    );
}
