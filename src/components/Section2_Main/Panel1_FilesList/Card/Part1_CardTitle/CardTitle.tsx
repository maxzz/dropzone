import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { FileUsAtomType, rightPanelData, doSetCurrentCardAtom } from '@/store';
import { CardTitleTextMemo } from './CardTitleText';
import { CardActions } from './CardTitleActions';

export function CardTitle({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const currentCard = useAtomValue(useAtomValue(fileUsAtom).state.isCurrentAtom);
    const doSetCurrentCard = useSetAtom(doSetCurrentCardAtom);
    const setRightPanel = useSetAtom(rightPanelData.panelAtom); //#091e4c
    
    function selectCard() {
        doSetCurrentCard({ fileUsAtom, setCurrent: !currentCard });
        setRightPanel(!currentCard ? fileUsAtom : undefined);
    }
    
    return (
        <div className={`relative p-2 ${currentCard ? 'bg-blue-900' : 'bg-gray-900'} text-gray-100`}>

            {/* Title selection */}
            <div className="overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer select-none" onClick={selectCard}>
                <CardTitleTextMemo fileUsAtom={fileUsAtom} />
            </div>

            {currentCard && <CardActions fileUsAtom={fileUsAtom} />}
        </div>
    );
}
