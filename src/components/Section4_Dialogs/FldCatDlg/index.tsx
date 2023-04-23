import React from "react";
import { useAtom } from "jotai";
import { config, useTransition, a } from "@react-spring/web";
import * as Dialog from '@radix-ui/react-dialog';
import { fldCatTriggerAtom } from "@/store";
import { FldCatDlgBody } from "./Body";

export function FldCatDlg() {
    const [fldCatInData, setFldCatInData] = useAtom(fldCatTriggerAtom);

    const transitions = useTransition(Number(!!fldCatInData), {
        from: { opacity: 0, y: -50, scale: 0.97 },
        enter: { opacity: 1, y: 0, scale: 1 },
        leave: { opacity: 0, y: 50, scale: 0.97 },
        config: config.stiff,
    });

    return (
        <Dialog.Root open={!!fldCatInData} onOpenChange={() => setFldCatInData(null)}>
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
                                    <FldCatDlgBody />
                                </a.div>
                            </Dialog.Content>

                        </Dialog.Portal>
                    </>
            ))}
        </Dialog.Root>
    );
}
