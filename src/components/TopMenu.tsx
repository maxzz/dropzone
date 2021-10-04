import { useUpdateAtom } from 'jotai/utils';
import React from 'react';
import { foldAllCardsAtom } from '../store/store';
import {
    DropdownMenu as Menu,
    DropdownMenuContent as Content,
    DropdownMenuItem as Item,
    DropdownMenuSeparator as Separator,
    DropdownMenuTrigger as Trigger
} from './UI/UiDropdownMenu';

export const TopMenu = ({ icon }: { icon: React.ReactNode; }) => {
    const toggleFolding = useUpdateAtom(foldAllCardsAtom);
    return (
        <Menu>
            <Trigger>
                {icon}
            </Trigger>

            <Content sideOffset={5}>
                <Item className="!text-sm" onSelect={() => toggleFolding()}>Toggle cards folding</Item> {/* Toggle collapsed content of cards */}
                <Separator />
                <Item>More to come</Item>
            </Content>
        </Menu>
    );
};

export default TopMenu;
