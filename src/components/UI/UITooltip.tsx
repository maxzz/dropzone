import { classNames } from '@/utils/classnames';
import React, { HTMLAttributes } from 'react';
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
} & UITooltipOptions;

export function UITooltip({ trigger, children, className, arrow = false, portal = true, popperOptions, ...rest }: UITooltipProps & HTMLAttributes<HTMLDivElement>) {
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
            {...getTooltipProps({ className: classNames('tooltip-container', className) })} // add -mx-4 to add right/left margin from viewport edge, but it will shift arrow
            {...rest}
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
