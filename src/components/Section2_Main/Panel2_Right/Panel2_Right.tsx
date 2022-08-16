import React, { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { FileUsAtomType, rightPanelData, ViewMode } from '@/store';
import { classNames } from '@/utils/classnames';
import { CardTitleTextNormal } from '../Panel1_FilesList/Card/Part1Card_Title/Part1Card_Title';
import { ManiActions } from './ManiActions/ManiActions';
import { BodyText } from './BodyText';
import { UISemiScrollbar } from '@ui/UISemiScrollbar';
import { List_Manifest } from '@/components/Section4_Dialogs/List_Manifest/List_Manifest';

export function Panel2_Right({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const fileUsAtom = useAtomValue(rightPanelData.panelAtom);
    const rightPanelValue = useAtomValue(rightPanelData.valueAtom);
    const rightPanelViewMode = useAtomValue(rightPanelData.viewModeAtom);
    
    const showRaw = rightPanelViewMode === ViewMode.raw || false; //TODO: check if we can edit manifest
    return (
        <div className={classNames("flex-auto pt-2 pb-2 w-full h-full overflow-hidden bg-primary-900", className)} {...rest}>
            {rightPanelValue &&
                <div className="w-full h-full flex flex-col">

                    {/* Card title */}
                    <div className="px-2 pt-1 pb-3 text-gray-100 bg-primary-900 border-b-[0.5px] border-primary-600">
                        <CardTitleTextNormal
                            fileUsAtom={rightPanelData.valueAtom as FileUsAtomType}
                            actions={<>
                                {fileUsAtom && <ManiActions fileUsAtom={fileUsAtom} />}
                            </>}
                        />
                    </div>

                    <UISemiScrollbar className={`px-2 pt-1 pb-4 overflow-auto w-full h-full text-xs text-primary-100 bg-[#011627] opacity-60 cursor-default`}>
                        {showRaw
                            ? <BodyText text={rightPanelValue.raw || ''} />
                            : <List_Manifest />
                        }
                    </UISemiScrollbar>
                </div>
            }
        </div>
    );
}
