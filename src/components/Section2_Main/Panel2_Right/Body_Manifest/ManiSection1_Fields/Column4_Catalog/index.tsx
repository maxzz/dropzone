import React, { InputHTMLAttributes, useState } from "react";
import { atom, PrimitiveAtom as PA, useAtom, useAtomValue } from "jotai";
import { FieldCatalogItemAtom, FieldCatalogPswItemsAtom, FieldCatalogTxtItemsAtom } from "@/store";
import { CatalogItem, Meta } from "@/store/manifest";
import { CatalogDropdown, isKeyToClearDefault } from "./CatalogDropdown";
import { classNames } from "@/utils";

const CATALOG_No = "Not from catalog";
const CATALOG_More = "Manage fields ...";

type Column4_CatalogProps = {
    useItAtom: PA<boolean>;
    fieldCatAtom: PA<string>;
    onSelectCatItem: (item: CatalogItem | undefined) => void;
    field: Meta.Field;
};

export function Column4_Catalog(props: Column4_CatalogProps & InputHTMLAttributes<HTMLInputElement>) {
    const { useItAtom, onSelectCatItem, fieldCatAtom, field, className, ...rest } = props;

    const catalogItemsByType = useAtomValue(field.mani.password ? FieldCatalogPswItemsAtom : FieldCatalogTxtItemsAtom);
    const catalogItem = useAtomValue(FieldCatalogItemAtom)(field.mani.dbname);
    const catalogName = catalogItem?.dispname;

    const dropdownItems = [CATALOG_No, ...catalogItemsByType.map((item) => item.dispname), '-', CATALOG_More];

    const textAtom = useState(atom(catalogName || CATALOG_No))[0];
    const [text, setText] = useAtom(textAtom);

    const [selectedIndex, setSelectedIndex] = useState(catalogName ? -1 : 0); // TODO: instead of 0 find real ref

    const [useIt, setUseIt] = useAtom(useItAtom);
    //TODO: map it to/from catalog name

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
                value={text}
                onChange={(event) => onSetInputText(event.target.value)}
                onKeyDown={onSetKey}
                onBlur={onBlur}
                autoComplete="off" list="autocompleteOff" spellCheck={false}
            />

            {CatalogDropdown(useItAtom, dropdownItems, selectedIndex, onSetDropdownIndex)}
        </div>
    );

    function onSetDropdownIndex(idx: number) {
        setText(dropdownItems[idx]);
        setSelectedIndex(idx);
    }

    function onSetInputText(value: string) {
        if (value) {
            setText(value);
            setSelectedIndex(-1);
        }
        else {
            setText(dropdownItems[0]);
            setSelectedIndex(0);
        };
    }

    function onSetKey(event: React.KeyboardEvent) {
        if (~selectedIndex && isKeyToClearDefault(event.key)) {
            setText('');
            setSelectedIndex(-1);
        }
    }

    function onBlur() {
        ~~selectedIndex && !text && onSetDropdownIndex(0);
    }
}

//TODO: buttons are not stored in field catalog
//TODO: buttons should not have dbname (it is useless, they don't have state to save)
