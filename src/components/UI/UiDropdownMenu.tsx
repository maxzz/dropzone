import React, { HTMLAttributes } from 'react';
import { styled, keyframes } from '@stitches/react';
import { IconChevronRight } from './UIIconSymbols';
import * as Primitive from '@radix-ui/react-dropdown-menu';
import type { PopperContentProps } from '@radix-ui/react-popper';

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

// Menu content

const MainContent = styled(Primitive.Content, {
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

const MainTrigger = styled(Primitive.Trigger, {
    outline: '2px solid transparent',
    outlineOffset: '2px',
});

//#endregion content and trigger

// Menu items

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
    backgroundColor: 'var(--tm-primary-300)', //violet.violet6
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

// Sub menus

const StyledSubContent = styled(Primitive.SubContent, { ...MainContent });

const SubTrigger = styled(Primitive.SubTrigger, {
    '&[data-state="open"]': {
        backgroundColor: 'var(--tm-primary-300)', // violet.violet4,
        color: 'var(--tm-primary-900)', // violet.violet11,
    },
    ...itemStyles,
});

// Sub menu utils

export const RightSlot = styled('div', {
    marginLeft: 'auto',
    paddingLeft: 20,
    color: 'var(--tm-primary-900)', // violet.violet11,
    '[data-highlighted] > &': { color: 'white' },
    '[data-disabled] &': { color: 'var(--tm-primary-400)' }, // mauve.mauve8
});

export function TriggerSubs({ label }: { label: string; }) {
    return (
        <MenuSubTrigger>
            {label}
            <RightSlot>
                <IconChevronRight className="w-4 h-4" />
            </RightSlot>
        </MenuSubTrigger>
    );
}

function SubContentPortal(props: HTMLAttributes<HTMLDivElement> & PopperContentProps) {
    return (
        <Primitive.Portal container={document.getElementById('portal')}>
            <StyledSubContent sideOffset={2} alignOffset={-4} {...props} />
        </Primitive.Portal>
    );
}

function SubContent(props: HTMLAttributes<HTMLDivElement> & PopperContentProps) {
    return (
        <StyledSubContent sideOffset={2} alignOffset={-4} {...props} />
    );
}

// content with portal

function MainContentPortal(props: HTMLAttributes<HTMLDivElement> & PopperContentProps) {
    return (
        <Primitive.Portal container={document.getElementById('portal')}>
            <MainContent {...props} />
        </Primitive.Portal>
    );
}

// exports

export const MenuPortal = Primitive.Portal;

export const Menu = Primitive.Root;
export const MenuTrigger = MainTrigger;
export const MenuContent = MainContent;
export const MenuContentPortal = MainContentPortal;

export const MenuSub = Primitive.Sub;
export const MenuSubTrigger = SubTrigger;
export const MenuSubContent = SubContent;
export const MenuSubContentPortal = SubContentPortal;

export const MenuItem = StyledMenuItem;
export const MenuRadioGroup = Primitive.RadioGroup;
export const MenuRadioItem = StyledRadioItem;
export const MenuItemIndicator = StyledItemIndicator;
export const MenuCheckboxItem = StyledCheckboxItem;
export const MenuSeparator = StyledSeparator;
export const MenuLabel = StyledLabel;
