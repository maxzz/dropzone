import React from 'react';
import { IconBack } from './UI/UiIcons';

function RightPanel(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="" {...props}>
            <IconBack className="w-12 h-12 p-2 bg-green-500" />
        </div>
    );
}

export default RightPanel;
