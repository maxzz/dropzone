import React, { HTMLAttributes } from 'react';
import { UIPortal } from '../UIPortal';
import { classNames } from '@/utils/classnames';
import { Config, usePopperTooltip } from 'react-popper-tooltip';
import './styles.css';

type UITooltipOptions = {
    arrow?: boolean;
    portal?: boolean;
    popperOptions?: Config;
};

export function OldPopper_optionsUITooltipSmall(): UITooltipOptions {
    return {
        arrow: true,
        popperOptions: { delayShow: 750, placement: 'auto' }
    };
}

type UITooltipProps =
    {
        trigger: React.ReactNode;
        triggerParentClassName?: string;
    }
    & UITooltipOptions
    & HTMLAttributes<HTMLDivElement>;

export function OldPopper_UITooltip({ trigger, children, className, arrow = false, portal = true, popperOptions, triggerParentClassName, ...rest }: UITooltipProps) {
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

    const popper = visible && portal ? <UIPortal>{poperBody}</UIPortal> : <>{poperBody}</>;

    return (<>
        <div ref={setTriggerRef} className={triggerParentClassName}>
            {trigger}
        </div>
        {popper}
    </>);
}
