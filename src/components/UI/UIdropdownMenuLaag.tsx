import React from 'react';
import { Arrow, ArrowProps, useLayer } from 'react-laag';
import { styled } from '../../stitches.config';

const MenuBase = styled('ul', {
    position: 'absolute',

    margin: '0',
    padding: '4px 0px',
    minWidth: '160px',

    listStyle: 'none',
    backgroundClip: 'padding-box',
    borderRadius: '4px',
    boxShadow: '0 1px 15px rgba(27, 31, 35, 0.15)',
    
    color: '#333',
    backgroundColor: 'white',
    border: '1px solid rgba(27, 31, 35, 0.15)',

    transition: 'color 0.15s, background-color 0.15s',
});

type MenuProps = {
    arrowProps?: ArrowProps;
};

export const Menu2 = React.forwardRef<HTMLUListElement, MenuProps>(function Menu(
    { children, arrowProps, ...rest },
    ref
) {
    return (
        <MenuBase
            ref={ref}
            {...rest}
        >
            {children}

            {arrowProps && (
                <Arrow
                    {...arrowProps}
                    borderColor="rgba(27, 31, 35, 0.15)"
                    borderWidth={1}
                    roundness={0.5}
                />
            )}
        </MenuBase>
    );
});

/*
<{
    $isOpen?: boolean;
    $nested?: boolean;
    $highlight?: boolean;
  }>
*/

export const MenuItem = styled('li', {
    position: 'relative',
    display: 'block',
    listStyle: 'none',
    padding: '4px 8px 4px 16px',
    
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    color: '${p => (p.$isOpen || p.$highlight ? "white" : "inherit")}',
    
    fontSize: '14px',
    lineHeight: '1.5',
    cursor: 'pointer',
    backgroundColor: '${p => p.$isOpen || p.$highlight ? "#359ed0" : "transparent"}',
    '&:hover': {
        backgroundColor: '#359ed0',
        color: 'white',
    }
});
/*
    ${p =>
      p.$nested &&
      css`
        &::after {
          content: "►";
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 10px;
        }
      `}
  `;
*/
export function PopoverMenu() {
    const [isOpen, setOpen] = React.useState(false);

    // helper function to close the menu
    function close() {
        setOpen(false);
    }

    const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
        isOpen,
        onOutsideClick: close,      // close the menu when the user clicks outside
        onDisappear: close,         // close the menu when the menu gets scrolled out of sight
        overflowContainer: false,   // keep the menu positioned inside the container
        auto: true,                 // automatically find the best placement
        placement: "top-end",       // we prefer to place the menu "top-end"
        triggerOffset: 12,          // keep some distance to the trigger
        containerOffset: 16,        // give the menu some room to breath relative to the container
        arrowOffset: 16,            // let the arrow have some room to breath also
    });

    return (
        <>
            <button {...triggerProps} onClick={() => setOpen(!isOpen)}>
                {isOpen ? "Hide" : "Show"}
            </button>

            {renderLayer(<>{
                isOpen && (
                    <MenuBase {...layerProps} className="bg-red-400 min-w-[12rem]">
                        <MenuItem>Item 1</MenuItem>
                        <MenuItem>Item 2 ItemItemItemItemItemItemItemItemItemItemItemItem</MenuItem>
                        <MenuItem>Item 3</MenuItem>
                        <MenuItem>Item 4</MenuItem>
                    </MenuBase>
                )}
            </>)}
        </>
    );
}
