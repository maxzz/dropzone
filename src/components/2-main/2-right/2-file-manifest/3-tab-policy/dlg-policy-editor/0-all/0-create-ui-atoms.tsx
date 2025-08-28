import { type Getter, type Setter } from "jotai";
import { type Atomize, type OnValueChangeAny, atomWithCallback, debounce } from "@/utils";
import { Poli } from "pm-manifest";

export type PolicyUi = {
    enabled: boolean;           // Enable password policy
    isCustomRule: '0' | '1';    // boolean; rule type: predefined or custom rule

    constrainSet: string;       // ConstrainSet; predefined rule
    custom: string;             // customRule

    minLength: number;          // min password length
    maxLength: number;          // max password length

    textVerify: string;         // text to verify policy
    textGenerate: string;       // text to verify policy generation

    constrainsPsw: string;      // ConstrainPsw

    useAs: string;              // UseAs; by user / by system
};

export function createUiAtoms(policy: string | undefined, onChange: OnValueChangeAny): Atomize<PolicyUi> {
    
    //TODO: parse policy and assign onChange callback
    if (!policy) {
        //TODO: create the default policy but dissabled initially
    }

    return {
        enabledAtom: atomWithCallback<boolean>(true, onChange),
        isCustomRuleAtom: atomWithCallback<'0' | '1'>('0', onChange),
        constrainSetAtom: atomWithCallback<string>(`${Poli.ConstrainSet.withspecial}`, onChange),
        customAtom: atomWithCallback<string>('', onChange),
        minLengthAtom: atomWithCallback<number>(8, onChange),
        maxLengthAtom: atomWithCallback<number>(12, onChange),
        textVerifyAtom: atomWithCallback<string>('', onChange),
        textGenerateAtom: atomWithCallback<string>('', onChange),
        constrainsPswAtom: atomWithCallback<string>(`${Poli.ConstrainPsw.diffAp}`, onChange),
        useAsAtom: atomWithCallback<string>(`${Poli.UseAs.verify}`, onChange),
    };
}

export function combineValueFromAtoms(atoms: Atomize<PolicyUi>, get: Getter, set: Setter) {
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

export const debouncedCombinedResultFromAtoms = debounce(combineValueFromAtoms);
