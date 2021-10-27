import React from 'react';
import {
    DropdownMenu as Menu,
    DropdownMenuContent as Content,
    DropdownMenuItem as Item,
    DropdownMenuSeparator as Separator,
    DropdownMenuTrigger as Trigger
} from '../UI/UiDropdownMenu';
import toast from 'react-hot-toast';
import { FileUsAtom } from '../../store/store';
import { convertToXml } from '../../store/manifest/xml-to-js';

function saveXmlFile(fileUsAtom: FileUsAtom) {
    convertToXml(fileUsAtom);
}

export const CardTitleMenu = ({ fileUsAtom, icon }: { fileUsAtom: FileUsAtom; icon: React.ReactNode; }) => {
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
