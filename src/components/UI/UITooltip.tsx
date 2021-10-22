import * as React from 'react';
import ReactDOM from 'react-dom';
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

export function UITooltipInline({ trigger, children, arrow = false }: { trigger: React.ReactNode; children?: React.ReactNode; arrow?: boolean; }) {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip();
    return (
        <div className="">
            <div ref={setTriggerRef}>
                {trigger}
            </div>

            {visible &&
                <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
                    {children}
                    {arrow && <div {...getArrowProps({ className: 'tooltip-arrow' })} />}
                </div>
            }
        </div>
    );
}

export function UITooltip({ trigger, children, arrow = false }: { trigger: React.ReactNode; children?: React.ReactNode; arrow?: boolean; }) {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip();
    return (
        <div className="">
            <div ref={setTriggerRef}>
                {trigger}
            </div>

            {visible &&
                ReactDOM.createPortal((
                    <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
                        {children}
                        {arrow && <div {...getArrowProps({ className: 'tooltip-arrow' })} />}
                    </div>
                ), document.getElementById('portal')!)
            }
        </div>
    );
}

