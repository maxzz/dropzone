import React from 'react';
import { useAtom } from 'jotai';
import { PortalModal } from './UI/UIDialog';
import { formEditorDataAtom } from '../store/store';
import FormEditor from './Editors/FormEditor';

function FormEditorTrigger() {
    const [editorData, setEditorData] = useAtom(formEditorDataAtom);
    return (
        <>
            {editorData &&
                <PortalModal show={true} setShow={(v: boolean) => !v && setEditorData(null)}>
                    <FormEditor editorData={editorData} />
                </PortalModal>
            }
        </>
    );
}

function Dialogs() {
    return (
        <FormEditorTrigger />
    );
}

export default Dialogs;
