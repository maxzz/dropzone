import React from 'react';
import { useAtom } from 'jotai';
import { EditorData } from '../../store/store';

export function TabOptions({ editorData }: { editorData: EditorData; }) {
    return (
        <div className="p-4">
            <div className="mb-1 font-bold text-gray-600">Original url</div>
            <input
                className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
                spellCheck={false}
                value={''} readOnly
            />

            <div className="mb-1 font-bold text-gray-600">Original url</div>
            <input
                className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
                spellCheck={false}
                value={''} readOnly
            />

        </div>
    );
}
