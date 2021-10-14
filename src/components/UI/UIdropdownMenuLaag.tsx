import React from 'react';
import { Arrow, ArrowProps, useLayer } from 'react-laag';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { styled } from '../../stitches.config';

const MenuBase = styled(motion.ul, {
    transition: 'color 0.15s, background-color 0.15s',
    position: 'absolute',
    minWidth: '160px',
    padding: '4px 0px',
    listStyle: 'none',
    backgroundClip: 'padding-box',
    borderRadius: '4px',
    boxShadow: '0 1px 15px rgba(27, 31, 35, 0.15)',
    margin: '0',
    backgroundColor: 'white',
    color: '#333',
    border: '1px solid rgba(27, 31, 35, 0.15)',
});

type MenuProps = {
    arrowProps?: ArrowProps;
} & HTMLMotionProps<"ul">;

export const Menu2 = React.forwardRef<HTMLUListElement, MenuProps>(function Menu(
    { children, arrowProps, ...rest },
    ref
) {
    return (
        <MenuBase
            ref={ref}
            initial={{ opacity: 0, scale: 0.85 }} // animate from
            animate={{ opacity: 1, scale: 1 }} // animate to
            exit={{ opacity: 0, scale: 0.85 }} // animate exit
            transition={{
                type: "spring",
                stiffness: 800,
                damping: 35
            }}
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
    listStyle: 'none',
    display: 'block',
    padding: '4px 8px 4px 16px',
    overflow: 'hidden',
    color: '${p => (p.$isOpen || p.$highlight ? "white" : "inherit")}',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '14px',
    lineHeight: '1.5',
    cursor: 'pointer',
    position: 'relative',
    backgroundColor: '${p => p.$isOpen || p.$highlight ? "#359ed0" : "transparent"}',
    '&:hover': {
        backgroundColor: '#359ed0',
        color: 'white',
      }
  })
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
                        <MenuBase {...layerProps} className="bg-red-400 min-w-[12rem]">
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                            <li>Item 4</li>
                            <Arrow {...arrowProps} />
                        </MenuBase>
                    )}
                </AnimatePresence>
            )}
        </>
    );
}
