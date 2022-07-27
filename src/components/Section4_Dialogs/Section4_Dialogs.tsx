import React, { Suspense } from 'react';
import { useAtom } from 'jotai';
import { formEditorDataAtom } from '@/store';
import { PortalModal } from '@ui/UIDialog';
const Manifest_FormEditor = React.lazy(() => import('./Dialog_Manifest/Dialog_Manifest'));

function ManifestFormEditorTrigger() {
    const [editorData, setEditorData] = useAtom(formEditorDataAtom);
    return (<>
        {editorData &&
            <Suspense fallback={"Loading"} >
                <PortalModal show={true} setShow={(v: boolean) => !v && setEditorData(null)}>
                    <Manifest_FormEditor editorData={editorData} />
                </PortalModal>
            </Suspense>
        }
    </>);
}

export function Section4_Dialogs() {
    return (
        <ManifestFormEditorTrigger />
    );
}
