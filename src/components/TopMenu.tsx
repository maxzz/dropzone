import { useUpdateAtom } from 'jotai/utils';
import React from 'react';
import { foldAllCardsAtom } from '../store/store';
import {
    DropdownMenu as Menu,
    DropdownMenuContent as Content,
    DropdownMenuItem as Item,
    DropdownMenuSeparator as Separator,
    DropdownMenuTrigger as Trigger
} from './UI/UiDropdownMenu';

export const TopMenu = ({ icon }: { icon: React.ReactNode; }) => {
    const toggleFolding = useUpdateAtom(foldAllCardsAtom);
    return (
        <Menu>
            <Trigger>
                {icon}
            </Trigger>

            <Content sideOffset={5}>
                <Item className="!text-sm" onSelect={() => toggleFolding()}>Toggle cards folding</Item>
                <Separator />
                <Item>Help</Item>
            </Content>
        </Menu>
    );
};

export default TopMenu;

import { Arrow, useLayer } from 'react-laag';
import { AnimatePresence, motion } from 'framer-motion';

export function PopoverMenu() {
    const [isOpen, setOpen] = React.useState(false);

    // helper function to close the menu
    function close() {
        setOpen(false);
    }

    const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
        isOpen,
        onOutsideClick: close, // close the menu when the user clicks outside
        onDisappear: close, // close the menu when the menu gets scrolled out of sight
        overflowContainer: false, // keep the menu positioned inside the container
        auto: true, // automatically find the best placement
        placement: "top-end", // we prefer to place the menu "top-end"
        triggerOffset: 12, // keep some distance to the trigger
        containerOffset: 16, // give the menu some room to breath relative to the container
        arrowOffset: 16 // let the arrow have some room to breath also
    });

    // Again, we're using framer-motion for the transition effect
    return (
        <>
            <button {...triggerProps} onClick={() => setOpen(!isOpen)}>
                {isOpen ? "Hide" : "Show"}
            </button>
            {renderLayer(
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul {...layerProps}>
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                            <li>Item 4</li>
                            <Arrow {...arrowProps} />
                        </motion.ul>
                    )}
                </AnimatePresence>
            )}
        </>
    );
}
