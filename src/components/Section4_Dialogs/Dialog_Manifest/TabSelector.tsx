import React, { RefObject, useEffect, useRef } from "react";
import { a, useSpring } from "@react-spring/web";
import { classNames } from '@/utils';

/*
function TabSelectorOld({ tabs, active, setActive }: { tabs: string[], active: number, setActive: (v: number) => void; }) {
    return (
        <div className="flex justify-items-start space-x-1">
            {tabs.map((pageTitle, idx) => (
                <button
                    className={classNames(
                        'px-4 py-2.5 leading-5 text-sm font-medium text-gray-700 rounded focus:outline-none transition-colors',
                        active === idx ? 'bg-white shadow' : 'text-gray-700/80 hover:bg-white/[0.4] hover:text-white'
                    )}
                    style={{ filter: 'drop-shadow(#0000003f 0px 0px 0.15rem)' }}
                    key={pageTitle}
                    onClick={() => setActive(idx)}
                >
                    {pageTitle}
                </button>
            ))}
        </div>
    );
}
*/

export function TabSelector({ tabs, active, setActive }: { tabs: string[], active: number, setActive: (v: number) => void; }) {
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
                // api.start([ { x: left - menuOffset.x, y: top - menuOffset.y, width: width, height: height, } ]);
                // api.start(async (next, cancel) => ({ x: left - menuOffset.x, y: top - menuOffset.y, width: width, height: height, }));
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
