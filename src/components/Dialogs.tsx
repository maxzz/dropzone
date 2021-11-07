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
                        <PortalModal show={show} setShow={(v: boolean) => !v && setEditorAtom(undefined)}>
                            <Transition
                                show={show}
                                enter="transition duration-[12000] ease-out"
                                enterFrom="transform scale-[.5] opacity-0"
                                enterTo="transform scale-25 opacity-100"
                                leave="transition duration-1000 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                    {/* <div className="w-96 h-96"> */}
                            <EditorMatch atom={editorAtom} />
                    {/* </div> */}
                </Transition>
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
