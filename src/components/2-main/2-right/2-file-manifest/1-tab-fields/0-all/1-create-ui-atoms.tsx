import { Getter, Setter } from 'jotai';
import { Meta, TransformValue, ValueLife } from '@/store/manifest';
import { Atomize, atomWithCallback } from '@/hooks/atomsX';
import { debounce } from '@/utils';

type TableRowAtoms = {
    useIt: boolean;
    label: string;
    type: string;
    value: string;
    valueAs: string;
    valueLife: ValueLife;
    fieldCat: string;
};

export function createUiAtoms(field: Meta.Field, onChange: ({ get, set }: { get: Getter; set: Setter; }) => void): Atomize<TableRowAtoms> {
    const { useit, displayname, type: typ, value: val } = field.mani;
    return {
        useItAtom: atomWithCallback(!!useit, onChange),
        labelAtom: atomWithCallback(displayname || '', onChange),
        typeAtom: atomWithCallback('', onChange), //TODO:
        valueAtom: atomWithCallback(val || '', onChange),
        valueAsAtom: atomWithCallback(val || '', onChange),
        valueLifeAtom: atomWithCallback(TransformValue.valueLife4Mani(field.mani), onChange),
        fieldCatAtom: atomWithCallback('', onChange), //TODO:
    };
}

function combineFromAtoms(atoms: Atomize<TableRowAtoms>, get: Getter, set: Setter) {
    const result = {
        useItAtom: get(atoms.useItAtom),
        labelAtom: get(atoms.labelAtom),
        typeAtom: get(atoms.typeAtom), //TODO:
        valueAtom: get(atoms.valueAtom),
        valueAsAtom: get(atoms.valueAsAtom),
        valueLifeAtom: get(atoms.valueLifeAtom),
        fieldCatAtom: get(atoms.fieldCatAtom), //TODO: catalog
    };
    //console.log('TableRow atoms', JSON.stringify(result));
}

export const debCombineFromAtoms = debounce(combineFromAtoms);