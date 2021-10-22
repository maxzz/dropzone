import * as React from 'react';
import ReactDOM from 'react-dom';
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

export function UITooltip({ trigger, children, arrow = false, portal = true }: { trigger: React.ReactNode; children?: React.ReactNode; arrow?: boolean; portal?: boolean; }) {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip(
        //{ defaultVisible: true }
    );
    const poperBody = visible && (
        <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
            {children}
            {arrow && <div {...getArrowProps({ className: 'tooltip-arrow' })} />}
        </div>
    );
    const popper = visible && (portal ? ReactDOM.createPortal((<>{poperBody}</>), document.getElementById('portal')!) : <>{poperBody}</>);
    return (
        <div className="">
            <div ref={setTriggerRef}> {trigger} </div>
            {popper}
        </div>
    );
}

