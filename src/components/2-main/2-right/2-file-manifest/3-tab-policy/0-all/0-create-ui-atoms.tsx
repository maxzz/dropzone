import { type Getter, type Setter } from 'jotai';
import { type Atomize, type OnValueChangeAny, atomWithCallback, debounce } from '@/utils';
import { type Meta } from '@/store/manifest';

type PolicyForAtoms = {
    policy: string;
    policy2: string;
};

type PolicyAtoms = Prettify<Atomize<PolicyForAtoms>>;

export function createUiAtoms(form: Meta.Form | undefined, onChange: OnValueChangeAny): PolicyAtoms {
    return {
        policyAtom: atomWithCallback<string>('', onChange),
        policy2Atom: atomWithCallback<string>('', onChange),
    };
}

function combineResultFromAtoms(atoms: PolicyAtoms, get: Getter, set: Setter) {
    const result = {
        policy: get(atoms.policyAtom),
        policy2: get(atoms.policy2Atom),
    };

    console.log('Policy atoms', JSON.stringify(result));
}

export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
