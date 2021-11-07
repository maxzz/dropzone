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

    return (
        <div className="px-2 sm:px-0 w-[460px] h-[600px]">

            <Tab.Group>
                <Tab.List className="p-1 flex justify-items-start space-x-1 bg-blue-900/20 rounded-t">
                    {Object.keys(categories).map((category) => (
                        <Tab
                            key={category}
                            className={({ selected }) => classNames(
                                'px-4 py-2.5 leading-5 text-sm font-medium text-gray-700 rounded-lg',
                                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                                selected
                                    ? 'bg-white shadow'
                                    : 'text-blue-50 hover:bg-white/[0.12] hover:text-white'
                            )}
                        >
                            {category}
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels className="">
                    {Object.values(categories).map((posts, idx) => (
                        <Tab.Panel key={idx}
                            className={classNames(
                                'p-3 bg-white',
                                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                            )}
                        >
                            {idx === 0
                                ? <EditorMatch fileUsAtom={fileUsAtom} />
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

                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>

            <div className="!mt-4 flex justify-end space-x-2">
                <button className="px-4 py-2 min-w-[5rem] h-8 leading-4 text-gray-200 bg-gray-600 rounded"
                    onClick={() => {
                        setShow(false);
                    }}
                >OK</button>
                <button className="px-4 py-2 min-w-[5rem] h-8 leading-4 text-gray-200 bg-gray-600 rounded"
                    onClick={() => {
                        setShow(false);
                    }}
                >Cancel</button>
            </div>

        </div>
    );
}
