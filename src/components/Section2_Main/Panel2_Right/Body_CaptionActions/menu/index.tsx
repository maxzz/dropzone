import React from 'react';
import { useAtomValue } from 'jotai';
import { OldOverlay_Dialog } from '@ui/UiDialog';
import { MenuTrigger, MenuPortal, MenuContent, MenuItem, MenuSeparator, Menu } from '@ui/UiDropdownMenu';
import { SymbolMenuBurger } from '@ui/icons';
import toast from 'react-hot-toast';
import { FileUsAtomType } from '@/store';
import { TestDialogContent, saveXmlFile } from './menu-commands';

const iconMenuHamburgerClasses = 'w-8 h-8 p-1 stroke-[0.8] hover:bg-primary-700 rounded opacity-60 hover:opacity-100 active:scale-[.97] outline-none focus:ring-1 ring-primary-400';

export function CardTitleMenu({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const fileUs = useAtomValue(fileUsAtom);
    return (
        <Menu>
            <MenuTrigger>
                <SymbolMenuBurger className={iconMenuHamburgerClasses} />
            </MenuTrigger>

            <MenuPortal container={document.getElementById('portal')}>
                <MenuContent sideOffset={5}>

                    <OldOverlay_Dialog
                        trigger={
                            <MenuItem className="!text-sm">
                                Menu item as dialog trigger
                            </MenuItem>
                        }
                    >
                        <TestDialogContent />
                    </OldOverlay_Dialog>

                    <MenuItem className="!text-sm" onClick={commandSaveXml}>
                        Convert manual to normal
                    </MenuItem>

                    <MenuItem className="!text-sm" onClick={commandMerge}>
                        Merge two manifests
                    </MenuItem>

                    <MenuSeparator />
                    <MenuItem disabled={true} >Save</MenuItem>
                </MenuContent>
            </MenuPortal>
        </Menu>
    );

    function commandSaveXml(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.stopPropagation();
        saveXmlFile(fileUs);
    }

    function commandMerge(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.stopPropagation();
        toast('Not imlemented yet', { style: { backgroundColor: 'tomato' } });
    }
}
