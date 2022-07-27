import React from 'react';
import { useAtomValue } from 'jotai';
import { FileUsAtom } from '@/store';
import { convertToXml } from '@/store/manifest';
import { Dialog } from '@ui/UIDialog';
import {
    DropdownMenu as Menu,
    DropdownMenuContent as Content,
    DropdownMenuItem as Item,
    DropdownMenuSeparator as Separator,
    DropdownMenuTrigger as Trigger
} from '@ui/UiDropdownMenu';
import toast from 'react-hot-toast';

function NewContent({ setShow }: { setShow?: (v: boolean) => void; }) {
    return (
        <div className="text-primary-300">
            <div className="">-=------------------------</div>
            <div className="">-=------------------------</div>
            <div className="">-=------------------------</div>
            <div className="">-=------------------------</div>
            <div className="">-=------------------------</div>
        </div>
    );
}

export function CardTitleMenu({ fileUsAtom, icon }: { fileUsAtom: FileUsAtom; icon: React.ReactNode; }) {
    const fileUs = useAtomValue(fileUsAtom);

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
}
