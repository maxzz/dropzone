import React, { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { FileUsAtomType, rightPanelData } from '@/store';
import { UISemiScrollbar } from '@ui/UISemiScrollbar';
import { classNames } from '@/utils/classnames';
import { CardTitleText } from '../Panel1_FilesList/Card/Part1_CardTitle/CardTitleText';
import { CardTitleActions } from '../Panel1_FilesList/Card/Part1_CardTitle/CardTitleActions';

export function Panel2_Right(props: HTMLAttributes<HTMLDivElement>) {
    const { className, ...rest } = props;
    const rightPanelAtom = useAtomValue(rightPanelData.panelAtom);
    const rightPanelValue = useAtomValue(rightPanelData.valueAtom);
    return (
        <div className={classNames("flex-auto pt-2 pb-2 w-full h-full overflow-hidden bg-primary-900", className)} {...rest}>
            {rightPanelValue &&
                <div className="w-full h-full flex flex-col">

                    {/* Card title */}
                    <div className="relative p-2 pt-0 text-gray-100 bg-primary-900 border-b-[0.5px] border-primary-600">
                        <CardTitleText
                            fileUsAtom={rightPanelData.valueAtom as FileUsAtomType}
                            actions={<>
                                {rightPanelAtom &&
                                    <CardTitleActions fileUsAtom={rightPanelAtom} />
                                }
                            </>}
                        />

                        {/* {rightPanelAtom &&
                            <CardTitleActions fileUsAtom={rightPanelAtom} />
                        } */}
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
