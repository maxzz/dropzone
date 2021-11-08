import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { classNames } from '../../utils/classnames';
import { FileUsAtom } from '../../store/store';
import EditorMatch from './EditorMatch';

type PostType = {
    id: number,
    title: string,
    date: string,
    commentCount: number,
    shareCount: number,
};

export default function EditorMatchPanels({ fileUsAtom, setShow = (v: boolean) => { } }: { fileUsAtom: FileUsAtom; setShow?: (v: boolean) => void; }) {
    let [categories] = useState<Record<string, PostType[]>>({
        Recent: [
            {
                id: 1,
                title: 'Does drinking coffee make you smarter?',
                date: '5h ago',
                commentCount: 5,
                shareCount: 2,
            },
            {
                id: 2,
                title: "So you've bought coffee... now what?",
                date: '2h ago',
                commentCount: 3,
                shareCount: 2,
            },
        ],
        Popular: [
            {
                id: 1,
                title: 'Is tech making coffee better or worse?',
                date: 'Jan 7',
                commentCount: 29,
                shareCount: 16,
            },
            {
                id: 2,
                title: 'The most innovative things happening in coffee',
                date: 'Mar 19',
                commentCount: 24,
                shareCount: 12,
            },
        ],
    });

    const pages = {
        'matching': <EditorMatch fileUsAtom={fileUsAtom} />,
        'windows': <EditorMatch fileUsAtom={fileUsAtom} />,
    };

    return (
        <div className="px-2 sm:px-0 w-[460px] h-[600px] grid grid-rows-[1fr,auto]">

            <div className="grid grid-rows-[auto,1fr]">
                <Tab.Group>
                    <Tab.List className="px-3 pt-4 pb-2 flex justify-items-start space-x-1 bg-blue-900/20 rounded-t">
                        {Object.keys(pages).map((page) => (
                            <Tab
                                key={page}
                                className={({ selected }) => classNames(
                                    'px-4 py-2.5 leading-5 text-sm font-medium text-gray-700 rounded focus:outline-none',
                                    selected ? 'bg-white shadow' : 'text-gray-700/80 hover:bg-white/[0.4] hover:text-white'
                                )}
                            >
                                {page}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels>
                        {Object.values(pages).map((page, idx) => (
                            <Tab.Panel key={idx} className={'p-3 h-full bg-white'}>
                                {page}

                                {/*
                                {idx === 0
                                    ? ft
                                    // ? {ft({fileUsAtom: fileUsAtom})}
                                    // ? <EditorMatch fileUsAtom={fileUsAtom} />
                                    :
                                    <ul>
                                        {posts.map((post) => (
                                            <li className="relative p-3 rounded-md hover:bg-coolGray-100" key={post.id}>
                                                <h3 className="text-sm font-medium leading-5"> {post.title} </h3>
                                                <ul className="mt-1 flex space-x-1 text-xs leading-4 font-normal text-gray-500">
                                                    <li>{post.date}</li>
                                                    <li>&middot;</li>
                                                    <li>{post.commentCount} comments</li>
                                                    <li>&middot;</li>
                                                    <li>{post.shareCount} shares</li>
                                                </ul>
                                                <a href="#"
                                                    className={classNames(
                                                        'absolute inset-0 rounded-md',
                                                        'focus:z-10 focus:outline-none focus:ring-2 ring-blue-400'
                                                    )}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                }
                            */}

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
                >OK</button>
                <button className="px-4 py-2 min-w-[6rem] h-9 leading-4 text-gray-900 bg-gray-200 border border-gray-500 rounded shadow"
                    onClick={() => {
                        setShow(false);
                    }}
                >Cancel</button>
            </div>

        </div>
    );
}
