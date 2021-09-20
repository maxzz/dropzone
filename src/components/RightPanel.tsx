import React from 'react';
import { useAtom } from 'jotai';
import { rightPanelAtom, rightPanelValueAtom } from '../store/store';
import { IconBack } from './UI/UiIcons';
import { useUpdateAtom } from 'jotai/utils';

function RightPanel(props: React.HTMLAttributes<HTMLDivElement>) {
    const {className, ...rest} = props;
    const [rightPanelValue] = useAtom(rightPanelValueAtom);
    const setRightPanel = useUpdateAtom(rightPanelAtom);
    return (
        <div className={`bg-gray-900 text-gray-100 ${className}`} {...rest}>
            {rightPanelValue &&
                <>
                    {/* <IconBack className="w-12 h-12 p-2 bg-green-500" onClick={() => setRightPanel(undefined)} /> */}

                    <div className="my-2 text-xs bg-gray-800 opacity-50 border-4 border-gray-800 shadow-md">
                        {/* overflow-auto smallscroll */}
                        <pre>{rightPanelValue.raw}</pre>
                    </div>
                </>
            }
        </div>
    );
}

export default RightPanel;
