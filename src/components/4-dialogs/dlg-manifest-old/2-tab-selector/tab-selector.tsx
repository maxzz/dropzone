import { RefObject, createRef, useEffect, useRef, useState } from "react";
import { a, useSpring } from "@react-spring/web";
import { classNames } from '@/utils';

type TabSelectorPrps = {
    tabs: string[];
    active: number;
    setActive: (v: number) => void;
};

const indicatorClasses = "absolute bg-gray-50 border-gray-900/50 rounded border shadow z-[1]";
const indicatorShadowStyles = { filter: 'drop-shadow(#0003 0px 0px .05rem)' };

const buttonClasses = "px-4 py-2.5 leading-5 text-sm font-medium text-gray-700 rounded focus:outline-none z-10";
const buttonInactiveClasses = "text-gray-700/80 hover:bg-white/[0.2] hover:text-white/75";
const buttonStyles = { filter: 'drop-shadow(#0005 0px 0px .1rem)' };

export function TabSelector({ tabs, active, setActive }: TabSelectorPrps) {
    const $root = useRef<HTMLDivElement>(null);
    const $indicator = useRef<HTMLDivElement>(null);
    const $items = useState(() => tabs.map<RefObject<HTMLButtonElement>>(createRef))[0];

    const [indicatorStyles, api] = useSpring(() => ({ x: 0, y: 0, width: 0, height: 0, config: { mass: .3, tension: 280, friction: 14 } }));

    useEffect(
        () => {
            function animate() {
                const menuOffset = $root.current?.getBoundingClientRect();
                const activeItem = $items[active].current;
                if (menuOffset && activeItem) {
                    const { top, left, width, height } = activeItem.getBoundingClientRect();
                    api.start({
                        x: left - menuOffset.x,
                        y: top - menuOffset.y,
                        width: width,
                        height: height,
                    });
                }
            }
            animate();
        }, [active, $root.current, $indicator.current, $items]
    );

    return (
        <div ref={$root} className="relative flex">
            <a.div ref={$indicator} style={{ ...indicatorStyles, ...indicatorShadowStyles }} className={indicatorClasses} />

            <div className="flex justify-items-start space-x-1">
                {tabs.map(
                    (pageTitle, idx) => (
                        <button
                            ref={$items[idx]}
                            className={classNames(buttonClasses, active !== idx && buttonInactiveClasses)}
                            style={buttonStyles}
                            onClick={() => setActive(idx)}
                            key={pageTitle}
                        >
                            {pageTitle}
                        </button>
                    ))
                }
            </div>
        </div>
    );
}
