import { ReactNode, useState } from 'react';
import { atom, PrimitiveAtom } from 'jotai';
import { EditorData } from '@/store';
import { a, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

import { MatchWebState, Tab1_MatchWeb } from '../2-tabs/1-matching';
import { Tab2_MatchWindows } from '../2-tabs/2-match-windows';
import { Tab3_Options } from '../2-tabs/3-options';
import { Tab4_Fields } from '../2-tabs/4-fields';

import { ManifestState } from './1-manifest-state';
import { RealPages } from './4-real-pages';
import { EditorTabs } from './5-editor-tabs';

import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types';

type TabsCombinedProps = {
    urlsAtom: PrimitiveAtom<MatchWebState>;
    editorData: EditorData;
    dragBind: (...args: any[]) => ReactDOMAttributes;
};

function TabsCombined({urlsAtom, editorData, dragBind}: TabsCombinedProps) {
    // Pages
    const pages = {
        'Web': <Tab1_MatchWeb urlsAtom={urlsAtom} />,
        'Win32': <Tab2_MatchWindows editorData={editorData} />,
        'Options': <Tab3_Options editorData={editorData} />,
        'Fields': <Tab4_Fields editorData={editorData} />,
    };

    const pageNames = Object.keys(pages);
    const pageComponents = Object.values(pages);

    const selectedTabAtom = useState(() => atom(0))[0];

    return (
        <EditorTabs
            pageNames={pageNames}
            stateIndicator={
                <ManifestState urlsAtom={urlsAtom} />
            }
            dialogContentBody={
                <RealPages pageComponents={pageComponents} selectedTabAtom={selectedTabAtom} />
            }
            selectedTabAtom={selectedTabAtom}
            dragBind={dragBind}
        />
    );
}

type DialogFrameAndTabsProps = {
    footer: ReactNode;
    urlsAtom: PrimitiveAtom<MatchWebState>;
    editorData: EditorData;
};

export function DialogFrameAndTabs({ footer, urlsAtom, editorData }: DialogFrameAndTabsProps) {

    // Caption dragging
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
    const dragBind = useDrag(
        ({ down, offset: [mx, my] }) => {
            api.start({ x: mx, y: my, immediate: down });
        }
    );

    // Pages
    // const pages = {
    //     'Web': <Tab1_MatchWeb urlsAtom={urlsAtom} />,
    //     'Win32': <Tab2_MatchWindows editorData={editorData} />,
    //     'Options': <Tab3_Options editorData={editorData} />,
    //     'Fields': <Tab4_Fields editorData={editorData} />,
    // };

    // const pageNames = Object.keys(pages);
    // const pageComponents = Object.values(pages);

    // const selectedTabAtom = useState(() => atom(0))[0];

    return (
        <a.div style={{ x, y }} className="w-[460px] h-[640px] grid grid-rows-[minmax(0,1fr),auto] bg-gray-200 rounded overflow-hidden">

            <TabsCombined urlsAtom={urlsAtom} editorData={editorData} dragBind={dragBind} />

            {/* <EditorTabs
                pageNames={pageNames}
                stateIndicator={
                    <ManifestState urlsAtom={urlsAtom} />
                }
                dialogContentBody={
                    <RealPages pageComponents={pageComponents} selectedTabAtom={selectedTabAtom} />
                }
                selectedTabAtom={selectedTabAtom}
                dragBind={dragBind}
            /> */}

            {footer}
        </a.div>
    );
}
