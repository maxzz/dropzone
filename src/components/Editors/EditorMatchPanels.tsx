import React from 'react';
import { EditorData } from '../../store/store';
import { classNames } from '../../utils/classnames';
import { MatchWeb, MatchWindows } from './EditorMatch';

function EditorMatchPanels({ editorData, setShow = (v: boolean) => { } }: { editorData: EditorData; setShow?: (v: boolean) => void; }) {
    const [selected, setSelected] = React.useState(0);
    const pages = {
        'Match Web': <MatchWeb editorData={editorData} />,
        'Match Windows': <MatchWindows editorData={editorData} />,
    };
    return (
        <div className={classNames(
            "w-[460px] min-h-[560px] grid grid-rows-[1fr,auto]",
            "bg-gray-200 rounded overflow-hidden",
        )}>

            {/* Editor body */}
            <div className="grid grid-rows-[auto,1fr]">
                {/* Tabs */}
                <div className="px-4 pt-4 pb-2 flex justify-items-start space-x-1 bg-blue-900/20 rounded-t">
                    {Object.keys(pages).map((pageTitle, idx) => (
                        <button
                            className={classNames(
                                'px-4 py-2.5 leading-5 text-sm font-medium text-gray-700 rounded focus:outline-none',
                                selected === idx ? 'bg-white shadow' : 'text-gray-700/80 hover:bg-white/[0.4] hover:text-white'
                            )}
                            key={pageTitle}
                            onClick={() => {
                                setSelected(idx);
                            }}
                        >
                            {pageTitle}
                        </button>
                    ))}
                </div>
                {/* Pages */}
                <div>
                    {Object.values(pages).map((pageContent, idx) => (
                        <React.Fragment key={idx}>
                            {selected === idx &&
                                <div key={idx} className={'h-full bg-white text-sm'}>
                                    {pageContent}
                                </div>
                            }
                        </React.Fragment >
                    ))}
                </div>
            </div>

            {/* Editor buttons */}
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

export default EditorMatchPanels;

//TODO: events onTabChange w/ ability to cancel
//TODO: state is tab dirty
//TODO: allow to close dialog if there is nothing dirty

//TODO: should be only one 'Match Web': <MatchWeb /> or 'Match Windows': <MatchWindows /> (but the user should be able to switch Windows to Web?)
