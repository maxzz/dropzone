import React from 'react';
import {
    DropdownMenu as Menu,
    DropdownMenuContent as Content,
    DropdownMenuItem as Item,
    DropdownMenuSeparator as Separator,
    DropdownMenuTrigger as Trigger
} from '../UI/UiDropdownMenu';
import toast from 'react-hot-toast';
import { useAtom } from 'jotai';
import { FileUsAtom } from '../../store/store';
import { convertToXml } from '../../store/manifest/xml-to-js';
import Dialog from '../UI/UIDialog';

function NewContent({ setShow }: { setShow?: (v: boolean) => void; }) {
    return (
        <div className="">
            <div className="">-=------------------------</div>
            <div className="">-=------------------------</div>
            <div className="">-=------------------------</div>
            <div className="">-=------------------------</div>
            <div className="">-=------------------------</div>
        </div>

    );
}

export const CardTitleMenu = ({ fileUsAtom, icon }: { fileUsAtom: FileUsAtom; icon: React.ReactNode; }) => {
    const [fileUs] = useAtom(fileUsAtom);

    function saveXmlFile() {
        const res = convertToXml(fileUs);
        if (res.err) {
            toast(res.err, { style: { backgroundColor: 'tomato' } });
        }
    }

    return (
        <Menu>
            <Trigger>
                {icon}
            </Trigger>

            <Content sideOffset={5}>

                <Dialog trigger={
                    <Item className="!text-sm"
                    // onClick={(event) => {
                    //     event.stopPropagation();
                    //     event.preventDefault();
                    //     saveXmlFile();
                    // }}
                    >
                        trigger
                    </Item>
                }>
                    <NewContent ></NewContent>
                </Dialog>

                <Item className="!text-sm"
                    onClick={(event) => {
                        event.stopPropagation();
                        saveXmlFile();
                    }}
                >
                    Convert manual to normal
                </Item>

                <Item className="!text-sm"
                    onClick={(event) => {
                        event.stopPropagation();
                        toast('Not imlemented yet', { style: { backgroundColor: 'tomato' } });
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
