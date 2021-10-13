import React from 'react';
import { Dropdown } from 'semantic-ui-react';
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

import "../../assets/semantic.min.css";

export const DropdownExampleDropdown = () => (
    <Dropdown text='File'>
        <Dropdown.Menu>
            <Dropdown.Item text='New' />
            <Dropdown.Item text='Open...' description='ctrl + o' />
            <Dropdown.Item text='Save as...' description='ctrl + s' />
            <Dropdown.Item text='Rename' description='ctrl + r' />
            <Dropdown.Item text='Make a copy' />
            <Dropdown.Item icon='folder' text='Move to folder' />
            <Dropdown.Item icon='trash' text='Move to trash' />
            <Dropdown.Divider />
            <Dropdown.Item text='Download As...' />
            <Dropdown.Item text='Publish To Web' />
            <Dropdown.Item text='E-mail Collaborators' />
        </Dropdown.Menu>
    </Dropdown>
);
