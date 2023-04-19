import React, { useState } from "react";
import { Getter, Setter } from "jotai";
import { Atomize, atomWithCallback } from "@/hooks/atomsX";
import { a, config, useTransition } from "@react-spring/web";
import * as Dialog from '@radix-ui/react-dialog';
import { Meta } from "@/store/manifest";
import { ConstrainPsw, ConstrainSet, UseAs } from "@/store/policy";
import { PolicyEditorBody } from "./PolicyEditorBody";

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


function createUiAtoms(policy: string | undefined, onChange: ({ get, set }: { get: Getter; set: Setter }) => void): Atomize<PolicyUi> {
    //TODO: parse policy and assign onChange callback
    if (!policy) {
        //TODO: create the default policy but dissabled initially
    }
    return {
        enabledAtom: atomWithCallback(true, onChange),
        isCustomRuleAtom: atomWithCallback<'0' | '1'>('0', onChange),
        constrainSetAtom: atomWithCallback(`${ConstrainSet.withspecial}`, onChange),
        customAtom: atomWithCallback('', onChange),
        minLengthAtom: atomWithCallback(8, onChange),
        maxLengthAtom: atomWithCallback(12, onChange),
        textVerifyAtom: atomWithCallback('', onChange),
        textGenerateAtom: atomWithCallback('', onChange),
        constrainsPswAtom: atomWithCallback(`${ConstrainPsw.diffAp}`, onChange),
        useAsAtom: atomWithCallback(`${UseAs.verify}`, onChange),
    };
}

function combineValueFromAtoms(atoms: Atomize<PolicyUi>, get: Getter, set: Setter) {
    const result = {
        'enabled': get(atoms.enabledAtom),
        'isCustomRule': get(atoms.isCustomRuleAtom),
        'constrainSet': get(atoms.constrainSetAtom),
        'custom': get(atoms.customAtom),
        'minLength': get(atoms.minLengthAtom),
        'maxLength': get(atoms.maxLengthAtom),
        'textVerify': get(atoms.textVerifyAtom),
        'textGenerate': get(atoms.textGenerateAtom),
        'constrainsPsw': get(atoms.constrainsPswAtom),
        'useAs': get(atoms.useAsAtom),
    };
    console.log('PolicyEditor atoms', JSON.stringify(result, null, 4));
}

export function PolicyEditorDlg({ field }: { field: Meta.Field; }) {
    const [open, setOpen] = React.useState(false);
    const transitions = useTransition(Number(open), {
        from: { opacity: 0, y: -10, scale: 0.97 },
        enter: { opacity: 1, y: 0, scale: 1 },
        leave: { opacity: 0, y: 10, scale: 0.97 },
        config: config.stiff,
    });

    const atoms = useState(createUiAtoms(field.mani.policy || field.mani.policy2, ({ get, set }) => {
        combineValueFromAtoms(atoms, get, set);
    }))[0];

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className="px-4 py-3 text-primary-300 border-primary-500 active:scale-[.97] border rounded select-none">
                Edit
            </Dialog.Trigger>

            {transitions((styles, item) => (
                !item
                    ? null
                    : <>
                        <Dialog.Portal container={document.getElementById('portal')}>
                            <a.div className="fixed inset-0 bg-primary-900/80" style={{ opacity: styles.opacity, }} />

                            <Dialog.Content forceMount asChild className="fixed inset-0 flex justify-center items-center">
                                <a.div style={styles}>
                                    <PolicyEditorBody atoms={atoms} />
                                </a.div>
                            </Dialog.Content>

                        </Dialog.Portal>
                    </>
            ))}
        </Dialog.Root>
    );
}
