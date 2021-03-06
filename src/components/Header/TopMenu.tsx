import React from 'react';
import {
    DropdownMenu as Menu,
    DropdownMenuContent as Content,
    DropdownMenuItem as Item,
    DropdownMenuSeparator as Separator,
    DropdownMenuTrigger as Trigger,
} from '../UI/UiDropdownMenu';
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { foldAllCardsAtom, rightPanelAtom, selected4ActionAtom } from '../../store/store';
import toast from 'react-hot-toast';

function MenuItemMarkSelected() {
    const [selectedAtoms, setSelectedAtoms] = useAtom(selected4ActionAtom);
    const [rightPanel] = useAtom(rightPanelAtom);
    const disabled = !rightPanel;
    function click() {
        if (rightPanel) {
            const idx = selectedAtoms.find((atom) => rightPanel === atom);
            //console.log('items', selectedAtoms.map(_ => _.toString()), rightPanel.toString());

            if (idx) {
                const newSelection = selectedAtoms.filter((atom) => rightPanel !== atom);
                //console.log('add items', newSelection.map(_ => _.toString()), rightPanel.toString());
                setSelectedAtoms(newSelection);
            } else {
                //console.log('rem items', [...selectedAtoms, rightPanel as FileUsAtom].map(_ => _.toString()), rightPanel.toString());
                setSelectedAtoms([...selectedAtoms, rightPanel]);
            }
        }
    }
    return (
        <Item disabled={disabled} onClick={click} title="Mark manifest. Select manifest first.">
            Select / Deselect mainfest
        </Item>
    );
}

function MenuItemConvert() {
    const [rightPanel] = useAtom(rightPanelAtom);
    //const disabled = !rightPanel;
    const disabled = true;
    return (
        <Item
            disabled={disabled}
            onClick={(event) => {
                event.preventDefault(); toast('Not implemented yet.', { style: { backgroundColor: '#f19700' } });
            }}
            title="Convert manual mode manifest to regular Chrome manifest. Select manifest first."
        >
            Convert manual to normal
        </Item>
    );
}

function MenuItemFolding() {
    const toggleFolding = useUpdateAtom(foldAllCardsAtom);
    //const setBusy = useUpdateAtom(busyAtom);
    return (
        <Item
            onSelect={async () => {
                toggleFolding(); // setBusy('Folding...'); setTimeout(() => { toggleFolding(); setBusy(''); }, 0); // still reflow problem
            }}
        >
            Toggle cards folding
        </Item>
    );
}

export const TopMenu = ({ icon }: { icon: React.ReactNode; }) => {
    const toggleFolding = useUpdateAtom(foldAllCardsAtom);
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

export default TopMenu;

//TODO: show title in compact form by point of interset
//sort titles
//filter titles and sort by: filename, url, app/website title
