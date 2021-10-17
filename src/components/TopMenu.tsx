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

function MenuItemConvert() {
    const [rightPanelValue] = useAtom(rightPanelValueAtom);
    const isEnabled = !!rightPanelValue;
    return (
        <Item disabled title="Convert manual mode manifest to regular Chrome manifest">Convert Manual to Normal</Item>
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
                <MenuItemConvert />
                <Item className="!text-sm" onSelect={() => toggleFolding()}>Toggle cards folding</Item>
                <Separator />
                <Item>Help</Item>
            </Content>
        </Menu>
    );
};

export default TopMenu;
