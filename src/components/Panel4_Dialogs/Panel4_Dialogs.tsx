import React from 'react';
import { useAtom } from 'jotai';
import { formEditorDataAtom } from '@/store/store';
import { PortalModal } from '@ui/UIDialog';
import { Manifest_FormEditor } from './Dialog_Manifest/Dialog_Manifest';

function FormEditorTrigger() {
    const [editorData, setEditorData] = useAtom(formEditorDataAtom);
    return (<>
        {editorData &&
            <PortalModal show={true} setShow={(v: boolean) => !v && setEditorData(null)}>
                <Manifest_FormEditor editorData={editorData} />
            </PortalModal>
        }
    </>);
}

export function Panel4_Dialogs() {
    return (
        <FormEditorTrigger />
    );
}
