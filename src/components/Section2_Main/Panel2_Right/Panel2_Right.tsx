import React, { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { FileUsAtomType, rightPanelData, ViewMode } from '@/store';
import { classNames } from '@/utils/classnames';
import { CardTitleTextNormal } from '../Panel1_FilesList/Card/Part1Card_Title/Part1Card_Title';
import { UISemiScrollbar } from '@ui/UISemiScrollbar';
import { ManiActions } from './ManiActions/ManiActions';
import { BodyText } from './BodyText';
import { Editors } from './Editors';

export function Panel2_Right({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const fileUsAtom = useAtomValue(rightPanelData.panelAtom);
    const rightPanelValue = useAtomValue(rightPanelData.valueAtom);
    const rightPanelViewMode = useAtomValue(rightPanelData.viewModeAtom);

    const canEditManifest = !!fileUsAtom;
    const showRaw = rightPanelViewMode === ViewMode.raw || (rightPanelViewMode === ViewMode.edit && !canEditManifest);

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

                    <UISemiScrollbar className={classNames(
                        "px-2 pt-1 pb-4 overflow-auto w-full h-full",
                        showRaw
                            ? "font-mono text-xs text-primary-100 bg-[#011627] opacity-60 cursor-default"
                            : "text-xs text-primary-100",
                    )}>
                        {showRaw
                            ? <BodyText text={rightPanelValue.raw || ''} />
                            : <Editors fileUsAtom={fileUsAtom} />
                        }
                    </UISemiScrollbar>
                </div>
            }
        </div>
    );
}
