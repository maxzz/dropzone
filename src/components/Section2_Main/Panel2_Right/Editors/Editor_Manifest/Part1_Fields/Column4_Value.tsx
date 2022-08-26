import React, { InputHTMLAttributes } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { FieldTyp, Meta, ReferenceItem, references, ValueAs, valueAsNames, ValueLife } from "@/store/manifest";
import { Dropdown, isKeyClearDefault } from "./Dropdown";
import { classNames } from "@/utils/classnames";

function typeRefs(isPsw: boolean | undefined): Record<string, ReferenceItem> {
    return references[isPsw ? 'psw' : 'txt'];
}

function valueAs2Idx(v: ValueAs) {
    return v === ValueAs.askReuse ? 0 : v === ValueAs.askConfirm ? 1 : v === ValueAs.askAlways ? 2 : 0;
}

function refName2Idx(v: string | undefined, isPsw: boolean | undefined) {
    return v ? typeRefs(isPsw)[v].i : -1;
}

function refName2Txt(v: string | undefined, isPsw: boolean | undefined) {
    return v ? typeRefs(isPsw)[v].n : '';
}

function idx2RefName(v: number, isPsw: boolean | undefined) {
    return Object.keys(typeRefs(isPsw))[v];
}

export function Column4_Value({ useItAtom, valueLifeAtom, field, className, ...rest }: { useItAtom: PrimitiveAtom<boolean>; valueLifeAtom: PrimitiveAtom<ValueLife>; field: Meta.Field; } & InputHTMLAttributes<HTMLInputElement>) {

    const [useIt, setUseIt] = useAtom(useItAtom);
    const [valueLife, setValueLife] = useAtom(valueLifeAtom);

    const isPsw = valueLife.fType === FieldTyp.psw;
    const listRefs = isPsw || valueLife.fType === FieldTyp.edit ? Object.values(typeRefs(isPsw)).map((item) => item.n) : [];
    
    const values = field.mani.choosevalue?.split(':') || [];
    values.length && values.push('-');

    const idxValues = valueAsNames.length + 1;
    const idxRefs = idxValues + values.length;

    const items = [...valueAsNames, '-', ...values, ...listRefs];
    const itemIdxs = [...valueAsNames.map(() => 0), 0, ...values.map(() => idxValues), ...listRefs.map(() => idxRefs)];

    items.at(-1) === '-' && items.pop();

    const inputText = valueLife.isRef
        ? refName2Txt(valueLife.value, isPsw)
        : valueLife.value
            ? valueLife.value
            : valueLife.isNon
                ? ''
                : valueAsNames[valueLife.valueAs];

    const dropdownSelectedIndex = valueLife.isRef
        ? 4 + refName2Idx(valueLife.value, isPsw)
        : valueLife.value
            ? -1
            : valueAs2Idx(valueLife.valueAs);

    console.log(field.pidx, 'valueLife', valueLife, dropdownSelectedIndex, `text='${inputText}'`);

    const showAsRef = valueLife.isRef || !valueLife.value;
    const showInputText = !useIt && !valueLife.isRef && !valueLife.value;

    function onSetText(value: string) {
        setValueLife((v) => ({ ...v, value, isRef: false, valueAs: ValueAs.askReuse, isNon: false, }));
    }

    function onSetDropdownIndex(idx: number) {
        if (itemIdxs[idx] === idxRefs) {
            setValueLife((v) => ({ ...v, value: idx2RefName(idx - idxRefs, isPsw), isRef: true, valueAs: ValueAs.askReuse, isNon: false, }));
        } else
        if (itemIdxs[idx] === idxValues) {
            setValueLife((v) => ({ ...v, value: values[idx - idxValues], isRef: false, valueAs: ValueAs.askReuse, isNon: false, }));
        } else {
            setValueLife((v) => ({ ...v, value: '', isRef: false, valueAs: idx, isNon: false, }));
        }
    }

    function onSetKey(event: React.KeyboardEvent) {
        showAsRef && isKeyClearDefault(event.key) &&
            setValueLife((v) => ({ ...v, value: '', isRef: false, valueAs: ValueAs.askReuse, isNon: true, }));
    }

    function onBlur() {
        showAsRef && !inputText &&
            setValueLife((v) => ({ ...v, value: '', isRef: false, valueAs: ValueAs.askReuse, isNon: false, }));
    }

    return (
        <div
            className={classNames(
                "grid grid-cols-[minmax(0,1fr)_auto] bg-primary-700 rounded overflow-hidden",
                "focus-within:ring-offset-primary-800 focus-within:ring-primary-400 ring-primary-600",
                "focus-within:ring-1 focus-within:ring-offset-1",
                !useIt && "opacity-30 cursor-pointer",
                className,
            )}
            {...rest}
        >
            <input
                className={classNames(
                    "px-2 py-3 h-8 !bg-primary-700 !text-primary-200 outline-none",
                    showAsRef && !valueLife.isNon && "text-[0.6rem] !text-blue-400"
                )} //TODO: we can use placeholder on top and ingone all events on placeholder and do multiple lines
                value={showInputText ? '' : inputText}
                onChange={(event) => onSetText(event.target.value)}
                onKeyDown={onSetKey}
                onBlur={onBlur}
                autoComplete="off" list="autocompleteOff" spellCheck={false}
            />

            {Dropdown(useItAtom, items, dropdownSelectedIndex, onSetDropdownIndex)}
        </div>
    );
}

//TODO: add values to dropdown selection
//TODO: move out value <-> index mappers
