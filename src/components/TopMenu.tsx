import React from 'react';
import {
    DropdownMenu as Menu,
    DropdownMenuContent as Content,
    DropdownMenuItem as Item,
    DropdownMenuSeparator as Separator,
    DropdownMenuTrigger as Trigger
} from './UI/UiDropdownMenu';

export const TopMenu = ({ icon }: { icon: React.ReactNode; }) => {
    return (
        <Menu>
            <Trigger>
                {icon}
            </Trigger>

            <Content sideOffset={5}>
                <Item className="!text-sm" onSelect={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log({event});
                    
                    console.log('selected 1');
                }}>Toggle folding of all cards</Item>
                <Separator />
                <Item>More</Item>
            </Content>
        </Menu>
    );
};

export default TopMenu;
