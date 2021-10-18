import { Atom, atom, useAtom } from 'jotai';
import React from 'react';
import { IconDocument } from './UI/UiIcons';

function SelectedItem({ selectedAtom }: { selectedAtom: Atom<string>; }) {
    const [selected] = useAtom(selectedAtom);
    return (
        <div className="min-w-[max(44px,10vh)] h-auto ratio34 p-2 rounded border border-gray-500 text-xs f_lex flex-col items-center overflow-hidden">
            <IconDocument className="w-6 h-6 mb-1 flex-none" />
            <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">{selected}</div>

        </div>
    );
}

function SelectedItems(props: React.HTMLAttributes<HTMLDivElement>) {
    const { className, ...rest } = props;
    const [selected] = React.useState([atom('long filename A'), atom('file B')]);

    // if (selected.length) {
    //     return null;
    // }

    return (
        <div className={`${className} p-4 min-h-[40px] flex items-center bg-gray-700 text-gray-100 ring-2 ring-gray-50 rounded-md`} {...rest}
            title="Action items"
        >
            <div className="flex space-x-2">
                {selected.map((atom) => <SelectedItem selectedAtom={atom} key={`${atom}`} />)}
            </div>
        </div>
    );
}

export default SelectedItems;
