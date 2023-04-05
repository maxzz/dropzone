import React from 'react';
import { a, useSpring } from '@react-spring/web';
import { Panel1_FilesList } from './Panel1_FilesList';
import { Panel2_Right } from './Panel2_Right';
import { SimpleSplitPane } from '@ui/SimpleSplitPane/SimpleSplitPane';
import { useAtomValue } from 'jotai';
import { hasFilesAtom } from '@/store';

export function Section2_Main() {
    const hasFiles = useAtomValue(hasFilesAtom);
    const styles = useSpring({ opacity: hasFiles ? 1 : 0 });
    return (
        <a.main style={styles} className="flex-1 relative flex min-w-0 min-h-0 ring-1 ring-primary-500 rounded overflow-hidden">
            <SimpleSplitPane vertical={false} className="splitpane" minPersent={24}>
                <Panel1_FilesList />
                <Panel2_Right />
            </SimpleSplitPane>
        </a.main>
    );
}

//TODO: show file size and total files size
//TODO: copy to clipboard filename
