import React from 'react';
import toast from 'react-hot-toast';
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
                <Item className="!text-sm"
                    onClick={(event) => {
                        event.stopPropagation(); toast('Not imlemented yet', { style: { backgroundColor: 'tomato' } });
                    }}
                >
                    Convert manual to normal
                </Item>

                <Item className="!text-sm"
                    onClick={(event) => {
                        event.stopPropagation(); toast('Not imlemented yet', { style: { backgroundColor: 'tomato' } });
                    }}
                >
                    Merge two manifests
                </Item>

                <Separator />
                <Item disabled={true} >Save</Item>
            </Content>
        </Menu>
    );
};

export default CardTitleMenu;
