import { type Getter, type Setter } from "jotai";
import { type Atomize, type OnValueChangeAny, atomWithCallback, debounce } from "@/utils";
import { Meta } from "@/store/manifest";

type SubitForAtoms = {
    doSubmit: boolean;
};

type SubitAtoms = Prettify<Atomize<SubitForAtoms>>;

export function createUiAtoms(form: Meta.Form, onChange: OnValueChangeAny): SubitAtoms {
    return {
        doSubmitAtom: atomWithCallback<boolean>(true, onChange),
    };
}

function combineResultFromAtoms(atoms: SubitAtoms, get: Getter, set: Setter) {
    const result = {
        doSubmit: get(atoms.doSubmitAtom),
    };
    
    console.log('Submit atoms', JSON.stringify(result));
}

export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
