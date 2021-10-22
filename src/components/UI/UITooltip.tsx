import * as React from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

function UITooltip({trigger, children}: {trigger: React.ReactNode, children?: React.ReactNode}) {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip();

    return (
        <div className="">
            <button type="button" ref={setTriggerRef}>
                {trigger}
            </button>

            {visible && (
                <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
                    {children}
                    {/* Tooltip element */}
                    {/* <div {...getArrowProps({ className: 'tooltip-arrow' })} /> */}
                </div>
            )}
        </div>
    );
}

export default UITooltip;
