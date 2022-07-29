import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { FileUsAtomType, rightPanelData, doSetCurrentCardAtom } from '@/store';
import { CardTitleTextMemo } from './CardTitleText';
import { CardActions } from './CardTitleActions';

export function Part1_CardTitle({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const isCurrentCard = useAtomValue(useAtomValue(fileUsAtom).state.isCurrentAtom);
    const doSetCurrentCard = useSetAtom(doSetCurrentCardAtom);
    const setRightPanel = useSetAtom(rightPanelData.panelAtom);
    
    function toggleCardSelection() {
        doSetCurrentCard({ fileUsAtom, setCurrent: !isCurrentCard });
        setRightPanel(!isCurrentCard ? fileUsAtom : undefined);
    }
    
    return (
        <div className={`relative p-2 ${isCurrentCard ? 'bg-blue-900' : 'bg-gray-900'} text-gray-100`}>

            {/* Title selection */}
            <div className="overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer select-none" onClick={toggleCardSelection}>
                <CardTitleTextMemo fileUsAtom={fileUsAtom} />
            </div>

            {isCurrentCard && <CardActions fileUsAtom={fileUsAtom} />}
        </div>
    );
}
