import React from 'react';
import { atom, useAtom } from 'jotai';
import { FileUsAtom, foldAllCardsAtom, SelectRowAtoms } from '../../store/store';
import buildCardDatum, { CardDatum, FormDatum } from './CardDatum';
import CardTitle from './CardTitle';
import FormOptions from './Form/FormOptions';
import FormFields from './Form/FormFields';
import UICardFormButton from './UICard/UICardFormButton';

function FormContent({ formDatum, selectRowAtoms }: { formDatum: FormDatum; selectRowAtoms: SelectRowAtoms; }) {
    return (
        <div className="">
            <div className="pt-2 font-bold border-b border-gray-400">{formDatum.formIndex === 0 ? "Login form" : "Password change form"}</div>
            <FormOptions formDatum={formDatum} selectRowAtoms={selectRowAtoms} />
            <FormFields formDatum={formDatum} selectRowAtoms={selectRowAtoms} />
        </div>
    );
}

function CardBodyTopButtons({ cardDatum }: { cardDatum: CardDatum; }) {
    const [open, setOpen] = React.useState(false);
    const [foldAll] = useAtom(foldAllCardsAtom);
    const [selectRowAtoms] = React.useState({ loginAtom: atom({ field: -1, form: -1 }), cpassAtom: atom({ field: -1, form: -1 }), });
    const Toogle = () => setOpen((v) => !v);

    React.useEffect(() => {
        if (foldAll >= 0) {
            const collapse = foldAll % 2 === 0;
            setOpen(collapse);
        }
    }, [foldAll]);

    return (
        <div className="p-2 bg-gray-200 text-gray-800">
            <div className="flex items-center space-x-2 text-sm">
                {cardDatum.hasLogin && <UICardFormButton formDatum={{ cardDatum, formIndex: 0 }} opened={open} onClick={Toogle} />}
                {cardDatum.hasCpass && <UICardFormButton formDatum={{ cardDatum, formIndex: 1 }} opened={open} onClick={Toogle} />}
            </div>
            {cardDatum.hasLogin && open && (<FormContent formDatum={{ cardDatum, formIndex: 0 }} selectRowAtoms={selectRowAtoms} />)}
            {cardDatum.hasCpass && open && (<FormContent formDatum={{ cardDatum, formIndex: 1 }} selectRowAtoms={selectRowAtoms} />)}
        </div>
    );
}

function Card({ atom, ...props }: React.HTMLAttributes<HTMLDivElement> & { atom: FileUsAtom; }) {
    const { className, ...rest } = props;
    const [fileUs] = useAtom(atom);
    const cardData: CardDatum | undefined = fileUs.mani && buildCardDatum(fileUs);
    return (<> {cardData &&
        <div className={`grid grid-rows-[min-content,minmax(auto,1fr)] overflow-hidden rounded shadow-md select-none ${className}`} {...rest}>
            <CardTitle atom={atom} />
            <CardBodyTopButtons cardDatum={cardData} />
        </div>
    }</>);
}

export default Card;

//TODO: add card index of total
//TODO: compact view
//TODO: some IE forms have no detection section: but we can check IE_Server and presences of locations
