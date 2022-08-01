import React from 'react';
import { styled, keyframes } from '@stitches/react';
import * as Primitive from '@radix-ui/react-dropdown-menu';

//#region content and trigger

//#region animations

const slideUpAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(2px) scale(.2)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(-2px) scale(.2)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(-2px) scale(.2)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(2px) scale(.2)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
});

//#endregion animations

const StyledContent = styled(Primitive.Content, {
    minWidth: 220,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 5,
    boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',

    '@media (prefers-reduced-motion: no-preference)': {
        animationDuration: '.2s',
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

const StyledTrigger = styled(Primitive.Trigger, {
    outline: '2px solid transparent',
    outlineOffset: '2px',
});

//#endregion content and trigger

const itemStyles = {
    all: 'unset',
    position: 'relative',

    height: 25,
    fontSize: 13,
    lineHeight: 1,
    padding: '0 5px 0 25px',

    color: 'var(--tm-primary-900)', //violet.violet11
    borderRadius: 3,

    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',

    transition: 'background-color .1s ease',

    '&[data-highlighted]': {
        backgroundColor: 'var(--tm-primary-700)', //violet.violet9
        //backgroundColor: 'red',
        color: 'var(--tm-primary-100)', //violet.violet1
    },

    '&[data-disabled]': {
        color: 'var(--tm-primary-400)', //mauve.mauve8

        pointerEvents: 'none', // I need pointer events to show browser's tooltip // really? // yes but we need to prevent click
        backgroundColor: 'transparent !important',
    },
};

const StyledItem = styled(Primitive.Item, { ...itemStyles });

const StyledMenuItem = ({ disabled, ...rest }: { disabled?: boolean; } & Primitive.MenuItemProps) => {
    return <StyledItem {...rest} {...(disabled && { 'data-disabled': '' })} />;
};

const StyledSeparator = styled(Primitive.Separator, {
    height: 1,
    backgroundColor: 'var(--tm-primary-500)', //violet.violet6
    margin: 5,
});

const StyledItemIndicator = styled(Primitive.ItemIndicator, {
    position: 'absolute',
    left: 0,
    width: 25,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const StyledLabel = styled(Primitive.Label, {
    paddingLeft: 25,
    fontSize: 12,
    lineHeight: '25px',
    color: 'var(--tm-primary-600)', //mauve.mauve11,
});

const StyledCheckboxItem = styled(Primitive.CheckboxItem, { ...itemStyles });
const StyledRadioItem = styled(Primitive.RadioItem, { ...itemStyles });

export const Menu = Primitive.Root;
export const MenuPortal = Primitive.Portal;
export const MenuTrigger = StyledTrigger;

export const MenuContent = StyledContent;

export const MenuItem = StyledMenuItem;

export const MenuRadioGroup = Primitive.RadioGroup;
export const MenuRadioItem = StyledRadioItem;
export const MenuItemIndicator = StyledItemIndicator;
export const MenuCheckboxItem = StyledCheckboxItem;
export const MenuSeparator = StyledSeparator;
export const MenuLabel = StyledLabel;
