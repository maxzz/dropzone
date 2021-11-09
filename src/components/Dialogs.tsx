import React from 'react';
import { useAtom } from 'jotai';
import { formEditorDataAtom } from '../store/store';
import { PortalModal } from './UI/UIDialog';
import EditorMatchPanels from './Editors/EditorMatchPanels';

function DetectionGroupEditor() {
    const [editorAtom, setEditorAtom] = useAtom(formEditorDataAtom);
    const show = !!editorAtom;
    return (
        <>
            {show &&
                <PortalModal show={show} setShow={(v: boolean) => !v && setEditorAtom(null)}>
                    <EditorMatchPanels editorAtom={editorAtom} />
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
