import React, { InputHTMLAttributes, useState } from "react";
import { atom, PrimitiveAtom as PA, useAtom, useAtomValue } from "jotai";
import { FieldCatalogItemsAtom, getCatalogName } from "@/store";
import { Meta } from "@/store/manifest";
import { CatalogDropdown, isKeyToClearDefault } from "./CatalogDropdown";
import { classNames } from "@/utils";
import { FieldCatalogItemsByTypeAtom, getFieldCatalogItem } from "@/store/store-file-catalog";

const CATALOG_No = "Not from catalog";
const CATALOG_More = "Manage fields ...";

export function Column4_Catalog(props: { useItAtom: PA<boolean>; fieldCatAtom: PA<string>; field: Meta.Field; } & InputHTMLAttributes<HTMLInputElement>) {
    const { useItAtom, fieldCatAtom, field, className, ...rest } = props;

    const catalogItems = useAtomValue(FieldCatalogItemsAtom);
    const catalogItem = getFieldCatalogItem(catalogItems, field.mani.dbname);

    const catalogByType = useAtomValue(FieldCatalogItemsByTypeAtom);
    const catalogItemsByType = catalogByType(!!field.mani.password);
    const catalogName = catalogItem?.dispname;

    const textAtom = useState(atom(catalogName ? catalogName : CATALOG_No))[0];
    const [text, setText] = useAtom(textAtom);

    const dropdownItems = [CATALOG_No, ...catalogItemsByType.map((item) => item.dispname), '-', CATALOG_More];

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
                onChange={(event) => onSetText(event.target.value)}
                onKeyDown={onSetKey}
                onBlur={onBlur}
                autoComplete="off" list="autocompleteOff" spellCheck={false}
            />

            {CatalogDropdown(useItAtom, dropdownItems, selectedIndex, onSetIndex)}
        </div>
    );

    function onSetIndex(idx: number) {
        setText(dropdownItems[idx]);
        setSelectedIndex(idx);
    }

    function onSetText(value: string) {
        value
            ? (setText(value), setSelectedIndex(-1))
            : (setText(dropdownItems[0]), setSelectedIndex(0));
    }

    function onSetKey(event: React.KeyboardEvent) {
        ~selectedIndex && isKeyToClearDefault(event.key) &&
            (setText(''), setSelectedIndex(-1));
    }

    function onBlur() {
        ~~selectedIndex && !text && onSetIndex(0);
    }
}

//TODO: buttons are not stored in field catalog
