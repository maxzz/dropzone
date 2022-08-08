import React, { forwardRef, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { useElementClickAway } from '@/hooks/useElementClickAway';
import { UIIconUpDown } from '@ui/UIIconUpDown';
import { BtnShading } from './Part1Form_Header';
import { Transform } from '@/store/manifest';
import { classNames } from '@/utils/classnames';

type DropDownButtonProps = {
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
};

export const DropDownButton = forwardRef<HTMLButtonElement, DropDownButtonProps>(function ({ open = false, setOpen, text }, ref) {
    const disabled = !setOpen;
    return (
        <button
            ref={ref}
            className={classNames(
                "pl-2 pr-1 h-6 leading-6 text-xs border border-primary-500 rounded flex items-center justify-between",
                open && "bg-primary-300",
                disabled && "opacity-25",
            )}
            onClick={() => !disabled && setOpen((v) => !v)}
            style={BtnShading}
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
        <DropDownButton text={text} ref={setReferenceElm} open={open} setOpen={setOpen} />

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

export function FormOptionsPool({ names_ext }: { names_ext: string | undefined; }) {
    if (!names_ext) {
        return <DropDownButton text={"pool"} />;
    }
    names_ext && (names_ext = Transform.persentRemove(Transform.xmlRestore(Transform.cppRestore(names_ext.replace(/:/g, '●'))))); // fix packed names
    let items = (names_ext || '').split('●');
    return (
        <ToggleWithPortal text={"pool"}>

            {/* Popup content */}
            <div className="mt-1 px-4 bg-primary-100 ring-1 ring-primary-400 rounded">
                <div className="px-2 text-xs max-w-sm max-h-[40vh] overflow-auto shadow-2xl">
                    <div className="grid grid-cols-[auto,1fr] gap-x-2 ">
                        {items.map((item, idx) =>
                            <Fragment key={idx}>
                                <div className="px-1 text-right border-r border-r-primary-400">{idx}</div>
                                <div className="">{item}</div>
                            </Fragment>)
                        }
                    </div>
                </div>
            </div>

        </ToggleWithPortal>
    );
}
