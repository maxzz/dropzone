import React from 'react';
import { useAtom } from 'jotai';
import { detectionEditorAtom } from '../../store/store';
import Dialog from '../UI/UIDialog';
import EditorMatch from './EditorMatch';

function DetectionGroupEditor() {
    const [editorAtom, setEditorAtom] = useAtom(detectionEditorAtom);
    return (
        <>
            {editorAtom &&
                <Dialog>
                    <EditorMatch atom={editorAtom} />
                </Dialog>
            }
        </>
    );
}

export default DetectionGroupEditor;
