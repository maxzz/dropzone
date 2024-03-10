import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { EditorData } from '@/store';
import { UIIconUpDown } from '@ui/icons';

export function DummyPlaceholder() {
    return (<>
        <div className="mt-1 mb-1 font-bold text-gray-600">Quicklink name</div>
        <input
            className="px-2 py-1.5 w-full border border-gray-400 rounded shadow-inner"
            spellCheck={false}
            value={''} readOnly
        />
    </>);
}

export function Tab3_Options({ editorData }: { editorData: EditorData; }) {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
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




            {/* Test group 1 below */}

            <div className="mt-4 w-28 font-bold text-gray-600 flex items-center space-x-1" onClick={() => setIsOpen1(!isOpen1)}>
                <div className="">Group 1</div>
                <UIIconUpDown double={true} isUp={isOpen1} className="w-5 h-5 border rounded" />
            </div>
            {isOpen1 &&
                <>
                    <DummyPlaceholder />
                    <DummyPlaceholder />
                    <DummyPlaceholder />
                    <DummyPlaceholder />
                    <DummyPlaceholder />
                    <DummyPlaceholder />
                </>
            }

            {/* Test group 2 below */}

            <div className="mt-4 w-28 font-bold text-gray-600 flex items-center space-x-1" onClick={() => setIsOpen2(!isOpen2)}>
                <div className="">Group 2</div>
                <UIIconUpDown double={true} isUp={isOpen2} className="w-5 h-5 border rounded" />
            </div>
            {isOpen2 &&
                <>
                    <DummyPlaceholder />
                    <DummyPlaceholder />
                    <DummyPlaceholder />
                    <DummyPlaceholder />
                    <DummyPlaceholder />
                    <DummyPlaceholder />
                </>
            }

        </div>
    );
}
