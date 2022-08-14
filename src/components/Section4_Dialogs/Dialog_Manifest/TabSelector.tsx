import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { a, useSpring } from "@react-spring/web";
import { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";
import { classNames } from "@/utils/classnames";
import { UISemiScrollbar } from "@ui/UISemiScrollbar";
import { RefObject, useRef } from "react";

function TabSelector({ tabs, active, setActive }: { tabs: string[], active: number, setActive: (v: number) => void; }) {
    const $root = useRef<HTMLDivElement>(null);
    const $indicator = useRef<HTMLDivElement>(null);
    const $items = useRef(tabs.map<RefObject<HTMLButtonElement>>(React.createRef));

    const [indicatorStyles, api] = useSpring(() => ({ x: 0, y: 0, width: 0, height: 0, config: { mass: .3, tension: 280, friction: 14 } }));

    useEffect(() => {
        function animate() {
            const menuOffset = $root.current?.getBoundingClientRect();
            const activeItem = $items.current[active].current;
            if (menuOffset && activeItem) {
                const { top, left, width, height } = activeItem.getBoundingClientRect();
                api.start({
                    x: left - menuOffset.x,
                    y: top - menuOffset.y,
                    width: width,
                    height: height,
                });

                // api.start([{
                //     x: left - menuOffset.x,
                //     y: top - menuOffset.y,
                //     width: width,
                //     height: height,
                // }
                // ]);

                // api.start(async (next, cancel) => ({
                //     x: left - menuOffset.x,
                //     y: top - menuOffset.y,
                //     width: width,
                //     height: height,
                // }));
            }
        }
        animate();
    }, [active, $root.current, $indicator.current, $items.current,]);

    return (
        <div ref={$root} className="relative flex">
            <a.div
                ref={$indicator}
                style={{ ...indicatorStyles, filter: 'drop-shadow(#0003 0px 0px .05rem)' }}
                className="absolute bg-gray-50 rounded border border-gray-900/50 z-[1] shadow"
            />

            <div className="flex justify-items-start space-x-1">
                {tabs.map((pageTitle, idx) => (
                    <button
                        ref={$items.current[idx]}
                        className={classNames(
                            'px-4 py-2.5 leading-5 text-sm font-medium text-gray-700 rounded focus:outline-none z-10',
                            active === idx ? '' : 'text-gray-700/80 hover:bg-white/[0.2] hover:text-white/75'
                        )}
                        style={{ filter: 'drop-shadow(#0005 0px 0px .1rem)' }}
                        key={pageTitle}
                        onClick={() => setActive(idx)}
                    >
                        {pageTitle}
                    </button>
                ))}
            </div>
        </div>
    );
}

export function EditorTabs({ pages, stateIndicator, dragBind }: {
    pages: Record<string, JSX.Element>;
    stateIndicator: JSX.Element;
    dragBind: (...args: any[]) => ReactDOMAttributes;
}) {
    const [selectedTab, setSelectedTab] = useState(0);

    const scrollableNodeRef = useRef<HTMLDivElement>();
    const pageScrollOfs = useRef<number[]>(Array(Object.keys(pages).length).fill(0));
    useLayoutEffect(() => {
        scrollableNodeRef.current && (scrollableNodeRef.current.scrollTop = pageScrollOfs.current[selectedTab]);
    }, [selectedTab]);

    return (
        <div className="grid grid-rows-[auto,minmax(0,1fr)]">

            {/* Tabs */} {/*  As alternative to style={{ touchAction: 'none' }} we can if ref.scrollHeight != ref.scrollTop + ref.clientHeight -> show indicator */}
            <div
                className="px-4 pt-4 pb-2 bg-blue-900/20 flex items-center justify-between"
                {...dragBind()}
                style={{ touchAction: 'none' }}
            >
                <div className="flex justify-items-start space-x-1">
                    <TabSelector tabs={Object.keys(pages)}
                        active={selectedTab}
                        setActive={(v: number) => {
                            pageScrollOfs.current[selectedTab] = scrollableNodeRef.current?.scrollTop || 0;
                            setSelectedTab(v);
                        }}
                    />
                </div>
                {stateIndicator}
            </div>

            {/* Pages */}
            <div className="text-sm bg-white">
                <UISemiScrollbar className={`text-gray-500 overflow-auto w-full h-full`} scrollableNodeProps={{ ref: scrollableNodeRef }} autoHide={false}>
                    {Object.values(pages).map((pageContent, idx) => (
                        <Fragment key={idx}>
                            <div key={idx} className={`${selectedTab === idx ? '' : 'hidden'}`}>
                                {pageContent}
                            </div>
                        </Fragment>
                    ))}
                </UISemiScrollbar>
            </div>
        </div>
    );
}
