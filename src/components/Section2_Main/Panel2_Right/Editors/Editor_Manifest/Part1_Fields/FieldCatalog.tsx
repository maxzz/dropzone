import React, { InputHTMLAttributes, useState } from "react";
import { atom, PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { FieldTyp, Meta, references, ValueAs, valueAsNames, ValueLife } from "@/store/manifest";
import { Dropdown, isKeyClearDefault } from "./Dropdown";
import { classNames } from "@/utils/classnames";
import { FieldCatalogItemsAtom, getCatalogName } from "@/store";

const catalogNo = "Not from catalog";
const catalogMore = "More fields ...";

export function FieldCatalog({ useItAtom, field, className, ...rest }: { useItAtom: PrimitiveAtom<boolean>; field: Meta.Field; } & InputHTMLAttributes<HTMLInputElement>) {
    const catalogNames = useAtomValue(FieldCatalogItemsAtom);
    const { name: catalogName, names } = getCatalogName(catalogNames, field.mani.password, field.mani.dbname); //TODO: might need memo

    const textAtom = useState(atom(catalogName ? catalogName : catalogNo))[0];
    const [text, setText] = useAtom(textAtom);

    const items = [catalogNo, ...names, '-', catalogMore];

    const [selectedIndex, setSelectedIndex] = useState(catalogName ? -1 : 0); // TODO: instead of 0 find real ref

    const onSetIndex = (idx: number) => (setText(items[idx]), setSelectedIndex(idx));
    const onSetText = (value: string) => (value ? (setText(value), setSelectedIndex(-1)) : (setText(items[0]), setSelectedIndex(0)));
    const onSetKey = (event: React.KeyboardEvent) => ~selectedIndex && isKeyClearDefault(event.key) && (setText(''), setSelectedIndex(-1));
    const onBlur = () => ~~selectedIndex && !text && onSetIndex(0);

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

            {Dropdown(useItAtom, items, selectedIndex, onSetIndex)}
        </div>
    );
}
