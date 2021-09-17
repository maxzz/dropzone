import React from 'react';
import { styled, keyframes } from '@stitches/react';
import * as Primitive from '@radix-ui/react-dropdown-menu';

const itemStyles = {
    all: 'unset',
    
    fontSize: '0.875rem', // text-sm
    lineHeight: '1.25rem', // text-sm

    color: 'var(--tm-primary-900)', //violet.violet11
    borderRadius: 0,
    display: 'flex',
    alignItems: 'center',
    height: 25,
    padding: '4px 2px',
    position: 'relative',
    paddingLeft: 12,
    userSelect: 'none',

    '&[data-disabled]': {
        color: 'var(--tm-primary-300)', //mauve.mauve8
        pointerEvents: 'none',
    },

    '&:focus': {
        backgroundColor: 'var(--tm-primary-900)', //violet.violet9
        color: 'var(--tm-primary-100)', //violet.violet1
    },
};

const StyledItem = styled(Primitive.Item, { ...itemStyles });

const StyledSeparator = styled(Primitive.Separator, {
    height: 1,
    backgroundColor: 'var(--tm-primary-300)', //violet.violet6
    margin: 5,
});

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

const StyledContent = styled(Primitive.Content, {
    minWidth: 220,
    backgroundColor: 'white',
    borderRadius: 0,
    padding: 2,
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
        '&[data-state="closed"]': {
            outline: 'none',
        },
    },
});

const StyledRoot = styled(Primitive.Root, {
    outline: '2px solid transparent',
    outlineOffset: '2px',
});

export const DropdownMenu = StyledRoot;
export const DropdownMenuTrigger = Primitive.Trigger;
export const DropdownMenuContent = StyledContent;
export const DropdownMenuItem = StyledItem;
export const DropdownMenuSeparator = StyledSeparator;
