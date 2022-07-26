import React, { forwardRef } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { useElementClickAway } from '../../../../hooks/useElementClickAway';
import { Transform } from '../../../../store/manifest/mani-functions';
import { UIIconUpDown } from '@ui/UIIconUpDown';
import { BtnShading } from './FormOptions';

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
            onClick={() => !disabled && setOpen((v) => !v)}
            className={`pl-2 pr-1 h-6 leading-6 text-xs border border-gray-500 rounded ${open ? 'bg-gray-300' : ''} ${disabled ? 'opacity-25' : ''} flex items-center justify-between`}
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

    return (
        <>
            <DropDownButton text={text} ref={setReferenceElm} open={open} setOpen={setOpen} />

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

function FormOptionsPool({ names_ext }: { names_ext: string | undefined; }) {
    if (!names_ext) {
        return <DropDownButton text={"pool"} />;
    }
    names_ext && (names_ext = Transform.persentRemove(Transform.xmlRestore(Transform.cppRestore(names_ext.replace(/:/g, '●'))))); // fix packed names
    let items = (names_ext || '').split('●');
    return (
        <ToggleWithPortal text={"pool"}>
            <div className="mt-1 bg-gray-100 ring-1 ring-gray-400">
                <div className="px-2 text-xs max-w-sm max-h-[40vh] overflow-auto shadow-2xl">
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

export default FormOptionsPool;
