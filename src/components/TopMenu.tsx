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
import { foldAllCardsAtom, rightPanelValueAtom } from '../store/store';
import toast from 'react-hot-toast';

function MenuItemMarkSelected() {
    const [rightPanelValue] = useAtom(rightPanelValueAtom);
    const disabled = !rightPanelValue;
    return (
        <Item disabled={disabled} onClick={(event) => event.preventDefault()} title="Mark manifest. Select manifest first.">
            Select / Deselect mainfest
        </Item>
    );
}

function MenuItemConvert() {
    const [rightPanelValue] = useAtom(rightPanelValueAtom);
    const disabled = !rightPanelValue;
    return (
        <Item disabled={disabled} onClick={(event) => {event.preventDefault(); toast('Not implemented yet.', { style: { backgroundColor: '#f19700' } })}} title="Convert manual mode manifest to regular Chrome manifest. Select manifest first.">
            Convert manual to normal
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
                <Item className="!text-sm" onSelect={() => toggleFolding()}>Toggle cards folding</Item>
            </Content>
        </Menu>
    );
};

export default TopMenu;
