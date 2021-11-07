import React from 'react';
import { useAtom } from 'jotai';
import { detectionEditorAtom } from '../../store/store';
import { PortalModal } from '../UI/UIDialog';
import EditorMatch from './EditorMatch';

function DetectionGroupEditor() {
    const [editorAtom, setEditorAtom] = useAtom(detectionEditorAtom);
    const show = !!editorAtom;
    return (
        <>
            {show &&
                <PortalModal show={show} setShow={(v: boolean) => !v && setEditorAtom(undefined)}>
                    <EditorMatch atom={editorAtom} />
                </PortalModal>
            }
        </>
    );
}

export default DetectionGroupEditor;
