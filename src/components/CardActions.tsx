import React from 'react';
import { DropdownMenu as Menu, DropdownMenuContent as Content, DropdownMenuItem as Item, DropdownMenuSeparator as Separator, DropdownMenuTrigger as Trigger } from './UiDropdownMenu';

export const CardActions = ({ icon }: { icon: React.ReactNode; }) => {
    return (
        <Menu>
            <Trigger>
                {icon}
            </Trigger>

            <Content sideOffset={5}>
                <Item className="!text-sm" onSelect={() => console.log('selected 1')}>Convert 1</Item>
                <Separator />
                <Item className="!text-sm" onSelect={() => console.log('selected 2')}>Convert 2</Item>
                <Item>Convert 3</Item>
                <Item>Convert 3</Item>
            </Content>
        </Menu>
    );
};

export default CardActions;
