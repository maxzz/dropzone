import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { keyframes } from '@stitches/react';
import { styled } from '../../stitches.config';
import { blackA } from '@radix-ui/colors';

const overlayShow = keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
});

const contentShow = keyframes({
    '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
    '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
    backgroundColor: blackA.blackA9,
    position: 'fixed',
    inset: 0,
    '@media (prefers-reduced-motion: no-preference)': {
        animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
});

const StyledContent = styled(DialogPrimitive.Content, {
    backgroundColor: 'white',
    borderRadius: 6,
    boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: '450px',
    maxHeight: '85vh',
    padding: 25,
    '@media (prefers-reduced-motion: no-preference)': {
        animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: 'transform',
    },
    '&:focus': { outline: 'none' },
});

export function Dialog({ children, ...props }: { children: React.ReactNode; }) {
    return (
        <DialogPrimitive.Root {...props}>
            <StyledOverlay />
            {children}
        </DialogPrimitive.Root>
    );
}

export const DialogContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode; } | React.HTMLAttributes<HTMLDivElement>>(({ children, ...props }, forwardedRef) => (
    <DialogPrimitive.Content {...props} ref={forwardedRef}>
        {children}
        <DialogPrimitive.Close>
            <Cross1Icon />
        </DialogPrimitive.Close>
    </DialogPrimitive.Content>
)
);

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;


function EditorMatch() {
    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <div className="bg-purple-400">Dialog trigger</div>
                </DialogTrigger>
                <StyledContent className="fixed inset-0 grid place-items-center">
                    <div className="">
                        <div className="bg-red-700">Caption</div>
                        <div className="bg-red-500 ">Dialog Content</div>
                    </div>
                </StyledContent>
            </Dialog>
        </div>
    );
}

export default EditorMatch;
