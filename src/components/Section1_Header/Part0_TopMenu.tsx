import React from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { allCards, rightPanelData, selected4ActionAtom, sortByAtom, sortByNames, uiSizeAtom, uiSizeNames } from '@/store';
import toast from 'react-hot-toast';
import { IconDot } from '@ui/UIIconSymbols';
import { Menu, MenuContentPortal, MenuItem, MenuItemIndicator, MenuLabel, MenuRadioGroup, MenuRadioItem, MenuSeparator, MenuSub, MenuSubContent, MenuTrigger, TriggerSubs } from '@ui/UiDropdownMenu';

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
            Toggle all cards folding
        </MenuItem>
    );
}

function Command_Links() {
    const items = [
        {
            txt: "PMIT version 1.0",
            url: "https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pmit1",
        },
        {
            txt: "QA website",
            url: "https://www.hidglobal.com/sites/default/files/crossmatch/AltusAddons/g01/pageqa/index.html",
        },
        {
            txt: "All projects catalog",
            url: "https://maxzz.github.io",
        },
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

function Command_SortBySelect() {
    const [uiSize, setUiSize] = useAtom(sortByAtom);
    return (<>
        <MenuRadioGroup value={`${uiSize}`} onValueChange={(value) => setUiSize(+value)}>
            {sortByNames.map((name, idx) => (
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

            <MenuContentPortal sideOffset={5}>
                {/* <Command_MarkSelected />
                    <Command_Convert /> */}

                <MenuLabel>File list size:</MenuLabel>
                <Command_UISizeSelect />

                <MenuSeparator />
                <MenuLabel>Sort by:</MenuLabel>
                <Command_SortBySelect />
                <MenuSeparator />
                <Command_ToggleFolding />

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
