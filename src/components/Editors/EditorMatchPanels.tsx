import React from 'react';
import { classNames } from '../../utils/classnames';
import { MatchWeb, MatchWindows } from './EditorMatch';

function EditorMatchPanels({ setShow = (v: boolean) => { } }: { setShow?: (v: boolean) => void; }) {
    const [selected, setSelected] = React.useState(0);
    const pages = {
        'Web': <MatchWeb />,
        'Windows': <MatchWindows />,
    };
    return (
        <div className="px-2 sm:px-0 w-[460px] min-h-[560px] grid grid-rows-[1fr,auto]">

            <div className="grid grid-rows-[auto,1fr]">

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
