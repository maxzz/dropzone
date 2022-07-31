import React, { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { FileUsAtomType, rightPanelData } from '@/store';
import { UISemiScrollbar } from '@ui/UISemiScrollbar';
import { classNames } from '@/utils/classnames';
import { CardTitleText } from '../Panel1_FilesList/Card/Part1_CardTitle/CardTitleText';
import { ManiActions } from './ManiActions/ManiActions';

export function Panel2_Right({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const rightPanelAtom = useAtomValue(rightPanelData.panelAtom);
    const rightPanelValue = useAtomValue(rightPanelData.valueAtom);
    return (
        <div className={classNames("flex-auto pt-2 pb-2 w-full h-full overflow-hidden bg-primary-900", className)} {...rest}>
            {rightPanelValue &&
                <div className="w-full h-full flex flex-col">

                    {/* Card title */}
                    <div className="px-2 pt-1 pb-3 text-gray-100 bg-primary-900 border-b-[0.5px] border-primary-600">
                        <CardTitleText
                            fileUsAtom={rightPanelData.valueAtom as FileUsAtomType}
                            actions={<>
                                {rightPanelAtom && <ManiActions fileUsAtom={rightPanelAtom} />}
                            </>}
                        />
                    </div>

                    {/* Raw data preview (+ codemirror?) */}
                    <UISemiScrollbar className={`px-2 pt-1 pb-4 overflow-auto w-full h-full text-xs text-primary-100 bg-primary-800 opacity-50 cursor-default`}>
                        <div className="font-mono whitespace-pre">
                            {rightPanelValue.raw}
                        </div>
                    </UISemiScrollbar>
                </div>
            }
        </div>
    );
}
