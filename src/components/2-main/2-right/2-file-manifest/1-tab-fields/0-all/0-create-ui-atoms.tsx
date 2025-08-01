import { type Getter, type Setter } from "jotai";
import { type Atomize, type OnValueChangeAny, atomWithCallback, debounce } from "@/utils";
import { type Meta, type ValueLife, TransformValue } from "@/store/manifest";

type TableRowForAtoms = {
    useIt: boolean;
    label: string;
    type: string;
    value: string;
    valueAs: string;
    valueLife: ValueLife;
    fieldCat: string;
};

type TableRowAtoms = Prettify<Atomize<TableRowForAtoms>>;

export function createUiAtoms(field: Meta.Field, onChange: OnValueChangeAny): TableRowAtoms {
    const { useit, displayname, type: typ, value: val } = field.mani;
    return {
        useItAtom: atomWithCallback(!!useit, onChange),
        labelAtom: atomWithCallback(displayname || '', onChange),
        typeAtom: atomWithCallback<string>('', onChange), //TODO:
        valueAtom: atomWithCallback(val || '', onChange),
        valueAsAtom: atomWithCallback(val || '', onChange),
        valueLifeAtom: atomWithCallback(TransformValue.valueLife4Mani(field.mani), onChange),
        fieldCatAtom: atomWithCallback<string>('', onChange), //TODO:
    };
}

function combineResultFromAtoms(atoms: TableRowAtoms, get: Getter, set: Setter) {
    const result = {
        useIt: get(atoms.useItAtom),
        label: get(atoms.labelAtom),
        type: get(atoms.typeAtom), //TODO:
        value: get(atoms.valueAtom),
        valueAs: get(atoms.valueAsAtom),
        valueLife: get(atoms.valueLifeAtom),
        fieldCat: get(atoms.fieldCatAtom), //TODO: catalog
    };
    
    console.log('TableRow atoms', JSON.stringify(result));
    //TODO: use result
}

export const debouncedCombinedResultFromAtoms = debounce(combineResultFromAtoms);
