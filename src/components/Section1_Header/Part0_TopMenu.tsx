import React from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { doFoldAllCardsAtom, selected4ActionAtom } from '@/store';
import { rightPanelData } from '@/store';
import {
    DropdownMenu as Menu,
    DropdownMenuContent as Content,
    DropdownMenuItem as Item,
    DropdownMenuSeparator as Separator,
    DropdownMenuTrigger as Trigger,
} from '@ui/UiDropdownMenu';
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
        <Item disabled={disabled} onClick={click} title="Mark manifest. Select manifest first.">
            Select / Deselect mainfest
        </Item>
    );
}

function MenuItemConvert() {
    //const rightPanel = useAtomValue(rightPanelAtom);
    //const disabled = !rightPanel;
    const disabled = true;
    return (
        <Item
            disabled={disabled}
            onClick={(event) => {
                event.preventDefault();
                toast('Not implemented yet.', { style: { backgroundColor: '#f19700' } });
            }}
            title="Convert manual mode manifest to regular Chrome manifest. Select manifest first."
        >
            Convert manual to normal
        </Item>
    );
}

function MenuItemFolding() {
    const doToggleFolding = useSetAtom(doFoldAllCardsAtom);
    //const setBusy = useSetAtom(busyAtom);
    return (
        <Item
            onSelect={async () => {
                doToggleFolding(); // setBusy('Folding...'); setTimeout(() => { doToggleFolding(); setBusy(''); }, 0); // still reflow problem
            }}
        >
            Toggle cards folding
        </Item>
    );
}

export const Part0_TopMenu = ({ icon }: { icon: React.ReactNode; }) => {
    return (
        <Menu>
            <Trigger>
                {icon}
            </Trigger>

            <Content sideOffset={5}>
                <MenuItemMarkSelected />
                <MenuItemConvert />
                <Separator />
                <MenuItemFolding />
            </Content>
        </Menu>
    );
};

//TODO: show title in compact form by point of interset
//sort titles
//filter titles and sort by: filename, url, app/website title
