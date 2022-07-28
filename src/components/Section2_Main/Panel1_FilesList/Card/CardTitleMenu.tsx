import React from 'react';
import { useAtomValue } from 'jotai';
import { FileUs, FileUsAtomType } from '@/store';
import { convertToXml } from '@/store/manifest';
import { Dialog } from '@ui/UIDialog';
import {
    DropdownMenu as Menu,
    DropdownMenuPortal,
    DropdownMenuContent as Content,
    DropdownMenuItem as Item,
    DropdownMenuSeparator as Separator,
    DropdownMenuTrigger as Trigger
} from '@ui/UiDropdownMenu';
import toast from 'react-hot-toast';

function DialogContent({ setShow }: { setShow?: (v: boolean) => void; }) {
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

function saveXmlFile(fileUs: FileUs) {
    const res = convertToXml(fileUs);
    if (res.error) {
        toast(res.error, { style: { backgroundColor: 'tomato' } });
    } else {
        res.xml && console.log('%c---------new xml from converted---------', 'color: green', `\n${res.xml}`);
        toast('Done', { style: { backgroundColor: 'tomato' } });
    }
}

export function CardTitleMenu({ fileUsAtom, icon }: { fileUsAtom: FileUsAtomType; icon: React.ReactNode; }) {
    const fileUs = useAtomValue(fileUsAtom);
    return (
        <Menu>
            <Trigger>
                {icon}
            </Trigger>

            <DropdownMenuPortal>
                <Content sideOffset={5}>

                    <Dialog trigger={
                        <Item className="!text-sm" /* onClick={(event) => { event.stopPropagation(); event.preventDefault(); saveXmlFile(); }} */>
                            Menu item as dialog trigger
                        </Item>
                    }>
                        <DialogContent />
                    </Dialog>

                    <Item className="!text-sm"
                        onClick={(event) => {
                            event.stopPropagation();
                            saveXmlFile(fileUs);
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
            </DropdownMenuPortal>
        </Menu>
    );
}
