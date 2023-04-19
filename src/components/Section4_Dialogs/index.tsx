import React, { Suspense } from 'react';
import { useAtom } from 'jotai';
import { formEditorDataAtom } from '@/store';
import { OldOverlay_PortalModal } from '@ui/UIDialog';
import { FldCatDlg } from '../Section2_Main/Panel2_Right/Body_Manifest/ManiSection1_Fields/Column4_Catalog/FldCatDlg';

const Manifest_FormEditor = React.lazy(() => import('./Dialog_Manifest'));

function ManifestFormEditorTrigger() {
    const [editorData, setEditorData] = useAtom(formEditorDataAtom);
    return (<>
        {editorData &&
            <Suspense fallback={"Loading"} >
                <OldOverlay_PortalModal show={true} setShow={(v: boolean) => !v && setEditorData(null)}>
                    <Manifest_FormEditor editorData={editorData} />
                </OldOverlay_PortalModal>
            </Suspense>
        }
        <FldCatDlg />
    </>);
}

export function Section4_Dialogs() {
    return (
        <ManifestFormEditorTrigger />
    );
}
