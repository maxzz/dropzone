import { ReactNode, useState } from 'react';
import { atom, PrimitiveAtom } from 'jotai';
import { EditorData } from '@/store';
import { a, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { Tab1_MatchWeb } from '../3-tabs/3-tab1-matching';
import { MatchWebState } from '../3-tabs/3-tab1-matching/0-urls-dirty';
import { Tab2_MatchWindows } from '../3-tabs/3-tab2-match-windows';
import { Tab3_Options } from '../3-tabs/3-tab3-options';
import { Tab4_Fields } from '../3-tabs/3-tab4-fields';
import { ManifestState } from './1-manifest-state';
import { RealPages } from './4-real-pages';
import { EditorTabs } from './5-dditor-tabs';

type TopTabsAndBodyProps = {
    footer: ReactNode;
    urlsAtom: PrimitiveAtom<MatchWebState>;
    editorData: EditorData;
};

export function TopTabsAndBody({ footer, urlsAtom, editorData }: TopTabsAndBodyProps) {

    // Caption dragging
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
    const dragBind = useDrag(
        ({ down, offset: [mx, my] }) => {
            api.start({ x: mx, y: my, immediate: down });
        }
    );

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
        <a.div style={{ x, y }} className="w-[460px] h-[640px] grid grid-rows-[minmax(0,1fr),auto]  bg-gray-200 rounded overflow-hidden">

            <EditorTabs
                pageNames={pageNames}
                stateIndicator={<ManifestState urlsAtom={urlsAtom} />}
                dialogContentBody={<RealPages pageComponents={pageComponents} selectedTabAtom={selectedTabAtom} />}
                selectedTabAtom={selectedTabAtom}
                dragBind={dragBind}
            />

            {footer}
        </a.div>
    );
}
