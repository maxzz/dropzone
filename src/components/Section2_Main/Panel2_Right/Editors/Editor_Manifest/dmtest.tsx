import * as prim from "@radix-ui/react-dropdown-menu";
import {
    CaretRightIcon,
    CheckIcon,
    CropIcon,
    EyeClosedIcon,
    EyeOpenIcon,
    FileIcon,
    FrameIcon,
    GridIcon,
    Link2Icon,
    MixerHorizontalIcon,
    PersonIcon,
    TransparencyGridIcon,
} from "@radix-ui/react-icons";
import { classNames as cx } from "@/utils/classnames";
import React, { ReactNode, useState } from "react";
//import Button from "./shared/Button";

interface RadixMenuItem {
    label: string;
    shortcut?: string;
    icon?: ReactNode;
}

interface User {
    name: string;
    url?: string;
}

const generalMenuItems: RadixMenuItem[] = [
    {
        label: "New File",
        icon: <FileIcon className="mr-2 h-3.5 w-3.5" />,
        shortcut: "⌘+N",
    },
    {
        label: "Settings",
        icon: <MixerHorizontalIcon className="mr-2 h-3.5 w-3.5" />,
        shortcut: "⌘+,",
    },
];

const regionToolMenuItems: RadixMenuItem[] = [
    {
        label: "Frame",
        icon: <FrameIcon className="mr-2 h-3.5 w-3.5" />,
        shortcut: "⌘+F",
    },
    {
        label: "Crop",
        icon: <CropIcon className="mr-2 h-3.5 w-3.5" />,
        shortcut: "⌘+S",
    },
];

const users: User[] = [
    {
        name: "Adam",
        url: "https://github.com/adamwathan.png",
    },
    {
        name: "Steve",
        url: "https://github.com/steveschoger.png",
    },
    {
        name: "Robin",
        url: "https://github.com/robinmalfait.png",
    },
];

interface Props { }

export const DropdownMenu = (props: Props) => {
    const [showGrid, setShowGrid] = useState(false);
    const [showUi, setShowUi] = useState(false);

    const cnames = "flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none";
    const cnames2 = "data-highlighted:bg-red-200";
    //"text-gray-400 focus:bg-gray-200 dark:text-gray-500 dark:focus:bg-gray-900",
    return (
        <div className="relative inline-block text-left">
            <prim.Root>
                <prim.Trigger asChild>
                    {/* <Button>Click</Button> */}
                    <button>Click</button>
                </prim.Trigger>

                <prim.Portal>
                    <prim.Content
                        align="center"
                        sideOffset={5}
                        className={cx(
                            "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
                            "w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56",
                            "bg-white dark:bg-gray-800"
                        )}
                    >
                        {generalMenuItems.map(({ label, icon, shortcut }, i) => (
                            <prim.Item
                                className={cx(
                                    cnames,
                                    cnames2,
                                )}
                                key={`${label}-${i}`}
                            >
                                {icon}
                                <span className="flex-grow text-gray-700 dark:text-gray-300">
                                    {label}
                                </span>
                                {shortcut && <span className="text-xs">{shortcut}</span>}
                            </prim.Item>
                        ))}

                        <prim.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />

                        <prim.CheckboxItem
                            checked={showGrid}
                            onCheckedChange={setShowGrid}
                            className={cx(
                                "w-full",
                                cnames,
                                cnames2,
                            )}
                        >
                            {showGrid ? <GridIcon className="mr-2 h-4 w-4" /> : <TransparencyGridIcon className="mr-2 h-3.5 w-3.5 text-gray-700 dark:text-gray-300" />}
                            <span className="flex-grow text-gray-700 dark:text-gray-300">
                                Show Grid
                            </span>
                            <prim.ItemIndicator>
                                <CheckIcon className="h-3.5 w-3.5" />
                            </prim.ItemIndicator>
                        </prim.CheckboxItem>

                        <prim.CheckboxItem
                            checked={showUi}
                            onCheckedChange={setShowUi}
                            className={cx(
                                "w-full",
                                cnames,
                                cnames2,
                            )}
                        >
                            {showUi ? <EyeOpenIcon className="mr-2 h-3.5 w-3.5" /> : <EyeClosedIcon className="mr-2 h-3.5 w-3.5" />}
                            <span className="flex-grow text-gray-700 dark:text-gray-300">
                                Show UI
                            </span>
                            <prim.ItemIndicator>
                                <CheckIcon className="h-3.5 w-3.5" />
                            </prim.ItemIndicator>
                        </prim.CheckboxItem>

                        <prim.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />

                        <prim.Label className="select-none px-2 py-2 text-xs text-gray-700 dark:text-gray-200">
                            Region Tools
                        </prim.Label>

                        {regionToolMenuItems.map(({ label, icon, shortcut }, i) => (
                            <prim.Item
                                key={`${label}-${i}`}
                                className={cx(
                                    cnames,
                                    cnames2,
                                )}
                            >
                                {icon}
                                <span className="flex-grow text-gray-700 dark:text-gray-300">
                                    {label}
                                </span>
                                {shortcut && <span className="text-xs">{shortcut}</span>}
                            </prim.Item>
                        ))}

                        <prim.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />

                        <prim.Sub>
                            <prim.SubTrigger
                                className={cx(
                                    "w-full",
                                    cnames,
                                    cnames2,
                                    "data-state-open:bg-green-400",
                                )}
                            >
                                <Link2Icon className="mr-2 h-3.5 w-3.5" />
                                <span className="flex-grow text-gray-700 dark:text-gray-300">
                                    Share
                                </span>
                                <CaretRightIcon className="h-3.5 w-3.5" />
                            </prim.SubTrigger>

                            <prim.Portal>
                                <prim.SubContent
                                    className={cx(
                                        "origin-radix-dropdown-menu radix-side-right:animate-scale-in",
                                        "w-full rounded-md px-1 py-1 text-xs shadow-md",
                                        "bg-white dark:bg-gray-800"
                                    )}
                                >
                                    {users.map(({ name, url }, i) => (
                                        <prim.Item
                                            className={cx(
                                                "w-28 md:w-32",
                                                cnames,
                                                cnames2,
                                            )}
                                            key={`${name}-${i}`}
                                        >
                                            {url ? <img className="mr-2.5 h-6 w-6 rounded-full" src={url} /> : <PersonIcon className="mr-2.5 h-6 w-6" />}

                                            <span className="text-gray-700 dark:text-gray-300">
                                                {name}
                                            </span>
                                        </prim.Item>
                                    ))}
                                </prim.SubContent>
                            </prim.Portal>
                        </prim.Sub>
                    </prim.Content>
                </prim.Portal>
            </prim.Root>
        </div>
    );
};
