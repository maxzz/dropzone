import React from 'react';
import PropTypes from 'prop-types';
import cx from '../../utils/classnames';
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
    className?: string;
    children: React.ReactNode;
    onResize?: () => void;
};

/**
 * Creates a left-right split pane inside its container.
 */
function SimpleSplitPane({ vertical = true, className, children, onResize }: SplitPaneProps): JSX.Element {
    // Position is really the size (width or height) of the first (left or top)
    // panel, as percentage of the parent containers size. The remaining elements
    // are sized and layed out through flexbox.
    const [position, setPosition] = React.useState(50);
    const container = React.useRef<HTMLDivElement | null>(null);

    const onMouseDown = React.useCallback(function (event) {
        if (!container.current) {
            return;
        }

        // This is needed to prevent text selection in Safari
        event.preventDefault();
        document.body.style.cursor = vertical ? 'row-resize' : 'col-resize';

        const containerOfs = container.current.getBoundingClientRect();
        const offset = vertical ? container.current.offsetTop + containerOfs.y : container.current.offsetLeft + containerOfs.x;
        const size = vertical ? container.current.offsetHeight : container.current.offsetWidth;

        let moveHandler = (event: MouseEvent) => {
            event.preventDefault();
            console.log({offset, size, left: container.current?.offsetLeft, width: container.current?.offsetWidth, pageX: event.pageX});
            console.log({container: container.current?.getBoundingClientRect()});
            
            const newPosition = ((vertical ? event.pageY : event.pageX) - offset) / size * 100;
            // Using 99% as the max value prevents the divider from disappearing
            setPosition(Math.min(Math.max(0, newPosition), 99));
        };
        
        let upHandler = () => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', upHandler);
            document.body.style.cursor = '';

            if (onResize) {
                onResize();
            }
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
        // top
        styleA.minHeight = styleA.maxHeight = position + '%';
    } else {
        // left
        styleA.minWidth = styleA.maxWidth = position + '%';
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

SimpleSplitPane.propTypes = {
    vertical: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    onResize: PropTypes.func,
};

export default SimpleSplitPane;
