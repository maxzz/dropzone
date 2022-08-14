import React, { HTMLAttributes, Suspense } from 'react';
import { useAtomValue } from 'jotai';
import { FileUsAtomType, rightPanelData } from '@/store';
import { UISemiScrollbar } from '@ui/UISemiScrollbar';
import { classNames } from '@/utils/classnames';
import { CardTitleTextNormal } from '../Panel1_FilesList/Card/Part1Card_Title/Part1Card_Title';
import { ManiActions } from './ManiActions/ManiActions';

import BodyText from './BodyText';
//const BodyText = React.lazy(() => import('./BodyText'));

export function Panel2_Right({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const rightPanelAtom = useAtomValue(rightPanelData.panelAtom);
    const rightPanelValue = useAtomValue(rightPanelData.valueAtom);
    return (
        <div className={classNames("flex-auto pt-2 pb-2 w-full h-full overflow-hidden bg-primary-900", className)} {...rest}>
            {rightPanelValue &&
                <div className="w-full h-full flex flex-col">

                    {/* Card title */}
                    <div className="px-2 pt-1 pb-3 text-gray-100 bg-primary-900 border-b-[0.5px] border-primary-600">
                        <CardTitleTextNormal
                            fileUsAtom={rightPanelData.valueAtom as FileUsAtomType}
                            actions={<>
                                {rightPanelAtom && <ManiActions fileUsAtom={rightPanelAtom} />}
                            </>}
                        />
                    </div>

                    {/* <Suspense fallback={""} > */}
                        <BodyText text={rightPanelValue.raw || ''} />
                    {/* </Suspense> */}
                </div>
            }
        </div>
    );
}
