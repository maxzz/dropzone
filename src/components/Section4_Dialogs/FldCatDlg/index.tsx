import React from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { config, useTransition, a } from "@react-spring/web";
import { FldCatDlgBody } from "./Body";
import { fldCatOpenAtom, fldCatOutDataAtom } from "@/store";
import { useAtom, useSetAtom } from "jotai";

export function FldCatDlg() {

    const [open, setOpen] = useAtom(fldCatOpenAtom);

    const transitions = useTransition(Number(open), {
        from: { opacity: 0, y: -50, scale: 0.97 },
        enter: { opacity: 1, y: 0, scale: 1 },
        leave: { opacity: 0, y: 50, scale: 0.97 },
        config: config.stiff,
    });

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            {/* <Dialog.Trigger className="px-4 py-3 text-primary-300 border-primary-500 active:scale-[.97] border rounded select-none">
                Edit
            </Dialog.Trigger> */}

            {transitions((styles, item) => (
                !item
                    ? null
                    : <>
                        <Dialog.Portal container={document.getElementById('portal')}>
                            <a.div className="fixed inset-0 bg-primary-900/80" style={{ opacity: styles.opacity, }} />

                            <Dialog.Content forceMount asChild className="fixed inset-0 flex justify-center items-center">
                                <a.div style={styles}>
                                    <FldCatDlgBody setOpen={setOpen} outDataAtom={fldCatOutDataAtom} />
                                </a.div>
                            </Dialog.Content>

                        </Dialog.Portal>
                    </>
            ))}
        </Dialog.Root>
    );
}
