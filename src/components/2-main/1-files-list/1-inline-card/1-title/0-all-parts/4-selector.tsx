import { ReactNode } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { FileUsAtomType, rightPanelData, doSetCurrentCardAtom } from '@/store';

export function CardTitleSelector({ fileUsAtom, children }: { fileUsAtom: FileUsAtomType; children: ReactNode; }) {
    const isCurrentCard = useAtomValue(useAtomValue(fileUsAtom).state.isCurrentAtom);
    const doSetCurrentCard = useSetAtom(doSetCurrentCardAtom);
    const setRightPanel = useSetAtom(rightPanelData.panelAtom);

    function toggleCardSelection() {
        doSetCurrentCard({ fileUsAtom, setCurrent: !isCurrentCard });
        setRightPanel(!isCurrentCard ? fileUsAtom : undefined);
    }

    return (
        <div
            className={`relative p-2 text-primary-100 ${isCurrentCard ? "bg-blue-900 card-current" : "bg-primary-900"} cursor-pointer select-none`}
            onClick={toggleCardSelection}
        >
            {children}
        </div>
    );
}
