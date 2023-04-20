import React from 'react';
import { useAtomValue } from 'jotai';
import { OldOverlay_Dialog } from '@ui/UIDialog';
import { MenuTrigger, MenuPortal, MenuContent, MenuItem, MenuSeparator, Menu } from '@ui/UiDropdownMenu';
import toast from 'react-hot-toast';
import { FileUsAtomType } from '@/store';
import { TestDialogContent, saveXmlFile } from './menu-commands';

export function CardTitleMenu({ fileUsAtom, icon }: { fileUsAtom: FileUsAtomType; icon: React.ReactNode; }) {
    const fileUs = useAtomValue(fileUsAtom);
    return (
        <Menu>
            <MenuTrigger>
                {icon}
            </MenuTrigger>

            <MenuPortal container={document.getElementById('portal')}>
                <MenuContent sideOffset={5}>

                    <OldOverlay_Dialog trigger={
                        <MenuItem className="!text-sm">
                            Menu item as dialog trigger
                        </MenuItem>
                    }>
                        <TestDialogContent />
                    </OldOverlay_Dialog>

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
