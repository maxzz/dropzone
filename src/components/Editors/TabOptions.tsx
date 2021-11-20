import React from 'react';
import { useAtom } from 'jotai';
import { EditorData } from '../../store/store';

export function TabOptions({ editorData }: { editorData: EditorData; }) {
    return (
        <div className="p-4">
            <div className="mb-1 font-bold text-gray-600">Choice name</div>
            <input
                className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
                spellCheck={false}
                value={''} readOnly
            />

            <label className="mt-4 h-6 flex items-center space-x-1">
                <input type="checkbox" className="rounded focus:ring-indigo-500 focus:ring-offset-0"
                    checked={true}
                    onChange={(event) => {
                    }}
                />
                <div>Show in quicklinks list</div>
            </label>


            <div className="mt-1 mb-1 font-bold text-gray-600">Quicklink name</div>
            <input
                className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
                spellCheck={false}
                value={''} readOnly
            />




            {/* Test below */}

            {/* <div className="mt-1 mb-1 font-bold text-gray-600">Quicklink name</div>
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
            /> */}

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

        </div>
    );
}
