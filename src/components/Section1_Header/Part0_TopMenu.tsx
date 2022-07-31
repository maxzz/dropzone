import React from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { allCards, rightPanelData, selected4ActionAtom } from '@/store';
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from '@ui/UiDropdownMenu';
import toast from 'react-hot-toast';

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

export const Part0_TopMenu = ({ icon }: { icon: React.ReactNode; }) => {
    return (
        <Menu>
            <MenuTrigger>
                {icon}
            </MenuTrigger>

            <MenuContent sideOffset={5}>
                <MenuItemMarkSelected />
                <MenuItemConvert />
                <MenuSeparator />
                <MenuItemFolding />
            </MenuContent>
        </Menu>
    );
};

//TODO: show title in compact form by point of interset
//sort titles
//filter titles and sort by: filename, url, app/website title
