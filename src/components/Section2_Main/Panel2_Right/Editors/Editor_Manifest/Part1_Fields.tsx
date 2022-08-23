import React, { InputHTMLAttributes, useState } from 'react';
import { atom, PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { Meta, references, valueAsNames } from '@/store/manifest';
import { FormRowTypeIcon } from '@/components/Section2_Main/Panel1_FilesList/Card/Part2Card_FormBody/Part2Form_Fields/FieldRowTypeIcon';
import { IconChevronDown, IconDot } from '@ui/UIIconSymbols';
import { classNames } from '@/utils/classnames';
import * as menu from '@radix-ui/react-dropdown-menu';
import { FieldCatalogItemsAtom, getCatalogName } from '@/store';

function Dropdown(useItAtom: PrimitiveAtom<boolean>, items: string[], selectedIndex: number, onSetIndex: (idx: number) => void) {
    return (
        <menu.Root>
            <menu.Trigger asChild>
                <button className="px-2 border-l border-primary-800 outline-none group">
                    <IconChevronDown className="w-4 h-4 border-primary-500 rounded group-focus-within:border" />
                </button>
            </menu.Trigger>

            <menu.Portal container={document.getElementById('portal')}>
                <menu.Content
                    className={classNames(
                        "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
                        "px-1.5 py-1 grid grid-cols-1 rounded-lg shadow-md",
                        "bg-primary-100 dark:bg-gray-800 overflow-auto max-h-96 smallscroll"
                    )}
                >
                    {items.map((item, idx) => {
                        const isSelected = selectedIndex === idx;
                        const isSeparator = item === '-';
                        return isSeparator
                            ? <menu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" key={idx} />
                            :
                            <menu.Item
                                className={classNames(
                                    "relative pl-8 pr-4 py-2 text-xs flex items-center cursor-default select-none rounded-md outline-none",
                                    "text-primary-700 data-highlighted:bg-primary-700 data-highlighted:text-primary-100",
                                    isSelected && "bg-primary-300"
                                )}
                                onSelect={() => onSetIndex(idx)}
                                key={idx}
                            >
                                {isSelected && <IconDot className="absolute left-2 w-5 h-5 fill-primary-700" />}
                                <span className="flex-grow">{item}</span>
                            </menu.Item>;
                    })}
                </menu.Content>
            </menu.Portal>
        </menu.Root>
    );
}

function isKeyClearDefault(key: string) {
    return key === 'Backspace' || /^[a-z0-9]$/i.test(key);
}

const catalogNo = "Not from catalog";
const catalogMore = "More fields ...";

function FieldCatalog({ useItAtom, field, className, ...rest }: { useItAtom: PrimitiveAtom<boolean>; field: Meta.Field; } & InputHTMLAttributes<HTMLInputElement>) {
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

function FieldValue({ useItAtom, field, className, ...rest }: { useItAtom: PrimitiveAtom<boolean>; field: Meta.Field; } & InputHTMLAttributes<HTMLInputElement>) {
    const textAtom = useState(atom(field.mani.value ? field.mani.value : valueAsNames[0]))[0];
    const [text, setText] = useAtom(textAtom);

    const list = field.mani.password ? references.psw : references.txt;
    const items = [...valueAsNames, '-', ...Object.values(list)];

    const [selectedIndex, setSelectedIndex] = useState(field.mani.value ? -1 : 0); // TODO: instead of 0 find real ref

    const onSetIndex = (idx: number) => (setText(items[idx]), setSelectedIndex(idx));
    const onSetText = (value: string) => (value ? (setText(value), setSelectedIndex(-1)) : (setText(items[0]), setSelectedIndex(0)));
    const onSetKey = (event: React.KeyboardEvent) => ~selectedIndex && isKeyClearDefault(event.key) && (setText(''), setSelectedIndex(-1));
    const onBlur = () => ~~selectedIndex && !text && onSetIndex(0);

    const [useIt, setUseIt] = useAtom(useItAtom);
    //TODO: map it to/from ValueLife

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

function InputField({ useItAtom, valueAtom, className, ...rest }: { useItAtom: PrimitiveAtom<boolean>; valueAtom: PrimitiveAtom<string>; } & InputHTMLAttributes<HTMLInputElement>) {
    const [value, setValue] = useAtom(valueAtom);
    const [useIt, setUseIt] = useAtom(useItAtom);
    return (
        <input
            className={classNames(
                "px-2 py-3 h-8",
                "bg-primary-700 text-primary-200 focus:ring-offset-primary-800 ring-primary-600 focus:ring-primary-400",
                "focus:ring-1 focus:ring-offset-1",
                "outline-none rounded",
                !useIt && "opacity-30 cursor-pointer",
                className,
            )}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            autoComplete="off" list="autocompleteOff" spellCheck={false}
            {...rest}
        />
    );
}

function FieldType({ useItAtom, field, className, ...rest }: { useItAtom: PrimitiveAtom<boolean>; field: Meta.Field; } & InputHTMLAttributes<HTMLInputElement>) {
    const { password, type = 'NOTYPE' } = field.mani;
    const [useIt, setUseIt] = useAtom(useItAtom);
    return (
        <div className={classNames("flex items-center space-x-0.5", !useIt && "opacity-30 cursor-pointer", className)} {...rest}>
            <FormRowTypeIcon field={field.mani} className="w-5 h-5 text-primary-500" />
            <div className="text-primary-500">{`${password ? 'psw' : type}`}</div>
        </div>
    );
}

function TableRow({ field }: { field: Meta.Field; }) {
    const { useit, displayname, type: typ, value: val } = field.mani;

    const state = useState({
        useItAtom: atom<boolean>(!!useit),
        labelAtom: atom(displayname || ''),
        typeAtom: atom(''),
        valueAtom: atom<string>(val || ''),
        valueAsAtom: atom(val),
    })[0];

    const [useIt, setUseIt] = useAtom(state.useItAtom);
    const [label, setLabel] = useAtom(state.labelAtom);
    const [type, setType] = useAtom(state.typeAtom);
    const [value, setValue] = useAtom(state.valueAtom);
    const [valueAs, setValueAs] = useAtom(state.valueAsAtom);

    //const rowClassName = useIt ? "" : "opacity-30 pointer-events-none";
    const enableRow = () => !useIt && setUseIt(true);

    return (<>
        <input
            className="place-self-center w-4 h-4 form-checkbox text-primary-700 bg-primary-800 ring-1 focus:ring-1 focus:ring-offset-primary-800 ring-primary-600 focus:ring-primary-400 rounded"
            type="checkbox"
            checked={useIt}
            onChange={() => setUseIt(v => !v)}
        />

        <InputField useItAtom={state.useItAtom} valueAtom={state.labelAtom} placeholder="Label" onClick={enableRow} />
        <FieldCatalog useItAtom={state.useItAtom} field={field} onClick={enableRow} />
        <FieldValue useItAtom={state.useItAtom} field={field} onClick={enableRow} />
        <FieldType useItAtom={state.useItAtom} field={field} onClick={enableRow} />
    </>);
}

const titles = ["Use it", "Label", "Catalog", "Value", "Type"];
function TableHeader() {
    return (<>
        {titles.map((title, idx) => (
            <div className="mb-2 px-1 text-[.65rem] text-primary-400 border-primary-100 border-b" key={idx}>{title}</div>
        ))}
    </>);
}

export function Part1_Fields({ fields }: { fields: Meta.Field[] | undefined; }) {
    return (<>
        {fields
            ? <>
                <div className={classNames(
                    "p-2 grid grid-cols-[max-content_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-x-1 gap-y-1",
                    "bg-primary-800 text-primary-200 rounded-sm"
                )}>
                    <TableHeader />
                    {fields.map((field, idx) => <TableRow field={field} key={idx} />)}
                </div>
            </>
            : <div className="">no fields</div>
        }
    </>);
}
