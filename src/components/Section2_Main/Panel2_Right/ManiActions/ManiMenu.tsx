import React from 'react';
import { useAtomValue } from 'jotai';
import { FileUs, FileUsAtomType } from '@/store';
import { convertToXml } from '@/store/manifest';
import { Dialog } from '@ui/UIDialog';
import { Menu, MenuPortal, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from '@ui/UiDropdownMenu';
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
            <MenuTrigger>
                {icon}
            </MenuTrigger>

            <MenuPortal>
                <MenuContent sideOffset={5}>

                    <Dialog trigger={
                        <MenuItem className="!text-sm" /* onClick={(event) => { event.stopPropagation(); event.preventDefault(); saveXmlFile(); }} */>
                            Menu item as dialog trigger
                        </MenuItem>
                    }>
                        <DialogContent />
                    </Dialog>

                    <MenuItem className="!text-sm"
                        onClick={(event) => {
                            event.stopPropagation();
                            saveXmlFile(fileUs);
                        }}
                    >
                        Convert manual to normal
                    </MenuItem>

                    <MenuItem className="!text-sm"
                        onClick={(event) => {
                            event.stopPropagation();
                            toast('Not imlemented yet', { style: { backgroundColor: 'tomato' } });
                        }}
                    >
                        Merge two manifests
                    </MenuItem>

                    <MenuSeparator />
                    <MenuItem disabled={true} >Save</MenuItem>
                </MenuContent>
            </MenuPortal>
        </Menu>
    );
}
