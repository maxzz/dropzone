import React from 'react';
import { IconSearch } from '../UI/UiIcons';

function Search() {
    return (
        <div className="w-32 h-8 px-1 border-2 rounded flex items-center bg-gray-600">
            <input className="w-full h-full text-sm text-gray-200 bg-gray-600" />
            <IconSearch className="w-4 h-4" />
        </div>
    );
}

export default Search;
