import React from 'react';
import { useAtom } from 'jotai';
import { EditorData } from '../../store/store';

function TabFieldsScript({ editorData }: { editorData: EditorData; }) {
    return (
        <div className="p-4">
            Windows form script fields editor is comming soon...
        </div>
    );
}

export function TabFields({ editorData }: { editorData: EditorData; }) {
    const [fileUs, setFileUs] = useAtom(editorData.fileUsAtom);
    const isScript = fileUs.meta?.[editorData.formIdx]?.disp.isScript;
    return (
        <>
            {isScript
                ? <TabFieldsScript editorData={editorData} />
                :
                <div className="p-4">
                    Web form fields editor is comming soon...
                </div>
            }
        </>
    );
}
