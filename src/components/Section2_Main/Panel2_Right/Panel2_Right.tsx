import React, { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { FileUs, FileUsAtomType, rightPanelData, ViewMode } from '@/store';
import { classNames } from '@/utils/classnames';
import { CardTitleTextNormal } from '../Panel1_FilesList/Card/Part1Card_Title/Part1Card_Title';
import { Scroller } from './Scroller';
import { ManiActions } from './ManiActions/ManiActions';
import { BodyAsHighlightedText } from './BodyAsHighlightedText';
import { BodyAsEditors } from './BodyAsEditors';

export function Panel2_Right({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const fileUsAtom: FileUsAtomType | undefined = useAtomValue(rightPanelData.panelAtom);
    const fileUs: FileUs | undefined = useAtomValue(rightPanelData.valueAtom);
    const viewMode = useAtomValue(rightPanelData.viewModeAtom);

    const canEditManifest = !!fileUsAtom;
    const showRaw = viewMode === ViewMode.raw || (viewMode === ViewMode.edit && !canEditManifest);

    return (
        <div className={classNames("flex-auto pt-2 pb-2 w-full h-full overflow-hidden bg-primary-900", className)} {...rest}>
            {fileUs &&
                <div className="w-full h-full flex flex-col">

                    {/* Card title */}
                    <div className="px-2 pt-1 pb-3 text-gray-100 bg-primary-900 border-b-[0.5px] border-primary-600">
                        <CardTitleTextNormal
                            fileUsAtom={rightPanelData.valueAtom as FileUsAtomType}
                            actions={fileUsAtom && <ManiActions fileUsAtom={fileUsAtom} />}
                        />
                    </div>

                    <Scroller className={
                        showRaw
                            ? "font-mono text-xs text-primary-100 bg-[#011627] opacity-60 cursor-default"
                            : "text-xs text-primary-100"
                    }>
                        {showRaw
                            ? <BodyAsHighlightedText text={fileUs.raw || ''} />
                            : fileUsAtom && <BodyAsEditors fileUsAtom={fileUsAtom} />
                        }
                    </Scroller>

                </div>
            }
        </div>
    );
}
