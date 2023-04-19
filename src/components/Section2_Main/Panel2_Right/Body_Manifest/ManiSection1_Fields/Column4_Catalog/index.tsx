import React, { ChangeEvent, InputHTMLAttributes, useCallback, useMemo, useState } from "react";
import { atom, PrimitiveAtom as PA, useAtom, useAtomValue } from "jotai";
import { getMruFldCatForItemAtom } from "@/store";
import { CatalogItem, Meta } from "@/store/manifest";
import { CatalogDropdown, isKeyToClearDefault } from "./CatalogDropdown";
import { classNames } from "@/utils";

const CATALOG_No = "Not from catalog";
const CATALOG_More = "More fields ...";

type Column4_CatalogProps = {
    useItAtom: PA<boolean>;
    fieldCatAtom: PA<string>;
    onSelectCatItem: (item: CatalogItem | undefined) => void;
    field: Meta.Field;
};

export function Column4_Catalog(props: Column4_CatalogProps & InputHTMLAttributes<HTMLInputElement>) {
    const { useItAtom, onSelectCatItem, fieldCatAtom, field, className, ...rest } = props;

    const { catalogItemsByType, catalogItem, } = useAtomValue(getMruFldCatForItemAtom)(field.mani.password, field.mani.dbname);

    const dropdownItems = [CATALOG_No, ...catalogItemsByType.map((item) => item.dispname), '-', CATALOG_More];
    //const dropdownItems = useMemo(() => [CATALOG_No, ...catalogItemsByType.map((item) => item.dispname), '-', CATALOG_More], [catalogItemsByType]);
    let catalogItemIdx = (catalogItem ? catalogItemsByType.findIndex((item) => item === catalogItem) : -1) + 1; // +1 to skip CATALOG_No

    const textAtom = useState(atom(catalogItem?.dispname || CATALOG_No))[0];
    const [inputText, setInputTextText] = useAtom(textAtom);

    const [selectedIndex, setSelectedIndex] = useState(catalogItemIdx);

    const [useIt, setUseIt] = useAtom(useItAtom);
    //TODO: map it to/from catalog name

    // const onSetDropdownIndex = useCallback(function onSetDropdownIndex(idx: number) {
    //     setText(dropdownItems[idx]);
    //     setSelectedIndex(idx);
    // }, [dropdownItems]);

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
                className={classNames("px-2 py-3 h-8 !bg-primary-700 !text-primary-200 outline-none", ~selectedIndex && "text-[0.6rem] !text-blue-400")} //TODO: we can use placeholder on top and ingone all events on placeholder and do multiple lines
                multiple
                value={inputText}
                onChange={onSetInputText}
                onKeyDown={onSetKey}
                onBlur={onBlur}
                autoComplete="off" list="autocompleteOff" spellCheck={false}
            />

            <CatalogDropdown useItAtom={useItAtom} items={dropdownItems} selectedIndex={selectedIndex} onSetIndex={onSetDropdownIndex} />
        </div>
    );

    function onSetDropdownIndex(idx: number) {
        setInputTextText(dropdownItems[idx]);
        setSelectedIndex(idx);
    }

    function onSetInputText(event: ChangeEvent<HTMLInputElement>) {
        const value: string = event.target.value;
        if (value) {
            setInputTextText(value);
            setSelectedIndex(-1);
        }
        else {
            setInputTextText(CATALOG_No);
            setSelectedIndex(0);
        };
    }

    function onSetKey(event: React.KeyboardEvent) {
        if (~selectedIndex && isKeyToClearDefault(event.key)) {
            setInputTextText('');
            setSelectedIndex(-1);
        }
    }

    function onBlur() {
        ~~selectedIndex && !inputText && onSetDropdownIndex(0);
    }
}

//TODO: buttons are not stored in field catalog
//TODO: buttons should not have dbname (it is useless, they don't have state to save)
