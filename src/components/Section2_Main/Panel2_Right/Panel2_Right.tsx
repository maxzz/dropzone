import React, { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { FileUs, FileUsAtomType, rightPanelData, ViewMode } from '@/store';
import { classNames } from '@/utils/classnames';
import { CardTitleTextNormal } from '../Panel1_FilesList/Card/Part1Card_Title/Part1Card_Title';
import { Scroller } from './Scroller';
import { ManiActions } from './ManiActions/ManiActions';
import { BodyAsHighlightedText } from './BodyAsHighlightedText';
import { Editor_FieldCatalog, Editor_Manifest } from './BodyAsEditors';

export function Panel2_Right({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const fileUsAtom: FileUsAtomType | undefined = useAtomValue(rightPanelData.panelAtom);
    const fileUs: FileUs | undefined = useAtomValue(rightPanelData.fileUsAtom);
    const viewRawText = useAtomValue(rightPanelData.viewModeAtom) === ViewMode.raw;
    return (
        <div className={classNames("flex-auto pt-2 pb-2 w-full h-full overflow-hidden bg-primary-900", className)} {...rest}>
            {fileUsAtom && fileUs &&
                <div className="w-full h-full flex flex-col">

                    {/* Card title */}
                    <div className="px-2 pt-1 pb-3 text-gray-100 bg-primary-900 border-b-[0.5px] border-primary-600">
                        <CardTitleTextNormal
                            fileUsAtom={fileUsAtom}
                            actions={<ManiActions fileUsAtom={fileUsAtom} />}
                        />
                    </div>

                    {viewRawText
                        ?
                        <Scroller className="font-mono text-xs text-primary-100 bg-[#011627] opacity-60 cursor-default">
                            <BodyAsHighlightedText text={fileUs.raw || ''} />
                        </Scroller>
                        : fileUs.fcat
                            ?
                                <Editor_FieldCatalog fileUsAtom={fileUsAtom} />
                            :
                            <Scroller className="text-xs text-primary-100">
                                <Editor_Manifest fileUsAtom={fileUsAtom} />
                            </Scroller>
                    }

                </div>
            }
        </div>
    );
}
