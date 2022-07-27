import React, { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { FileUsAtom, rightPanelValueAtom } from '@/store';
//import { IconBack } from '@ui/UiIcons';
import { UISimpleBar } from '@ui/UIScrollbar/UIScrollbar';
import { CardTitleText } from '../Panel1_FilesList/Card/CardTitle';

export function Panel2_Right(props: HTMLAttributes<HTMLDivElement>) {
    const { className, ...rest } = props;
    const rightPanelValue = useAtomValue(rightPanelValueAtom);
    return (
        <>
            {/* <IconBack className="w-12 h-12 p-2 bg-green-500" onClick={() => setRightPanel(undefined)} /> */}

            <div className={`pt-4 pb-2 flex-auto overflow-hidden w-full h-full bg-gray-900 ${className}`} {...rest}>
                {rightPanelValue &&
                    <div className="w-full h-full flex flex-col space-y-2">
                        {/* Card title */}
                        <div className="p-2 text-gray-100 bg-gray-900 border-b-[0.5px] border-gray-600">
                            <CardTitleText fileUsAtom={rightPanelValueAtom as FileUsAtom} />
                        </div>
                        {/* Raw data preview (+ codemirror?) */}
                        <UISimpleBar className={`px-2 overflow-auto w-full h-full text-xs text-gray-100 bg-gray-800 opacity-50 cursor-default`}>
                            <div className="">
                                <pre className="">{rightPanelValue.raw}</pre>
                            </div>
                        </UISimpleBar>
                    </div>
                }
            </div>
        </>
    );
}
