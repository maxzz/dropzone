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
    return (
        <>
            {/* <div className={`w-full h-full ${className}`}> */}
                {/* <UISimpleBar className={`---scrollbar000 text-gray-500`} autoHide={false}> */}
                <div className={`---cont flex-auto min-w-0 min-h-0 bg-gray-900 text-gray-100 ${className}`} {...rest}>
                    {rightPanelValue &&
                        // <div className={`---full w-full h-full`}>
                            <UISimpleBar className={`---scrollbar overflow-auto w-full h-full text-gray-500`} autoHide={false}>
                                <div className="text-xs bg-green-800 opacity-50 border-8 border-gray-800 shadow-md">
                                    <pre>{rightPanelValue.raw}</pre>
                                </div>
                            </UISimpleBar>
                        // </div>
                    }
                </div>
                {/* </UISimpleBar> */}
            {/* </div> */}
        </>
    );
}

function RightPanel4OKLindof(props: React.HTMLAttributes<HTMLDivElement>) {
    const { className, ...rest } = props;
    const [rightPanelValue] = useAtom(rightPanelValueAtom);
    return (
        <div className={`---cont bg-gray-900 text-gray-100 w-full h-full overflow-auto ${className}`} {...rest}>
            {rightPanelValue &&
                <div className="---full  overflow-auto">
                    {/* <OverlayScrollbarsComponent> */}
                    <div className="my-2 text-xs bg-gray-800 opacity-50 border-4 border-gray-800 shadow-md">
                        <pre>{rightPanelValue.raw}</pre>
                    </div>
                    {/* </OverlayScrollbarsComponent> */}
                </div>
            }
        </div>
    );
}

function RightPanel3(props: React.HTMLAttributes<HTMLDivElement>) {
    const { className, ...rest } = props;
    const [rightPanelValue] = useAtom(rightPanelValueAtom);
    return (
        <div className={`---cont bg-gray-900 text-gray-100 w-full h-full overflow-hidden ${className}`} {...rest}>
            {rightPanelValue &&
                <div className="---full  overflow-auto">
                    {/* <OverlayScrollbarsComponent> */}
                    <div className="my-2 text-xs bg-gray-800 opacity-50 border-4 border-gray-800 shadow-md">
                        <pre>{rightPanelValue.raw}</pre>
                    </div>
                    {/* </OverlayScrollbarsComponent> */}
                </div>
            }
        </div>
    );
}

function RightPanel2(props: React.HTMLAttributes<HTMLDivElement>) {
    const { className, ...rest } = props;
    const [rightPanelValue] = useAtom(rightPanelValueAtom);
    const setRightPanel = useUpdateAtom(rightPanelAtom);
    return (

        <div className={`bg-gray-900 text-gray-100 ${className}`} {...rest}>
            {rightPanelValue &&
                <>
                    {/* <IconBack className="w-12 h-12 p-2 bg-green-500" onClick={() => setRightPanel(undefined)} /> */}

                    <OverlayScrollbarsComponent>
                        {/* options={{ scrollbars: { autoHide: 'scroll' } }} */}
                        {/* <UISimpleBar className={`text-gray-500 ${className}`} autoHide={false}> */}

                        {/* <div className="w-full h-full"> */}
                        <div className="my-2 text-xs bg-gray-800 opacity-50 border-4 border-gray-800 shadow-md">
                            {/* overflow-auto smallscroll */}
                            <pre>{rightPanelValue.raw}</pre>
                        </div>
                        {/* </div> */}
                        {/* </UISimpleBar> */}
                    </OverlayScrollbarsComponent>
                </>
            }
        </div>
    );
}

export default RightPanel;
