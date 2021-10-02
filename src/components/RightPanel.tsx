import React from 'react';
import { useAtom } from 'jotai';
import { FileUsAtom, rightPanelValueAtom } from '../store/store';
import { IconBack } from './UI/UiIcons';
import { useUpdateAtom } from 'jotai/utils';
import UISimpleBar from './UI/UIScrollbar';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import { CardTitleText } from './Card/CardTitle';

function RightPanel(props: React.HTMLAttributes<HTMLDivElement>) {
    const { className, ...rest } = props;
    const [rightPanelValue] = useAtom(rightPanelValueAtom);
    return (
        <>
            {/* <IconBack className="w-12 h-12 p-2 bg-green-500" onClick={() => setRightPanel(undefined)} /> */}

            <div className={`px-2 pt-4 pb-2 flex-auto overflow-hidden w-full h-full bg-gray-900 ${className}`} {...rest}>
                {rightPanelValue &&
                    <div className="w-full h-full flex flex-col">
                        <div className="my-2 text-gray-100 bg-gray-900">
                            <CardTitleText atom={rightPanelValueAtom as FileUsAtom} />
                        </div>
                        <UISimpleBar className={`overflow-auto w-full h-full text-gray-500 cursor-default`}>
                            {/* <CardTitle /> */}
                            <div className="text-xs bg-gray-800 text-gray-100 opacity-50">
                                <pre>{rightPanelValue.raw}</pre>
                            </div>
                        </UISimpleBar>
                    </div>
                }
            </div>
        </>
    );
}

export default RightPanel;
