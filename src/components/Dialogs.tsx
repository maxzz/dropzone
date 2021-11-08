import React from 'react';
import { useAtom } from 'jotai';
import { detectionEditorAtomAtom } from '../store/store';
import { PortalModal } from './UI/UIDialog';
import EditorMatchPanels from './Editors/EditorMatchPanels';

function DetectionGroupEditor() {
    const [editorAtom, setEditorAtom] = useAtom(detectionEditorAtomAtom);
    const show = !!editorAtom;
    return (
        <>
            {show &&
                <PortalModal show={show} setShow={(v: boolean) => !v && setEditorAtom(undefined)}>
                    <EditorMatchPanels fileUsAtom={editorAtom} />
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
