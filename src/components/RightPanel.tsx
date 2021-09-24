import React from 'react';
import { useAtom } from 'jotai';
import { rightPanelAtom, rightPanelValueAtom } from '../store/store';
import { IconBack } from './UI/UiIcons';
import { useUpdateAtom } from 'jotai/utils';
import UISimpleBar from './UI/UIScrollbar';
import 'overlayscrollbars/css/OverlayScrollbars.css';

function RightPanel(props: React.HTMLAttributes<HTMLDivElement>) {
    const { className, ...rest } = props;
    const [rightPanelValue] = useAtom(rightPanelValueAtom);
    return (
        <>
            {/* <IconBack className="w-12 h-12 p-2 bg-green-500" onClick={() => setRightPanel(undefined)} /> */}

            <div className={`flex-auto bg-gray-900 ${className}`} {...rest}>
                {rightPanelValue &&
                    <UISimpleBar className={`overflow-auto w-full h-full text-gray-500 cursor-default`}>
                        <div className="text-xs bg-gray-900 text-gray-100 opacity-50">
                            <pre>{rightPanelValue.raw}</pre>
                        </div>
                    </UISimpleBar>
                }
            </div>
        </>
    );
}

export default RightPanel;
