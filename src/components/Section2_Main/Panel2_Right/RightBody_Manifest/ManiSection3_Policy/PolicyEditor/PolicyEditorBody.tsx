import React, { useState } from "react";
import { atom, useAtom } from "jotai";
import { Atomize } from "@/hooks/atomsX";
import { Check, Dropdown, Input, Radio } from "./ui-controls";
import { ConstrainPsw, ConstrainSet, namesConstrainPsw, UseAs } from "@/store/policy";
import { DialogButtons, DialogHeader, SectionGenerationBy, SectionHistory, SectionMinMaxLength, SectionRuleTypes, SectionTestRoom } from "./ui-sections";
import { classNames } from "@/utils";

export type PolicyUi = {
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


function createUiAtoms(policy: string, onChange: () => void): Atomize<PolicyUi> {
    //TODO: parse policy and assign onChange callback
    return {
        enabledAtom: atom(true),
        isCustomRuleAtom: atom<'0' | '1'>('0'),
        constrainSetAtom: atom(`${ConstrainSet.withspecial}`),
        customAtom: atom(''),
        minLengthAtom: atom(8),
        maxLengthAtom: atom(12),
        textVerifyAtom: atom(''),
        textGenerateAtom: atom(''),
        constrainsPswAtom: atom(`${ConstrainPsw.diffAp}`),
        useAsAtom: atom(`${UseAs.verify}`),
    };
}

export function PolicyEditorBody() {
    const atoms = useState(createUiAtoms('', () => {
        console.log('changed');
    }))[0];

    const [enabled, setEnabled] = useAtom(atoms.enabledAtom);

    return (
        <div className="p-4 text-sm text-primary-400 bg-primary-800 border-primary-600/20 shadow-primary-700/30 border shadow rounded flex flex-col space-y-4">

            {/* Header */}
            <DialogHeader />

            <Check checked={enabled} onChange={() => setEnabled(v => !v)}>Enable password policy</Check>

            <div className={classNames("flex flex-col space-y-4", !enabled && "opacity-10 pointer-events-none")}>
                {/* Predefined or Custom rule */}
                <h2 className="text-sm font-bold border-primary-700 border-b">Password complexity</h2>
                <SectionRuleTypes atoms={atoms} />

                {/* Min / Max length */}
                <SectionMinMaxLength atoms={atoms} />

                {/* Test section */}
                <h2 className="text-sm font-bold border-primary-700 border-b">Test password complexity</h2>
                <SectionTestRoom atoms={atoms} />

                {/* History */}
                <h2 className="text-sm font-bold border-primary-700 border-b">Password history restrictions</h2>
                <SectionHistory atoms={atoms} />

                {/* Generation */}
                <h2 className="text-sm font-bold border-primary-700 border-b">Password generation</h2>
                <SectionGenerationBy atoms={atoms} />
            </div>

            {/* Buttons */}
            <DialogButtons />
        </div>
    );
}
