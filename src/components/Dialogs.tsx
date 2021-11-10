import React from 'react';
import { useAtom } from 'jotai';
import { formEditorDataAtom } from '../store/store';
import { PortalModal } from './UI/UIDialog';
import EditorMatchPanels from './Editors/EditorMatchPanels';

function DetectionGroupEditor() {
    const [editorData, setEditorData] = useAtom(formEditorDataAtom);
    return (
        <>
            {editorData &&
                <PortalModal show={true} setShow={(v: boolean) => !v && setEditorData(null)}>
                    <EditorMatchPanels editorData={editorData} />
                </PortalModal>
            }
        </>
    );
}

function Dialogs() {
    return (
        <DetectionGroupEditor />
    );
}

export default Dialogs;
