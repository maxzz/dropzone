import React from 'react';
import { useAtom } from 'jotai';
import { rightPanelAtom, rightPanelValueAtom } from '../store/store';
import { IconBack } from './UI/UiIcons';
import { useUpdateAtom } from 'jotai/utils';

function RightPanel(props: React.HTMLAttributes<HTMLDivElement>) {
    const [rightPanelValue] = useAtom(rightPanelValueAtom);
    const setRightPanel = useUpdateAtom(rightPanelAtom);
    return (
        <div className="" {...props}>
            {rightPanelValue &&
                <>
                    <IconBack className="w-12 h-12 p-2 bg-green-500" onClick={() => setRightPanel(undefined)} />
                    <div>
                        {rightPanelValue.raw}
                    </div>
                </>
            }
        </div>
    );
}

export default RightPanel;
