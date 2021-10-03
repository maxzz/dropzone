import React from 'react';
import {
    DropdownMenu as Menu,
    DropdownMenuContent as Content,
    DropdownMenuItem as Item,
    DropdownMenuSeparator as Separator,
    DropdownMenuTrigger as Trigger
} from '../UI/UiDropdownMenu';

export const CardTitleMenu = ({ icon }: { icon: React.ReactNode; }) => {
    return (
        <Menu>
            <Trigger>
                {icon}
            </Trigger>

            <Content sideOffset={5}>
                <Item className="!text-sm" onSelect={() => console.log('selected 1')}>Convert manual to normal</Item>
                <Item className="!text-sm" onSelect={() => console.log('selected 2')}>Merge two manifests </Item>
                <Separator />
                <Item>Save</Item>
            </Content>
        </Menu>
    );
};

export default CardTitleMenu;
