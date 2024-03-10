import React, { HTMLAttributes, ReactNode } from 'react';
import { Config, usePopperTooltip } from 'react-popper-tooltip';
import { UiPortal } from '../ui-portal';
import { classNames } from '@/utils';
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
        trigger: ReactNode;
        triggerParentClassName?: string;
    }
    & UITooltipOptions
    & HTMLAttributes<HTMLDivElement>;

export function OldPopper_UITooltip({ trigger, children, className, arrow = false, portal = true, popperOptions, triggerParentClassName, ...rest }: UITooltipProps) {
    const {
        getArrowProps,
        getTooltipProps, // add -mx-4 to add right/left margin from viewport edge, but it will shift arrow
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip(popperOptions); // } = usePopperTooltip({...popperOptions, defaultVisible: true});

    const poperBody =
        <div
            ref={setTooltipRef}
            {...getTooltipProps({ className: classNames('tooltip-container', className) })}
            {...rest}
        >
            {children}
            {arrow && <div {...getArrowProps({ className: 'tooltip-arrow' })} />}
        </div>;

    return (<>
        <div ref={setTriggerRef} className={triggerParentClassName}>
            {trigger}
        </div>

        {visible && (portal ? <UiPortal>{poperBody}</UiPortal> : <>{poperBody}</>)}
    </>);
}
