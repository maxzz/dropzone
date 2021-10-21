import React from 'react';
import { useAtom } from 'jotai';
import { searchFilterAtom } from '../../store/store';
import { useKey } from 'react-use';
import { IconClose, IconSearch } from '../UI/UiIcons';

function FilterSearch() {
    const [filter, setFilter] = useAtom(searchFilterAtom);
    const keyboardRef = React.useRef<HTMLInputElement>(null);
    useKey('Escape', () => setFilter(''), { target: keyboardRef.current });
    const isEmpty = !filter;
    return (
        <div className="flex-1 max-w-[40rem] ml-2 md:ml-4 sm:self-stretch md:self-end md:pb-2 lg:pb-0 lg:self-auto flex justify-end">
            <div className={`${isEmpty ? 'w-12 rounded-full' : 'w-full rounded'} h-8 px-2 border-2 flex items-center bg-gray-700 focus-within:bg-gray-600`}>
                <input
                    className="w-full h-6 text-sm text-gray-200 bg-transparent focus:outline-none"
                    ref={keyboardRef}
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                />
                {isEmpty
                    ? <IconSearch className="w-4 h-4 flex-none" />
                    : <IconClose onClick={() => setFilter('')} className="w-6 h-6 p-0.5 cursor-pointer" />
                }
            </div>
        </div>
    );
}

export default FilterSearch;

//TODO: add history to UI and store history to the localStorage
