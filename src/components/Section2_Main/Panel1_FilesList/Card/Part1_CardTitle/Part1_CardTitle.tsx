import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { FileUsAtomType, rightPanelData, doSetCurrentCardAtom } from '@/store';
import { CardTitleTextMemo } from './CardTitleText';
import { CardTitleActions } from './CardTitleActions';

export function Part1_CardTitle({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const isCurrentCard = useAtomValue(useAtomValue(fileUsAtom).state.isCurrentAtom);
    const doSetCurrentCard = useSetAtom(doSetCurrentCardAtom);
    const setRightPanel = useSetAtom(rightPanelData.panelAtom);
    
    function toggleCardSelection() {
        doSetCurrentCard({ fileUsAtom, setCurrent: !isCurrentCard });
        setRightPanel(!isCurrentCard ? fileUsAtom : undefined);
    }
    
    return (
        <div className={`relative p-2 ${isCurrentCard ? 'bg-blue-900' : 'bg-primary-900'} text-primary-100`}>

            {/* Title selection */}
            <div className="cursor-pointer select-none" onClick={toggleCardSelection}>
                <CardTitleTextMemo fileUsAtom={fileUsAtom} />
            </div>

            {/* {isCurrentCard && <CardActions fileUsAtom={fileUsAtom} />} */}
        </div>
    );
}
