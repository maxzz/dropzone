import React from 'react';
import { useAtom } from 'jotai';
import { EditorData } from '../../store/store';

export function TabMatchWindows({ editorData }: { editorData: EditorData; }) {
    return (
        <div className="p-4">
            Windows match is comming soon...
        </div>
    );
}

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

//TODO: RadioButton: background-image: url(data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e);
//TODO: add checks for other urls: the same as original url
//test on: {cd2a9c44-f588-4010-ba99-9d3e58bf69cb}.dpm
