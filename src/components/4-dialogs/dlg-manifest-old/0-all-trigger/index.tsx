import React, { Suspense } from "react";
import { useAtom } from "jotai";
import { dialogManiEditorDataAtom } from "@/store";
import { OldOverlay_PortalModal } from "@ui/ui-dialog";

const Dialog_Manifest = React.lazy(() => import("../1-body"));

export function ManifestOldDlgTrigger() {
    const [editorData, setEditorData] = useAtom(dialogManiEditorDataAtom);
    return (<>
        {editorData &&
            <Suspense fallback={"Loading"} >
                <OldOverlay_PortalModal
                    show={true}
                    setShow={(v: boolean) => !v && setEditorData(null)}
                >
                    <Dialog_Manifest editorData={editorData} />
                </OldOverlay_PortalModal>
            </Suspense>
        }
    </>);
}
