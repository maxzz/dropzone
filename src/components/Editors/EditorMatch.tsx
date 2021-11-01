import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';

export function Dialog({ children, ...props }: {children: React.ReactNode}) {
    return (
        <DialogPrimitive.Root {...props}>
            <DialogPrimitive.Overlay />
            {children}
        </DialogPrimitive.Root>
    );
}

export const DialogContent = React.forwardRef<HTMLDivElement, {children: React.ReactNode}>(({ children, ...props }, forwardedRef) => (
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
                <DialogTrigger>Dialog trigger</DialogTrigger>
                <DialogContent>Dialog Content</DialogContent>
            </Dialog>
        </div>
    );
}

export default EditorMatch;
