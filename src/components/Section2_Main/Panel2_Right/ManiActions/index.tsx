import React from 'react';
import { useAtomValue } from 'jotai';
import { OldOverlay_Dialog } from '@ui/UIDialog';
import { MenuTrigger, MenuPortal, MenuContent, MenuItem, MenuSeparator, Menu } from '@ui/UiDropdownMenu';
import toast from 'react-hot-toast';
import { IconMenuHamburger } from '@ui/icons';
import { FileUsAtomType } from '@/store';
import { TestDialogContent, saveXmlFile } from './menu-commands';
import { CardEdit, CardOpenUrl } from './menu-items';

function CardTitleMenu({ fileUsAtom, icon }: { fileUsAtom: FileUsAtomType; icon: React.ReactNode; }) {
    const fileUs = useAtomValue(fileUsAtom);
    return (
        <Menu>
            <MenuTrigger>
                {icon}
            </MenuTrigger>

            <MenuPortal container={document.getElementById('portal')}>
                <MenuContent sideOffset={5}>

                    <OldOverlay_Dialog trigger={
                        <MenuItem className="!text-sm" /* onClick={(event) => { event.stopPropagation(); event.preventDefault(); saveXmlFile(); }} */>
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

export function ManiActions({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    return (
        <div className="flex items-center">
            <CardEdit fileUsAtom={fileUsAtom} formIdx={0} />
            <CardOpenUrl fileUsAtom={fileUsAtom} />

            <CardTitleMenu
                fileUsAtom={fileUsAtom}
                icon={
                    <IconMenuHamburger className="w-8 h-8 p-1 stroke-[0.8] hover:bg-primary-700 rounded opacity-60 hover:opacity-100 active:scale-[.97] outline-none focus:ring-1 ring-primary-400" />
                }
            />
        </div>
    );
}
