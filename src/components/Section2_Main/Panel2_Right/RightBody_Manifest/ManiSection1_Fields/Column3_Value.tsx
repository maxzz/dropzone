import React, { InputHTMLAttributes } from "react";
import { PrimitiveAtom as PA, useAtom } from "jotai";
import { FieldTyp, LIST_references, LIST_valueAskNames, ReferenceItem, ValueAs, ValueLife } from "@/store/manifest";
import { Dropdown, isKeyToClearDefault } from "./Dropdown";
import { classNames } from "@/utils";

function pickRefsList(isPsw: boolean): Record<string, ReferenceItem> { //TODO: move out value <-> index mappers
    return LIST_references[isPsw ? 'psw' : 'txt'];
}

function idx2RefName(v: number, isPsw: boolean) {
    return Object.keys(pickRefsList(isPsw))[v];
}

function getValueUiState(valueLife: ValueLife, choosevalue: string | undefined) {
    const isBtn = valueLife.fType === FieldTyp.button;
    const isPsw = valueLife.fType === FieldTyp.psw;

    const listAskNames = isBtn ? [] : [...LIST_valueAskNames];
    listAskNames.length && listAskNames.push('-');

    const listValues = choosevalue?.split(':') || [];
    listValues.length && listValues.push('-');

    const listRefs = isPsw || valueLife.fType === FieldTyp.edit ? Object.values(pickRefsList(isPsw)).map((item) => item.f) : [];

    const idxToValues = listAskNames.length;
    const idxToRefs = idxToValues + listValues.length;

    const dropdown = [...listAskNames, ...listValues, ...listRefs];
    const dropdownIdxs = [...listAskNames.map(() => 0), ...listValues.map(() => idxToValues), ...listRefs.map(() => idxToRefs)];

    dropdown.at(-1) === '-' && dropdown.pop();

    const inputText =
        valueLife.isRef
            ? refName2Txt(valueLife.value, isPsw)
            : valueLife.value
                ? valueLife.value
                : valueLife.isNon
                    ? ''
                    : isBtn
                        ? ''
                        : LIST_valueAskNames[valueLife.valueAs];

    const dropdownSelectedIndex =
        valueLife.isRef
            ? idxToRefs + refName2Idx(valueLife.value, isPsw)
            : valueLife.value
                ? listValues.length
                    ? idxToValues + listValues.indexOf(valueLife.value)
                    : -1
                : valueAs2Idx(valueLife.valueAs);

    const showAsRef = valueLife.isRef || !valueLife.value;
    const disabled = isBtn ? true : undefined; //readOnly={valueLife.fType === FieldTyp.list ? true : undefined} // OK but it is too match, admin should have it
    const title = disabled ? 'Buttons have no state value' : valueLife.isRef && refName2Full(valueLife.value, isPsw) || undefined;

    return {
        dropdown,
        dropdownIdxs,
        dropdownSelectedIndex,

        idxToRefs,
        idxToValues,
        listValues,
        isPsw,

        inputText,
        showAsRef,
        disabled,
        title,
    };

    function refName2Idx(value: string | undefined, isPsw: boolean) {
        return value ? pickRefsList(isPsw)[value].i : -1;
    }

    function refName2Txt(value: string | undefined, isPsw: boolean) {
        return value ? pickRefsList(isPsw)[value].s : '';
    }

    function refName2Full(value: string | undefined, isPsw: boolean) {
        return value ? pickRefsList(isPsw)[value].f : ''; //TODO: we can use placeholder on top of input (ingone all events on it) and do multiple lines
    }

    function valueAs2Idx(valueAs: ValueAs) {
        return valueAs === ValueAs.askReuse ? 0 : valueAs === ValueAs.askConfirm ? 1 : valueAs === ValueAs.askAlways ? 2 : 0;
    }
}

export function Column3_Value({ useItAtom, valueLifeAtom, choosevalue, className, ...rest }: { useItAtom: PA<boolean>; valueLifeAtom: PA<ValueLife>; choosevalue: string | undefined; } & InputHTMLAttributes<HTMLInputElement>) {

    const [useIt, setUseIt] = useAtom(useItAtom);
    const [valueLife, setValueLife] = useAtom(valueLifeAtom);

    const {
        dropdown,
        dropdownIdxs,
        dropdownSelectedIndex,

        idxToRefs,
        idxToValues,
        listValues,
        isPsw,

        inputText,
        showAsRef,
        disabled,
        title,
    } = getValueUiState(valueLife, choosevalue);

    const showInputText = !useIt && !valueLife.isRef && !valueLife.value;

    function mapIndexToValueLife(idx: number, v: ValueLife): ValueLife {
        const groupIdx = dropdownIdxs[idx];
        if (groupIdx === idxToRefs) {
            return { ...v, value: idx2RefName(idx - idxToRefs, isPsw), isRef: true, valueAs: ValueAs.askReuse, isNon: false, };
        } else if (groupIdx === idxToValues) {
            return { ...v, value: listValues[idx - idxToValues], isRef: false, valueAs: ValueAs.askReuse, isNon: false, };
        } else {
            return { ...v, value: '', isRef: false, valueAs: idx, isNon: false, };
        }
    }

    function onSetDropdownIndex(idx: number) {
        setValueLife((v) => mapIndexToValueLife(idx, v));
    }

    function onSetText(value: string) {
        setValueLife((v) => ({ ...v, value, isRef: false, valueAs: ValueAs.askReuse, isNon: false, }));
    }

    function onSetKey(event: React.KeyboardEvent) {
        showAsRef && isKeyToClearDefault(event.key) &&
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
                    showAsRef && !valueLife.isNon && "text-[0.6rem] !text-blue-400 cursor-default",
                    disabled && "pointer-events-none",
                )}
                value={showInputText ? '' : inputText}
                onChange={(event) => onSetText(event.target.value)}
                onKeyDown={onSetKey}
                onBlur={onBlur}
                readOnly={disabled}
                disabled={disabled}
                title={title}
                autoComplete="off" list="autocompleteOff" spellCheck={false}
            />
            {!!dropdown.length && Dropdown(useItAtom, dropdown, dropdownSelectedIndex, onSetDropdownIndex)}
        </div>
    );
}

//Note: Theoretically, two buttons cannot be selected. Only the first one will be pressed, but it depends on the application (submit vs. trigger).
