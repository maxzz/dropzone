import React, { Suspense } from 'react';
import { useAtom } from 'jotai';
import { formEditorDataAtom } from '@/store';
import { OldOverlay_PortalModal } from '@ui/ui-dialog';

const Manifest_FormEditor = React.lazy(() => import('./1-body'));

export function ManifestOldDlgTrigger() {
    const [editorData, setEditorData] = useAtom(formEditorDataAtom);
    return (<>
        {editorData &&
            <Suspense fallback={"Loading"} >
                <OldOverlay_PortalModal show={true} setShow={(v: boolean) => !v && setEditorData(null)}>
                    <Manifest_FormEditor editorData={editorData} />
                </OldOverlay_PortalModal>
            </Suspense>
        }
    </>);
}
