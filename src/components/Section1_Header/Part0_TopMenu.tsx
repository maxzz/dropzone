import React from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { allCards, rightPanelData, selected4ActionAtom, uiSizeAtom, uiSizeNames } from '@/store';
import { Menu, MenuContent, MenuItem, MenuItemIndicator, MenuLabel, MenuPortal, MenuRadioGroup, MenuRadioItem, MenuSeparator, MenuSub, MenuSubContentPortal, MenuSubTrigger, MenuTrigger, RightSlot } from '@ui/UiDropdownMenu';
import toast from 'react-hot-toast';
import { IconChevronRight, IconDot } from '@ui/UIIconSymbols';

function MenuItemMarkSelected() {
    const [selectedAtoms, setSelectedAtoms] = useAtom(selected4ActionAtom);
    const rightPanelAtom = useAtomValue(rightPanelData.panelAtom);
    const disabled = !rightPanelAtom;
    function click() {
        if (rightPanelAtom) {
            const idx = selectedAtoms.find((atom) => rightPanelAtom === atom);
            setSelectedAtoms(idx ? selectedAtoms.filter((atom) => rightPanelAtom !== atom) : [...selectedAtoms, rightPanelAtom]);
        }
    }
    return (
        <MenuItem disabled={disabled} onClick={click} title="Mark manifest. Select manifest first.">
            Select / Deselect mainfest
        </MenuItem>
    );
}

function MenuItemConvert() {
    //const rightPanel = useAtomValue(rightPanelAtom);
    //const disabled = !rightPanel;
    const disabled = true;
    return (
        <MenuItem
            disabled={disabled}
            onClick={(event) => {
                event.preventDefault();
                toast('Not implemented yet.', { style: { backgroundColor: '#f19700' } });
            }}
            title="Convert manual mode manifest to regular Chrome manifest. Select manifest first."
        >
            Convert manual to normal
        </MenuItem>
    );
}

function MenuItemFolding() {
    const doToggleFolding = useSetAtom(allCards.doFoldAllCardsAtom);
    //const setBusy = useSetAtom(busyAtom);
    return (
        <MenuItem
            onSelect={async () => {
                doToggleFolding(); // setBusy('Folding...'); setTimeout(() => { doToggleFolding(); setBusy(''); }, 0); // still reflow problem
            }}
        >
            Toggle cards folding
        </MenuItem>
    );
}

function MenuItemLink() {
    return (
        <MenuItem
            onSelect={async () => {
                window.open('https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pmit1', '_blank');
            }}
        >
            PMIT version 1.0
        </MenuItem>
    );
}

function MenuItemUISizeSelect() {
    const [uiSize, setUiSize] = useAtom(uiSizeAtom);
    return (<>
        <MenuRadioGroup value={`${uiSize}`} onValueChange={(value) => setUiSize(+value)}>
            {uiSizeNames.map((name, idx) => (
                <MenuRadioItem value={`${idx}`} key={idx}>
                    <MenuItemIndicator>
                        <IconDot className="w-3 h-3" />
                    </MenuItemIndicator>
                    {name}
                </MenuRadioItem>
            ))}
        </MenuRadioGroup>
    </>);
}

export const Part0_TopMenu = ({ icon }: { icon: React.ReactNode; }) => {
    return (
        <Menu>
            <MenuTrigger>
                {icon}
            </MenuTrigger>

            <MenuPortal container={document.getElementById('portal')}>
                <MenuContent sideOffset={5}>
                    {/* <MenuItemMarkSelected />
                    <MenuItemConvert /> */}

                    <MenuLabel>File list size:</MenuLabel>
                    <MenuItemUISizeSelect />

                    <MenuSeparator />
                    <MenuItemFolding />

                    <MenuSub>
                        <MenuSubTrigger>
                            Links
                            <RightSlot>
                                <IconChevronRight className="w-4 h-4" />
                            </RightSlot>
                        </MenuSubTrigger>

                        <MenuSubContentPortal sideOffset={2} alignOffset={-5}>
                            <MenuItemLink />
                        </MenuSubContentPortal>
                    </MenuSub>

                </MenuContent>
            </MenuPortal>
        </Menu>
    );
};

//TODO: show title in compact form by point of interset
//sort titles
//filter titles and sort by: filename, url, app/website title
