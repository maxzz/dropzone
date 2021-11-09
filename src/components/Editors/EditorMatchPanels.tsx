import React from 'react';
import { Tab } from '@headlessui/react';
import { classNames } from '../../utils/classnames';
import { FileUsAtom, formEditorDataAtom, FormEditorDataAtom } from '../../store/store';
import { MatchWeb, MatchWindows } from './EditorMatch';
import { useAtom } from 'jotai';

export default function EditorMatchPanels({ setShow = (v: boolean) => { } }: { setShow?: (v: boolean) => void; }) {
    const pages = {
        'Web': <MatchWeb />,
        'Windows': <MatchWindows />,
    };
    return (
        <div className="px-2 sm:px-0 w-[460px] min-h-[560px] grid grid-rows-[1fr,auto]">

            <div className="grid grid-rows-[auto,1fr]">
                <Tab.Group>
                    <Tab.List className="px-4 pt-4 pb-2 flex justify-items-start space-x-1 bg-blue-900/20 rounded-t">
                        {Object.keys(pages).map((pageTitle) => (
                            <Tab
                                className={({ selected }) => classNames(
                                    'px-4 py-2.5 leading-5 text-sm font-medium text-gray-700 rounded focus:outline-none',
                                    selected ? 'bg-white shadow' : 'text-gray-700/80 hover:bg-white/[0.4] hover:text-white'
                                )}
                                key={pageTitle}
                            >
                                {pageTitle}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels>
                        {Object.values(pages).map((pageContent, idx) => (
                            <Tab.Panel key={idx} className={'h-full bg-white text-sm'}>
                                {pageContent}
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>

            <div className="px-4 py-4 flex justify-end space-x-2 bg-white">
                <button className="px-4 py-2 min-w-[6rem] h-9 leading-4 text-gray-900 bg-gray-200 border border-gray-500 rounded shadow"
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    OK
                </button>

                <button className="px-4 py-2 min-w-[6rem] h-9 leading-4 text-gray-900 bg-gray-200 border border-gray-500 rounded shadow"
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    Cancel
                </button>
            </div>

        </div>
    );
}
