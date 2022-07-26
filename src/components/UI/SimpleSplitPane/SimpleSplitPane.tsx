import React from 'react';
import { useAtom } from 'jotai';
import { splitPaneAtom } from '@/store/store';
import './SimpleSplitPane.css';

const baseStyle: React.CSSProperties = {
    flex: '1',
    display: 'flex',
};

const styleB: React.CSSProperties = {
    ...baseStyle,
    minWidth: 0,
    minHeight: 0,
};

type SplitPaneProps = {
    vertical?: boolean;
    minPersent?: number,
    maxPersent?: number,
    className?: string;
    children: React.ReactNode;
    onResize?: (position: number) => void;
};

type SplitPaneDataProps = {
    position: number;
    setPosition: (value: number) => void,
};

function cx(...configs: any[]) {
    return configs.map(config => typeof config === 'string' ? config : Object.keys(config).filter(k => config[k]).join(' '),).join(' ');
}

function SimpleSplitPaneBody(props: SplitPaneProps & SplitPaneDataProps): JSX.Element {
    const { vertical = true, minPersent = 1, maxPersent = 99, className, children, position, setPosition, onResize } = props;

    const container = React.useRef<HTMLDivElement | null>(null);

    const onMouseDown = React.useCallback(function (event: React.MouseEvent) {
        if (!container.current) {
            return;
        }

        event.preventDefault(); // This is needed to prevent text selection in Safari

        const containerOfs = container.current.getBoundingClientRect();
        const offset = vertical ? container.current.offsetTop + containerOfs.y : container.current.offsetLeft + containerOfs.x;
        const size = vertical ? container.current.offsetHeight : container.current.offsetWidth;

        const moveHandler = (event: MouseEvent) => {
            event.preventDefault();

            const newPosition = ((vertical ? event.pageY : event.pageX) - offset) / size * 100;
            // Using 99% as the max value prevents the divider from disappearing
            setPosition(Math.min(Math.max(minPersent, newPosition), maxPersent));
        };

        const upHandler = () => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', upHandler);
            onResize && onResize(position);
        };

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', upHandler);
    }, [vertical, position, container]);

    let childrenArr = React.Children.toArray(children);
    if (childrenArr.length < 2) {
        return (
            <div className={className} style={{ display: 'flex' }}>
                {childrenArr}
            </div>
        );
    }

    const styleA = { ...baseStyle };
    if (vertical) {
        styleA.minHeight = styleA.maxHeight = position + '%'; // top
    } else {
        styleA.minWidth = styleA.maxWidth = position + '%'; // left
    }

    return (
        <div ref={container} className={className} style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row' }}>
            <div style={styleA}>
                {childrenArr[0]}
            </div>
            <div className={cx({ 'splitpane-divider': true, vertical: vertical, horizontal: !vertical, })} onMouseDown={onMouseDown} />
            <div style={styleB}>
                {childrenArr[1]}
            </div>
        </div>
    );
}

export function SimpleSplitPane(props: SplitPaneProps): JSX.Element {
    // Position is really the size (width or height) of the first (left or top)
    // panel, as percentage of the parent containers size. The remaining elements
    // are sized and layed out through flexbox.
    const [position, setPosition] = useAtom(splitPaneAtom);
    return (
        <SimpleSplitPaneBody position={position} setPosition={setPosition} {...props} />
    );
}

//TODO: styles
//TODO: highlight moving bar by timer