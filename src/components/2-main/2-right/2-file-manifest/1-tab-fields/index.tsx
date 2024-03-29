import React, { useEffect, useState } from 'react';
import { Getter, Setter, atom, useAtom, useSetAtom } from 'jotai';
import { CatalogItem, FieldTyp, Meta, TransformValue, ValueLife } from '@/store/manifest';
import { classNames, debounce } from '@/utils';
import { Column1_UseIt } from './column1-useIt';
import { Column2_Label } from './column2-label';
import { Column3_Value } from './column3-value';
import { Column4_Catalog } from './column4-catalog';
import { Column5_Type } from './column5-type';
import { Atomize, atomWithCallback } from '@/hooks/atomsX';

type TableRowAtoms = {
    useIt: boolean;
    label: string;
    type: string;
    value: string;
    valueAs: string;
    valueLife: ValueLife;
    fieldCat: string;
};

function createUiAtoms(field: Meta.Field, onChange: ({ get, set }: { get: Getter; set: Setter; }) => void): Atomize<TableRowAtoms> {
    const { useit, displayname, type: typ, value: val } = field.mani;
    return {
        useItAtom: atomWithCallback(!!useit, onChange),
        labelAtom: atomWithCallback(displayname || '', onChange),
        typeAtom: atomWithCallback('', onChange),                             //TODO:
        valueAtom: atomWithCallback(val || '', onChange),
        valueAsAtom: atomWithCallback(val || '', onChange),
        valueLifeAtom: atomWithCallback(TransformValue.valueLife4Mani(field.mani), onChange),
        fieldCatAtom: atomWithCallback('', onChange),                         //TODO:
    };
}

function combineFromAtoms(atoms: Atomize<TableRowAtoms>, get: Getter, set: Setter) {
    const result = {
        useItAtom: get(atoms.useItAtom),
        labelAtom: get(atoms.labelAtom),
        typeAtom: get(atoms.typeAtom),                             //TODO:
        valueAtom: get(atoms.valueAtom),
        valueAsAtom: get(atoms.valueAsAtom),
        valueLifeAtom: get(atoms.valueLifeAtom),
        fieldCatAtom: get(atoms.fieldCatAtom),                     //TODO: catalog
    };
    //console.log('TableRow atoms', JSON.stringify(result));
}

const debCombineFromAtoms = debounce(combineFromAtoms);

function TableRow({ field }: { field: Meta.Field; }) {
    const rowAtoms = useState(createUiAtoms(field, ({ get, set }) => {
        //console.log('changed', field, field.mani.displayname);
        debCombineFromAtoms(rowAtoms, get, set);
    }))[0];

    const [useIt, setUseIt] = useAtom(rowAtoms.useItAtom);
    const setLabel = useSetAtom(rowAtoms.labelAtom);
    const setType = useSetAtom(rowAtoms.typeAtom);
    const setValue = useSetAtom(rowAtoms.valueAtom);
    const setValueAs = useSetAtom(rowAtoms.valueAsAtom);
    const setValueLife = useSetAtom(rowAtoms.valueLifeAtom);
    const setFieldCat = useSetAtom(rowAtoms.fieldCatAtom);

    //const rowClassName = useIt ? "" : "opacity-30 pointer-events-none";
    const enableRow = () => !useIt && setUseIt(true);

    //console.log('============================================================');
    useEffect(() => {
        //console.log('-----------------------------------');

        const { useit, displayname, type: typ, value: val } = field.mani;

        setUseIt(!!useit);
        setLabel(displayname || '');
        setType('');                             //TODO:
        setValue(val || '');
        setValueAs(val || '');
        setValueLife(TransformValue.valueLife4Mani(field.mani));
        setFieldCat('');                         //TODO:
    }, [field]);

    function onSelectCatItem(item: CatalogItem | undefined) {

    }

    return (<>
        <Column1_UseIt useItAtom={rowAtoms.useItAtom} />
        <Column2_Label useItAtom={rowAtoms.useItAtom} valueAtom={rowAtoms.labelAtom} onClick={enableRow} />
        <Column3_Value useItAtom={rowAtoms.useItAtom} valueLifeAtom={rowAtoms.valueLifeAtom} choosevalue={field.mani.choosevalue} onClick={enableRow} />
        <Column4_Catalog useItAtom={rowAtoms.useItAtom} fieldCatAtom={rowAtoms.fieldCatAtom} onSelectCatItem={onSelectCatItem} field={field} onClick={enableRow} />
        <Column5_Type useItAtom={rowAtoms.useItAtom} field={field} onClick={enableRow} />
    </>);
}

const rowColumns = [
    ['Use it',              /**/ 'Use this field or not'],
    ['Label',               /**/ 'The label is shown to the user next to\nthe field for entering a value'],
    ['Value',               /**/ 'Specifies the value to fill out the field\nand how it is stored'],
    ['Shared ID (Catalog)', /**/ 'The Shared ID determines whether the value\nwill be shared through the field catalog'],
    ['Type',                /**/ 'Type of field'],
];

function TableHeader() {
    return (<>
        {rowColumns.map(([title, hint], idx) => (
            <div className="mb-2 px-1 text-[.65rem] text-primary-400 border-primary-100 border-b select-none" title={hint} key={idx}>
                {title}
            </div>
        ))}
    </>);
}

export function ManiSection1_Fields({ fields }: { fields: Meta.Field[] | undefined; }) {
    const nonButtonFields = fields?.filter((field) => field.ftyp !== FieldTyp.button); // buttons are shown on another section
    return (<>
        {nonButtonFields?.length
            ? (
                <div className={classNames(
                    "p-2 grid grid-cols-[max-content_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-x-1 gap-y-1",
                    "bg-primary-800 text-primary-200 rounded-sm"
                )}>
                    <TableHeader />

                    {nonButtonFields.map((field, idx) => (
                        <TableRow field={field} key={idx} />
                    ))}
                </div>
            )
            : <div className="">no fields</div>
        }
    </>);
}
