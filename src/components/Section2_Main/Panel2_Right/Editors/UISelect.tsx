import React, { HTMLAttributes } from 'react';
import { styled } from '@stitches/react';
import { violet, mauve, blackA } from '@radix-ui/colors';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as primitive from '@radix-ui/react-select';

const violet_violet1 = 'var(--tm-primary-100)';          // const violet_violet1 = violet.violet1;
const violet_violet6 = 'var(--tm-primary-500)';          // const violet_violet6 = violet.violet6;
const violet_violet9 = 'var(--tm-primary-700)';          // const violet_violet9 = violet.violet9;
const violet_violet11 = 'var(--tm-primary-900)';        // const violet_violet11 = violet.violet11;
const blackA_blackA7 = 'var(--tm-primary-500)';          // const blackA_blackA7 = blackA.blackA7;
const mauve_mauve3 = 'var(--tm-primary-400)';              // const mauve_mauve3 = mauve.mauve3;
const mauve_mauve8 = 'var(--tm-primary-700)';              // const mauve_mauve8 = mauve.mauve8;
const mauve_mauve11 = 'var(--tm-primary-900)';            // const mauve_mauve11 = mauve.mauve11;

const StyledTrigger = styled(primitive.SelectTrigger, {
    all: 'unset',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: '0 15px',
    fontSize: 13,
    lineHeight: 1,
    height: 35,
    gap: 5,
    backgroundColor: 'white',
    color: violet_violet11,
    boxShadow: `0 2px 10px ${blackA_blackA7}`,
    '&:hover': { backgroundColor: mauve_mauve3 },
    '&:focus': { boxShadow: `0 0 0 2px black` },
    '&[data-placeholder]': { color: violet_violet9 },
});

const StyledIcon = styled(primitive.SelectIcon, {
    color: violet_violet11,
});

const StyledContent = styled(primitive.Content, {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 6,
    boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
});

const StyledViewport = styled(primitive.Viewport, {
    padding: 5,
});

function Content({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <primitive.Portal container={document.getElementById('portal')}>
            <StyledContent {...props}>{children}</StyledContent>
        </primitive.Portal>
    );
}

const StyledItem = styled(primitive.Item, {
    all: 'unset',
    fontSize: 13,
    lineHeight: 1,
    color: violet_violet11,
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    height: 25,
    padding: '0 35px 0 25px',
    position: 'relative',
    userSelect: 'none',

    '&[data-disabled]': {
        color: mauve_mauve8,
        pointerEvents: 'none',
    },

    '&[data-highlighted]': {
        backgroundColor: violet_violet9,
        color: violet_violet1,
    },
});

const StyledLabel = styled(primitive.Label, {
    padding: '0 25px',
    fontSize: 12,
    lineHeight: '25px',
    color: mauve_mauve11,
});

const StyledSeparator = styled(primitive.Separator, {
    height: 1,
    backgroundColor: violet_violet6,
    margin: 5,
});

const StyledItemIndicator = styled(primitive.ItemIndicator, {
    position: 'absolute',
    left: 0,
    width: 25,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const scrollButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    backgroundColor: 'white',
    color: violet_violet11,
    cursor: 'default',
};

const StyledScrollUpButton = styled(primitive.ScrollUpButton, scrollButtonStyles);

const StyledScrollDownButton = styled(primitive.ScrollDownButton, scrollButtonStyles);

// Exports
export const Select = primitive.Root;
export const SelectTrigger = StyledTrigger;
export const SelectValue = primitive.Value;
export const SelectIcon = StyledIcon;
export const SelectContent = Content;
export const SelectViewport = StyledViewport;
export const SelectGroup = primitive.Group;
export const SelectItem = StyledItem;
export const SelectItemText = primitive.ItemText;
export const SelectItemIndicator = StyledItemIndicator;
export const SelectLabel = StyledLabel;
export const SelectSeparator = StyledSeparator;
export const SelectScrollUpButton = StyledScrollUpButton;
export const SelectScrollDownButton = StyledScrollDownButton;

// Your app...
const Box = styled('div', {});

export const SelectDemo = () => (
    <Box>
        <Select>

            <SelectTrigger aria-label="Food">
                <SelectValue placeholder="Select a fruit…" />   <SelectIcon> <ChevronDownIcon /> </SelectIcon>
            </SelectTrigger>

            <SelectContent>
                <SelectScrollUpButton>
                    <ChevronUpIcon />
                </SelectScrollUpButton>

                <SelectViewport>
                    <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">              <SelectItemText>Apple</SelectItemText>      <SelectItemIndicator> <CheckIcon /> </SelectItemIndicator> </SelectItem>
                        <SelectItem value="banana">             <SelectItemText>Banana</SelectItemText>     <SelectItemIndicator> <CheckIcon /> </SelectItemIndicator> </SelectItem>
                        <SelectItem value="blueberry">          <SelectItemText>Blueberry</SelectItemText>  <SelectItemIndicator> <CheckIcon /> </SelectItemIndicator> </SelectItem>
                        <SelectItem value="grapes">             <SelectItemText>Grapes</SelectItemText>     <SelectItemIndicator> <CheckIcon /> </SelectItemIndicator> </SelectItem>
                        <SelectItem value="pineapple">          <SelectItemText>Pineapple</SelectItemText>  <SelectItemIndicator> <CheckIcon /> </SelectItemIndicator> </SelectItem>
                    </SelectGroup>

                    <SelectSeparator />

                    <SelectGroup>
                        <SelectLabel>Vegetables</SelectLabel>
                        <SelectItem value="aubergine">          <SelectItemText>Aubergine</SelectItemText>  <SelectItemIndicator> <CheckIcon /> </SelectItemIndicator> </SelectItem>
                        <SelectItem value="broccoli">           <SelectItemText>Broccoli</SelectItemText>   <SelectItemIndicator> <CheckIcon /> </SelectItemIndicator> </SelectItem>
                        <SelectItem value="carrot" disabled>    <SelectItemText>Carrot</SelectItemText>     <SelectItemIndicator> <CheckIcon /> </SelectItemIndicator> </SelectItem>
                        <SelectItem value="courgette">          <SelectItemText>Courgette</SelectItemText>  <SelectItemIndicator> <CheckIcon /> </SelectItemIndicator> </SelectItem>
                        <SelectItem value="leek">               <SelectItemText>leek</SelectItemText>       <SelectItemIndicator> <CheckIcon /> </SelectItemIndicator> </SelectItem>
                    </SelectGroup>

                    <SelectSeparator />

                    <SelectGroup>
                        <SelectLabel>Meat</SelectLabel>
                        <SelectItem value="beef">               <SelectItemText>Beef</SelectItemText>       <SelectItemIndicator> <CheckIcon /> </SelectItemIndicator> </SelectItem>
                        <SelectItem value="chicken">            <SelectItemText>Chicken</SelectItemText>    <SelectItemIndicator> <CheckIcon /> </SelectItemIndicator> </SelectItem>
                        <SelectItem value="lamb">               <SelectItemText>Lamb</SelectItemText>       <SelectItemIndicator> <CheckIcon /> </SelectItemIndicator> </SelectItem>
                        <SelectItem value="pork">               <SelectItemText>Pork</SelectItemText>       <SelectItemIndicator> <CheckIcon /> </SelectItemIndicator> </SelectItem>
                    </SelectGroup>
                </SelectViewport>

                <SelectScrollDownButton>
                    <ChevronDownIcon />
                </SelectScrollDownButton>

            </SelectContent>
        </Select>
    </Box>
);

export default SelectDemo;
