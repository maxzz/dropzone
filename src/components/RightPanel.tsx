import React from 'react';
import { useAtom } from 'jotai';
import { rightPanelValue } from '../store/store';
import { IconBack } from './UI/UiIcons';

function RightPanel(props: React.HTMLAttributes<HTMLDivElement>) {
    const [rightPanel] = useAtom(rightPanelValue);
    return (
        <div className="" {...props}>
            <IconBack className="w-12 h-12 p-2 bg-green-500" />
            {rightPanel &&
                <div>
                    {rightPanel.raw}
                </div>}
        </div>
    );
}

export default RightPanel;
