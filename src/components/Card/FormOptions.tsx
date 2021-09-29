import React from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { useElementClickAway } from '../../hooks/useElementClickAway';
import { cpp_restore } from '../../store/manifest/mani-functions';
import { IconChevronDown, IconChevronUp } from '../UI/UiIcons';

function ToggleWithPortal({ children, toggle }: { children?: React.ReactNode; toggle?: React.ReactNode; }) {
    const [referenceElm, setReferenceElm] = React.useState<HTMLButtonElement | null>(null);
    const [popperElm, setPopperElm] = React.useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(referenceElm, popperElm, { placement: 'bottom-end', strategy: 'fixed' });
    const [open, setOpen] = React.useState(false);

    useElementClickAway(popperElm, (event) => event.target !== popperElm && !referenceElm?.contains(event.target as HTMLElement) && setOpen(false));

    return (
        <>
            <button type="button" ref={setReferenceElm} onClick={() => setOpen((v) => !v)}
                className={`pl-2 pr-1 text-xs border border-gray-500 rounded ${open ? 'bg-gray-300' : ''} flex items-center`}
            >
                {toggle}

                <div className="pb-1 mr-1">name</div>
                {open ? <IconChevronUp className="w-4 h-4" /> : <IconChevronDown className="list-owner w-4 h-4" />}

            </button>
            {open && ReactDOM.createPortal(
                <div ref={setPopperElm} style={styles.popper} {...attributes.popper} onClick={() => setOpen((v) => !v)}>
                    {children}
                </div>
                , document.getElementById('portal')!
            )}
        </>
    );
}

export function OptionPool({ names_ext }: { names_ext: string | undefined; }) {
    if (!names_ext) {
        return null;
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

function FormOptions() {
    return (
        <div>

        </div>
    );
}

export default FormOptions;
