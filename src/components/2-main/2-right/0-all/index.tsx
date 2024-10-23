import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { FileUs, FileUsAtomType, rightPanelAtoms, ViewMode } from '@/store';
import { classNames } from '@/utils';
import { CardTitleTextNormal } from '../../1-files-list/1-inline-card/1-title';
import { Body_CaptionActions } from '../1-caption-actions';
import { Body_Xml } from '../3-file-xml';
import { Body_FieldCatalog } from '../4-file-field-catalog';
import { Body_Manifest } from '../2-file-manifest';

export function Panel2_Right({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const fileUsAtom: FileUsAtomType | undefined = useAtomValue(rightPanelAtoms.panelAtom);
    const fileUs: FileUs | undefined = useAtomValue(rightPanelAtoms.fileUsAtom);
    const viewRawText = useAtomValue(rightPanelAtoms.viewModeAtom) === ViewMode.raw;

    return (
        <div className={classNames("flex-auto pt-2 pb-2 w-full h-full overflow-hidden bg-primary-900", className)} {...rest}>

            {fileUsAtom && fileUs &&
                <div className="w-full h-full flex flex-col">

                    {/* Card title */}
                    <div className="px-2 pt-1 pb-3 text-gray-100 bg-primary-900 border-b-[0.5px] border-primary-600">
                        <CardTitleTextNormal
                            fileUsAtom={fileUsAtom}
                            actions={
                                <Body_CaptionActions fileUsAtom={fileUsAtom} />
                            }
                        />
                    </div>

                    {viewRawText
                        ? (
                            <Body_Xml className="font-mono text-xs text-primary-100 bg-[#011627] opacity-60 cursor-default" text={fileUs.fileCnt.raw || ''} />
                        )
                        : fileUs.parsedSrc.fcat
                            ? (
                                <Body_FieldCatalog fileUsAtom={fileUsAtom} />
                            )
                            : (
                                <Body_Manifest className="text-xs text-primary-100" fileUsAtom={fileUsAtom} />
                            )
                    }

                </div>
            }
        </div>
    );
}
