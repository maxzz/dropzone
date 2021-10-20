import React from 'react';
import { IconSearch } from '../UI/UiIcons';

function FilterSearch() {
    return (
        <div className="flex-1 max-w-[320px]">
            <div className="w-full h-8 px-1 border-2 rounded flex items-center bg-gray-600">
                <input className="w-full text-sm text-gray-200 bg-gray-600" />
                <IconSearch className="w-4 h-4" />
            </div>
        </div>
    );
}

export default FilterSearch;
