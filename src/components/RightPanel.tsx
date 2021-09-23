import React from 'react';
import { useAtom } from 'jotai';
import { rightPanelAtom, rightPanelValueAtom } from '../store/store';
import { IconBack } from './UI/UiIcons';
import { useUpdateAtom } from 'jotai/utils';
import UISimpleBar from './UI/UIScrollbar';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

function RightPanel(props: React.HTMLAttributes<HTMLDivElement>) {
    const { className, ...rest } = props;
    const [rightPanelValue] = useAtom(rightPanelValueAtom);
    const setRightPanel = useUpdateAtom(rightPanelAtom);
    return (
        <OverlayScrollbarsComponent>
        <div className={`bg-gray-900 text-gray-100 w-auto h-auto ${className}`} {...rest}>
            {rightPanelValue &&
                <>
                    {/* <IconBack className="w-12 h-12 p-2 bg-green-500" onClick={() => setRightPanel(undefined)} /> */}

                    {/* <OverlayScrollbarsComponent> */}
                        {/* options={{ scrollbars: { autoHide: 'scroll' } }} */}
                        {/* <UISimpleBar className={`text-gray-500 ${className}`} autoHide={false}> */}

                        {/* <div className="w-full h-full"> */}
                            <div className="my-2 text-xs bg-gray-800 opacity-50 border-4 border-gray-800 shadow-md">
                                {/* overflow-auto smallscroll */}
                                <pre>{rightPanelValue.raw}</pre>
                            </div>
                        {/* </div> */}
                        {/* </UISimpleBar> */}
                    {/* </OverlayScrollbarsComponent> */}
                </>
            }
        </div>
        </OverlayScrollbarsComponent>
    );
}

export default RightPanel;
