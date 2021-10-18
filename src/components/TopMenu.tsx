import React from 'react';
import {
    DropdownMenu as Menu,
    DropdownMenuContent as Content,
    DropdownMenuItem as Item,
    DropdownMenuSeparator as Separator,
    DropdownMenuTrigger as Trigger,
} from './UI/UiDropdownMenu';
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { busyAtom, FileUsAtom, foldAllCardsAtom, rightPanelValueAtom, selected4Action } from '../store/store';
import toast from 'react-hot-toast';

function MenuItemMarkSelected() {
    const [selectedAtoms, setSelectedAtoms] = useAtom(selected4Action);
    const [rightPanelValue] = useAtom(rightPanelValueAtom);
    const disabled = !rightPanelValue;
    function click() {
        if (!disabled) {
            const idx = selectedAtoms.find((atom) => rightPanelValueAtom === atom);
            //console.log('items', selectedAtoms.map(_ => _.toString()), rightPanelValueAtom.toString());

            if (idx) {
                const newSelection = selectedAtoms.filter((atom) => rightPanelValueAtom !== atom);
                //console.log('add items', newSelection.map(_ => _.toString()), rightPanelValueAtom.toString());
                setSelectedAtoms(newSelection);
            } else {
                //console.log('rem items', [...selectedAtoms, rightPanelValueAtom as FileUsAtom].map(_ => _.toString()), rightPanelValueAtom.toString());
                setSelectedAtoms([...selectedAtoms, rightPanelValueAtom as FileUsAtom]);
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
    const [rightPanelValue] = useAtom(rightPanelValueAtom);
    const disabled = !rightPanelValue;
    return (
        <Item disabled={disabled} onClick={(event) => { event.preventDefault(); toast('Not implemented yet.', { style: { backgroundColor: '#f19700' } }); }} title="Convert manual mode manifest to regular Chrome manifest. Select manifest first.">
            Convert manual to normal
        </Item>
    );
}

function MenuItemFolding() {
    const toggleFolding = useUpdateAtom(foldAllCardsAtom);
    const setBusy = useUpdateAtom(busyAtom);
    return (
        <Item className="" onSelect={async () => {
            setBusy('Folding...');
            toggleFolding();
            setBusy('');
        }}>Toggle cards folding</Item>
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
                <Item className="" onSelect={() => toggleFolding()}>Toggle cards folding</Item>
                <MenuItemFolding />
            </Content>
        </Menu>
    );
};

export default TopMenu;
