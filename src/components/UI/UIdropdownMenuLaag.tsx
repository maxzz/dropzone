import React from 'react';
import { useLayer } from 'react-laag';
import { PlacementType } from 'react-laag/dist/PlacementType';
import { Options } from 'react-laag/dist/types';
import { styled } from '../../stitches.config';
import { IconMenuHamburger } from './UIIconsSymbolsDefs';

const MenuBase = styled('ul', {
    // position: 'absolute',

    // margin: '0',
    // padding: '4px 0px',

    minWidth: '160px',
    maxWidth: '460px',

    // listStyle: 'none',
    // backgroundClip: 'padding-box',
    // borderRadius: '4px',
    // boxShadow: '0 1px 15px rgba(27, 31, 35, 0.15)',

    // color: '#333',
    backgroundColor: 'white',
    // border: '1px solid rgba(27, 31, 35, 0.15)',

    zIndex: 10,

    transition: 'color 0.15s, background-color 0.15s',
});

export const MenuItem = styled('li', {
    position: 'relative',
    display: 'block',
    listStyle: 'none',
    padding: '4px 8px 4px 16px',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    fontSize: '14px',
    lineHeight: '1.5',
    cursor: 'pointer',

    '&:hover': {
        backgroundColor: '#359ed0',
        color: 'white',
    }
});

const StyledSeparator = styled('div', {
    height: 1,
    backgroundColor: 'var(--tm-primary-300)', //violet.violet6
    margin: 0, // 5
});

function MenuRow({ close }: { close: () => void; }) {
    return (
        <li className="h-8 flex items-center px-2 py-1 text-primary-900 hover:bg-primary-300 text-sm" style={{ transition: 'background-color .3s ease' }}>
            Another item1
        </li>
    );
}

const menuLayerOptions: Partial<Options> = {
    overflowContainer: false,   // keep the menu positioned inside the container
    auto: true,                 // automatically find the best placement
    placement: "bottom-center", // we prefer to place the menu "top-end"
    possiblePlacements: ["top-center", "bottom-center"],
    triggerOffset: 6,          // keep some distance to the trigger
    containerOffset: 16,        // give the menu some room to breath relative to the container
    arrowOffset: 16,            // let the arrow have some room to breath also
};

export function PopoverMenu() {
    const [isOpen, setOpen] = React.useState(false);

    function close() {
        setOpen(false);
        console.log('click outside');
    }

    const { renderLayer, triggerProps, layerProps } = useLayer({
        isOpen,
        onOutsideClick: close,      // close the menu when the user clicks outside
        onDisappear: close,         // close the menu when the menu gets scrolled out of sight
        ...menuLayerOptions,
    });

    return (
        <>
            <button {...triggerProps} onClick={(event) => {
                event.stopPropagation();
                setOpen(!isOpen);
            }}>
                <div className="w-6 h-6 opacity-60 hover:opacity-100 active:scale-[.97]">
                    <IconMenuHamburger />
                </div>
                {/* {isOpen ? "Hide" : "Show"} */}
            </button>

            {renderLayer(<>{
                isOpen && (
                    <MenuBase {...layerProps} className="" onClick={(event) => {
                        console.log('click parent');
                    }}>
                        <MenuItem onClick={(event) => {
                            event.stopPropagation();
                            close();
                            console.log('click menu item');
                        }
                        }>Item 1</MenuItem>
                        <MenuRow close={close} />
                        <div className="h-8 flex items-center px-2 py-1 text-primary-900 hover:bg-primary-300 text-sm" style={{ transition: 'background-color .3s ease' }}>Another item1</div>
                        <StyledSeparator />
                        <div className="h-8 flex items-center px-2 py-1 text-primary-900 hover:bg-primary-300 text-sm" style={{ transition: 'background-color .3s ease' }}>Another item2</div>
                        <div className="h-8 flex items-center px-2 py-1 text-primary-900 hover:bg-primary-300 text-sm" style={{ transition: 'background-color .3s ease' }}>Another item3</div>
                        <MenuItem>Item 2 ItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItemItem</MenuItem>
                        <MenuItem>Item 3</MenuItem>
                        <MenuItem>Item 4</MenuItem>
                    </MenuBase>
                )}
            </>)}
        </>
    );
}
