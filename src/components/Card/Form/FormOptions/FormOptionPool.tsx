import React, { forwardRef } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { useElementClickAway } from '../../../../hooks/useElementClickAway';
import { cpp_restore } from '../../../../store/manifest/mani-functions';
import UIUpDownIcon from '../../../UI/UIUpDownIcon';
import { BtnShading } from '../FormOptions';

type DropDownButtonProps = {
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
};

const DropDownButton = forwardRef<HTMLButtonElement, DropDownButtonProps>(function ({ open = false, setOpen, text }, ref) {
    const disabled = !setOpen;
    return (
        <button
            ref={ref}
            onClick={() => !disabled && setOpen((v) => !v)}
            className={`pl-2 pr-1 h-6 leading-6 text-xs border border-gray-500 rounded ${open ? 'bg-gray-300' : ''} ${disabled ? 'opacity-25' : ''} flex items-center justify-between`}
            style={BtnShading}
        >
            <div className="">
                {text}
            </div>

            <UIUpDownIcon open={open} className="list-owner w-4 h-4 pt-0.5" />
        </button>
    );
});

function ToggleWithPortal({ children, toggle }: { children?: React.ReactNode; toggle?: React.ReactNode; }) {
    const [referenceElm, setReferenceElm] = React.useState<HTMLButtonElement | null>(null);
    const [popperElm, setPopperElm] = React.useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(referenceElm, popperElm, { placement: 'bottom-end', strategy: 'fixed' });
    const [open, setOpen] = React.useState(false);

    useElementClickAway(popperElm, (event) => event.target !== popperElm && !referenceElm?.contains(event.target as HTMLElement) && setOpen(false));

    return (
        <>
            <DropDownButton text={"pool"} ref={setReferenceElm} open={open} setOpen={setOpen} />

            {open &&
                ReactDOM.createPortal(
                    <div ref={setPopperElm} style={{ ...styles.popper, zIndex: 'inherit' }} {...attributes.popper} onClick={() => setOpen((v) => !v)}>
                        {children}
                    </div>
                    , document.getElementById('portal')!
                )
            }
        </>
    );
}

function FormOptionPool({ names_ext }: { names_ext: string | undefined; }) {
    if (!names_ext) {
        return <DropDownButton text={"pool"} />;
    }
    names_ext && (names_ext = decodeURI(cpp_restore(names_ext.replace(/:/g, '●')))); // fix packed names //TODO: decodeURI does not do all % encodings
    let items = (names_ext || '').split('●');
    return (
        <ToggleWithPortal >
            <div className="mt-1 p-2 bg-gray-300 rounded ring-1 ring-gray-400">
                <div className="text-xs max-w-sm max-h-[40vh] overflow-auto">
                    <div className="grid grid-cols-[auto,1fr] gap-x-2 ">
                        {items.map((item, idx) =>
                            <React.Fragment key={idx}>
                                <div className="px-1 text-right border-r border-r-gray-400">{idx}</div>
                                <div className="">{item}</div>
                            </React.Fragment>)
                        }
                    </div>
                </div>
            </div>
        </ToggleWithPortal>
    );
}

export default FormOptionPool;
