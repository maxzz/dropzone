import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { FileUsAtomType, rightPanelData, doSetCurrentCardAtom } from '@/store';
import { CardTitleText } from './CardTitleText';
import { classNames } from '@/utils/classnames';

export const CardTitleTextMemo = React.memo(CardTitleText);

export function Part1_CardTitle({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const isCurrentCard = useAtomValue(useAtomValue(fileUsAtom).state.isCurrentAtom);
    const doSetCurrentCard = useSetAtom(doSetCurrentCardAtom);
    const setRightPanel = useSetAtom(rightPanelData.panelAtom);

    function toggleCardSelection() {
        doSetCurrentCard({ fileUsAtom, setCurrent: !isCurrentCard });
        setRightPanel(!isCurrentCard ? fileUsAtom : undefined);
    }

    return (
        <div
            className={classNames(
                "relative p-2 text-primary-100 cursor-pointer select-none",
                isCurrentCard ? "bg-blue-900" : "bg-primary-900",
            )}
            onClick={toggleCardSelection}
        >
            <CardTitleTextMemo fileUsAtom={fileUsAtom} />
        </div>
    );
}
