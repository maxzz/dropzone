import React from 'react';
import { styled, keyframes } from '@stitches/react';
import { violet, mauve, blackA } from '@radix-ui/colors';
// import {
//     HamburgerMenuIcon,
//     DotFilledIcon,
//     CheckIcon,
//     ChevronRightIcon,
// } from '@radix-ui/react-icons';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

const slideUpAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(-2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(-2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
});

const StyledContent = styled(DropdownMenuPrimitive.Content, {
    minWidth: 220,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 5,
    boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
    '@media (prefers-reduced-motion: no-preference)': {
        animationDuration: '400ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity',
        '&[data-state="open"]': {
            '&[data-side="top"]': { animationName: slideDownAndFade },
            '&[data-side="right"]': { animationName: slideLeftAndFade },
            '&[data-side="bottom"]': { animationName: slideUpAndFade },
            '&[data-side="left"]': { animationName: slideRightAndFade },
        },
    },
});

const itemStyles = {
    all: 'unset',
    fontSize: 13,
    lineHeight: 1,
    color: violet.violet11,
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    height: 25,
    padding: '0 5px',
    position: 'relative',
    paddingLeft: 25,
    userSelect: 'none',

    '&[data-disabled]': {
        color: mauve.mauve8,
        pointerEvents: 'none',
    },

    '&:focus': {
        backgroundColor: violet.violet9,
        color: violet.violet1,
    },
};

const StyledItem = styled(DropdownMenuPrimitive.Item, { ...itemStyles });
// const StyledCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem, { ...itemStyles });
// const StyledRadioItem = styled(DropdownMenuPrimitive.RadioItem, { ...itemStyles });
// const StyledTriggerItem = styled(DropdownMenuPrimitive.TriggerItem, {
//     '&[data-state="open"]': {
//         backgroundColor: violet.violet4,
//         color: violet.violet11,
//     },
//     ...itemStyles,
// });

// const StyledLabel = styled(DropdownMenuPrimitive.Label, {
//     paddingLeft: 25,
//     fontSize: 12,
//     lineHeight: '25px',
//     color: mauve.mauve11,
// });

// const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
//     height: 1,
//     backgroundColor: violet.violet6,
//     margin: 5,
// });

// const StyledItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, {
//     position: 'absolute',
//     left: 0,
//     width: 25,
//     display: 'inline-flex',
//     alignItems: 'center',
//     justifyContent: 'center',
// });

// const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
//     fill: 'white',
// });

// Exports
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = StyledContent;
export const DropdownMenuItem = StyledItem;

// export const DropdownMenuCheckboxItem = StyledCheckboxItem;
// export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
// export const DropdownMenuRadioItem = StyledRadioItem;
// export const DropdownMenuItemIndicator = StyledItemIndicator;
// export const DropdownMenuTriggerItem = StyledTriggerItem;
// export const DropdownMenuLabel = StyledLabel;
// export const DropdownMenuSeparator = StyledSeparator;
// export const DropdownMenuArrow = StyledArrow;

// Your app...
const Box = styled('div', {});

export const CardActions = ({ icon }: { icon: React.ReactNode; }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {icon}
            </DropdownMenuTrigger>

            <DropdownMenuContent sideOffset={5}>
                <DropdownMenuItem>Convert 1</DropdownMenuItem>
                <DropdownMenuItem>Convert 2</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CardActions;
