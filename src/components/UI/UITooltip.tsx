import * as React from 'react';
import ReactDOM from 'react-dom';
import { Config, usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

type UITooltipOptions = {
    arrow?: boolean;
    portal?: boolean;
    popperOptions?: Config;
};

type UITooltipProps = {
    trigger: React.ReactNode;
    children?: React.ReactNode;
} & UITooltipOptions;

export function UITooltip({ trigger, children, arrow = false, portal = true, popperOptions }: UITooltipProps) {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip(
        //{ defaultVisible: true }
        {
            ...popperOptions,
        }
    );
    const poperBody = visible && (
        <div
            ref={setTooltipRef}
            {...getTooltipProps({ className: 'tooltip-container' })} // add -mx-4 to add right/left margin from viewport edge, but it will shift arrow
        >
            {children}
            {arrow && <div {...getArrowProps({ className: 'tooltip-arrow' })} />}
        </div>
    );
    const popper = visible && (portal ? ReactDOM.createPortal((<>{poperBody}</>), document.getElementById('portal')!) : <>{poperBody}</>);
    return (
        <>
            <div ref={setTriggerRef}> {trigger} </div>
            {popper}
        </>
    );
}

export function uitooltipSmall(): UITooltipOptions {
    return {
        arrow: true,
        popperOptions: { delayShow: 750, placement: 'auto' }
    };
}
