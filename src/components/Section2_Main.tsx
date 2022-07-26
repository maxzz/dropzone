import React from 'react';
import { FilesList } from './Panel1_FilesList/Panel1_FilesList';
import RightPanel from './Panel2_Right/RightPanel';
//import UISplitPane from '@ui/nun/UISplitPane';
import SimpleSplitPane from '@ui/SimpleSplitPane/SimpleSplitPane';

export function Section2_Main() {
    return (
        <main className="flex-1 relative flex min-w-0 min-h-0">
            <SimpleSplitPane vertical={false} className="splitpane" minPersent={24}>
                {/* <UISplitPane split="vertical" defaultSize="50%"> */}
                {/* minSize={382} */}
                <FilesList />
                <RightPanel />
                {/* </UISplitPane> */}
            </SimpleSplitPane>
        </main>
    );
}
