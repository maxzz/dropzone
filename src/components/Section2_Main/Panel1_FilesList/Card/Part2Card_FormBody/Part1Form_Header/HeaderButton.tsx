import React, { forwardRef } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { useElementClickAway } from '@/hooks/useElementClickAway';
import { UIIconUpDown } from '@ui/UIIconUpDown';
import { classNames } from '@/utils/classnames';

export const BtnGradientShading: React.CSSProperties = {
    backgroundImage: 'linear-gradient(360deg, #ffffff3f 0%, #9d9d9d2f 30%, #9d9d9d2f 70%, #ffffff3f 100%)',
    boxShadow: '0px 1px #64646420',
};

type DropDownButtonProps = {
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
};

export const HeaderButton = forwardRef<HTMLButtonElement, DropDownButtonProps>(function ({ open = false, setOpen, text }, ref) {
    const disabled = !setOpen;
    return (
        <button
            ref={ref}
            className={classNames(
                "pl-2 pr-1 h-6 card-header-btn__popup",
                open && "bg-primary-300",
                disabled && "opacity-25",
            )}
            onClick={() => !disabled && setOpen((v) => !v)}
            //style={BtnShading}
        >
            <div className="">
                {text}
            </div>

            {disabled ? <div className="list-owner w-4 h-4 pt-0.5" /> : <UIIconUpDown isUp={open} className="list-owner w-4 h-4 pt-0.5" />}
        </button>
    );
});

export function ToggleWithPortal({ children, text }: { children?: React.ReactNode; text: string; }) {
    const [referenceElm, setReferenceElm] = React.useState<HTMLButtonElement | null>(null);
    const [popperElm, setPopperElm] = React.useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(referenceElm, popperElm, { placement: 'bottom-end', strategy: 'fixed' });
    const [open, setOpen] = React.useState(false);

    useElementClickAway(popperElm, (event) => event.target !== popperElm && !referenceElm?.contains(event.target as HTMLElement) && setOpen(false));

    return (<>
        <HeaderButton text={text} ref={setReferenceElm} open={open} setOpen={setOpen} />

        {open &&
            ReactDOM.createPortal(<div
                ref={setPopperElm}
                style={{ ...styles.popper, zIndex: 'inherit' }}
                {...attributes.popper}
                onClick={() => setOpen((v) => !v)}
            >
                {children}
            </div>, document.getElementById('portal')!
            )
        }
    </>);
}
