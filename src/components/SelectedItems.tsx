import React from 'react';
import { useAtom } from 'jotai';
import { FileUsAtom, selected4ActionAtom } from '@/store/store';
import { IconDocument } from './UI/UIIcons';

function SelectedItem({ selectedAtom }: { selectedAtom: FileUsAtom; }) {
    const [selected] = useAtom(selectedAtom);
    const mark = false;
    if (!selected) {
        return null;
    }
    return (
        <div
            className={`w-[max(4rem,8vh)] h-auto ratio11 p-2 ${mark ? 'bg-gray-800' : 'bg-gray-600'} rounded border border-gray-500 text-xs grid overflow-hidden shadow-lg select-none cursor-pointer`}
            title={`"${selected.fname}"`}
        >
            <IconDocument className="w-6 h-6 mb-1 place-self-center" />
            <div className="overflow-hidden whitespace-nowrap overflow-ellipsis text-center">{selected.fname}</div>
        </div>
    );
}

function SelectedItems(props: React.HTMLAttributes<HTMLDivElement>) {
    const { className, ...rest } = props;
    const [selectedAtoms] = useAtom(selected4ActionAtom);

    if (!selectedAtoms.length) {
        return null;
    }

    return (
        <div className={`${className} p-3 min-h-[40px] flex items-center bg-gray-700 text-gray-100 ring-2 ring-gray-50 rounded-md`} {...rest}
            title="Action items"
        >
            <div className="flex space-x-2">
                {selectedAtoms.map((atom) => <SelectedItem selectedAtom={atom} key={`${atom}`} />)}
            </div>
        </div>
    );
}

export default SelectedItems;
