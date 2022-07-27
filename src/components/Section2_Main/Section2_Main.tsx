import React from 'react';
import { Panel1_FilesList } from './Panel1_FilesList/Panel1_FilesList';
import { Panel2_Right } from './Panel2_Right/Panel2_Right';
import { SimpleSplitPane } from '@ui/SimpleSplitPane/SimpleSplitPane';

// import { CardMenuOverlays } from './Panel1_FilesList/Card/CardMenuOverlays';
// import { CardMenu } from './Panel1_FilesList/Card/CardMenu';
// import { Panel3_SelectedItems } from './Panel3_SelectedItems/Panel3_SelectedItems';

export function Section2_Main() {
    return (<>
        {/* <CardMenuOverlays /> */}
        {/* <CardMenu /> */}
        {/* <Panel3_SelectedItems className="flex-none" /> */}

        <main className="flex-1 relative flex min-w-0 min-h-0 ring-1 ring-primary-500 rounded overflow-hidden">
            <SimpleSplitPane vertical={false} className="splitpane" minPersent={24}>
                <Panel1_FilesList />
                <Panel2_Right />
            </SimpleSplitPane>
        </main>
    </>);
}

//TODO: show file size and total files size
//TODO: copy to clipboard filename
