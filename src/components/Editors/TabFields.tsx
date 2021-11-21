import React from 'react';
import { useAtom } from 'jotai';
import { EditorData } from '../../store/store';
import UIUpDownIcon from '../UI/UIUpDownIcon';

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

    const [isOpen1, setIsOpen1] = React.useState(false);

    return (
        <>
            {isScript
                ? <TabFieldsScript editorData={editorData} />
                :
                <div className="p-4">
                    Web form fields editor is comming soon...

                    <div className="mt-4 w-28 font-bold text-gray-600 flex items-center space-x-1" onClick={() => setIsOpen1(!isOpen1)}>
                        <div className="">Policy</div>
                        <UIUpDownIcon double={true} isUp={isOpen1} className="w-5 h-5 border rounded" />
                    </div>
                    {isOpen1 &&
                        <>
                            <div className="mt-1 mb-1 font-bold text-gray-600">Quicklink name</div>
                            <input
                                className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
                                spellCheck={false}
                                value={''} readOnly
                            />
                            <div className="mt-1 mb-1 font-bold text-gray-600">Quicklink name</div>
                            <input
                                className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
                                spellCheck={false}
                                value={''} readOnly
                            />
                            <div className="mt-1 mb-1 font-bold text-gray-600">Quicklink name</div>
                            <input
                                className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
                                spellCheck={false}
                                value={''} readOnly
                            />
                            <div className="mt-1 mb-1 font-bold text-gray-600">Quicklink name</div>
                            <input
                                className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
                                spellCheck={false}
                                value={''} readOnly
                            />
                            <div className="mt-1 mb-1 font-bold text-gray-600">Quicklink name</div>
                            <input
                                className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
                                spellCheck={false}
                                value={''} readOnly
                            />
                            <div className="mt-1 mb-1 font-bold text-gray-600">Quicklink name</div>
                            <input
                                className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
                                spellCheck={false}
                                value={''} readOnly
                            />

                        </>
                    }

                </div>
            }
        </>
    );
}
