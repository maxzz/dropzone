import React from 'react';
import { useAtom } from 'jotai';
import { detectionEditorAtom } from '../store/store';
import { PortalModal } from './UI/UIDialog';
import EditorMatch from './Editors/EditorMatch';
import { Transition } from '@headlessui/react';

function DetectionGroupEditor() {
    const [editorAtom, setEditorAtom] = useAtom(detectionEditorAtom);
    const show = !!editorAtom;
    return (
        <>
            {show &&
                <Transition
                    show={show}
                    enter="transition duration-1000 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-1000 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <PortalModal show={show} setShow={(v: boolean) => !v && setEditorAtom(undefined)}>
                        <EditorMatch atom={editorAtom} />
                    </PortalModal>
                </Transition>
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
