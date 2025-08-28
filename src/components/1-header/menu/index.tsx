import React from "react";
import { orderAtom, orderNames, sortByAtom, sortByNames, uiSizeAtom, uiSizeNames } from "@/store";
import { Menu, MenuContentPortal, MenuLabel, MenuRadioGroupValue, MenuSeparator, MenuSub, MenuSubContent, MenuTrigger, TriggerSubs } from "@ui/ui-dropdown-menu";
import { Command_Links, Command_ToggleFolding } from "./menu-commands";

export const Part0_TopMenu = ({ icon }: { icon: React.ReactNode; }) => {
    return (
        <Menu>
            <MenuTrigger>
                {icon}
            </MenuTrigger>

            <MenuContentPortal sideOffset={5}>
                {/* <Command_MarkSelected />
                    <Command_Convert /> */}

                <MenuLabel>Sort by</MenuLabel>
                <MenuRadioGroupValue radioAtom={sortByAtom} names={sortByNames} />

                <MenuSeparator />
                <MenuLabel>Sort order</MenuLabel>
                <MenuRadioGroupValue radioAtom={orderAtom} names={orderNames} />

                <MenuSeparator />
                <MenuSub>
                    <TriggerSubs label="File list" />
                    <MenuSubContent alignOffset={-29}>
                        <MenuLabel>Size</MenuLabel>
                        <MenuRadioGroupValue radioAtom={uiSizeAtom} names={uiSizeNames} />
                        
                        <MenuSeparator />
                        <Command_ToggleFolding />
                    </MenuSubContent>
                </MenuSub>

                <MenuSub>
                    <TriggerSubs label="Links" />
                    <MenuSubContent>
                        <Command_Links />
                    </MenuSubContent>
                </MenuSub>

            </MenuContentPortal>
        </Menu>
    );
};

//TODO: show title in compact form by point of interset
//sort titles
//filter titles and sort by: filename, url, app/website title
