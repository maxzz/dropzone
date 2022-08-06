import React from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { allCards, rightPanelData, selected4ActionAtom, uiSizeAtom, uiSizeNames } from '@/store';
import toast from 'react-hot-toast';
import { IconChevronRight, IconDot } from '@ui/UIIconSymbols';
import { Menu, MenuContent, MenuItem, MenuItemIndicator, MenuLabel, MenuPortal, MenuRadioGroup, MenuRadioItem, MenuSeparator, MenuSub, MenuSubContentPortal, MenuSubTrigger, MenuTrigger, RightSlot } from '@ui/UiDropdownMenu';

function Command_MarkSelected() {
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

function Command_Convert() {
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

function Command_ToggleFolding() {
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

function Command_Links() {
    const items = [
        {
            txt: "PMIT version 1.0",
            url: "https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pmit1",
        }, {
            txt: "All projects directory",
            url: "https://maxzz.github.io",
        }, {
            txt: "QA website",
            url: "https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pageqa/index.html",
        }
    ];
    return (<>{items.map(({ txt, url }, idx) => <MenuItem onSelect={async () => window.open(url, '_blank')} key={idx}> {txt} </MenuItem>)}</>);
}

function Command_UISizeSelect() {
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

function TriggerSubs({ label }: { label: string; }) {
    return (
        <MenuSubTrigger>
            {label}
            <RightSlot>
                <IconChevronRight className="w-4 h-4" />
            </RightSlot>
        </MenuSubTrigger>
    );
}

export const Part0_TopMenu = ({ icon }: { icon: React.ReactNode; }) => {
    return (
        <Menu>
            <MenuTrigger>
                {icon}
            </MenuTrigger>

            <MenuPortal container={document.getElementById('portal')}>
                <MenuContent sideOffset={5}>
                    {/* <Command_MarkSelected />
                    <Command_Convert /> */}

                    <MenuLabel>File list size:</MenuLabel>
                    <Command_UISizeSelect />

                    <MenuSeparator />
                    <Command_ToggleFolding />

                    <MenuSub>
                        <TriggerSubs label="Links"/>
                        {/* <MenuSubTrigger>
                            Links
                            <RightSlot>
                                <IconChevronRight className="w-4 h-4" />
                            </RightSlot>
                        </MenuSubTrigger> */}

                        <MenuSubContentPortal sideOffset={2} alignOffset={-5}>
                            <Command_Links />
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
