import React from 'react';
import { useAtom } from 'jotai';
import { FileUsAtom, foldAllCardsAtom } from '../../store/store';
import buildCardDatum, { CardDatum, FormDatum } from './CardDatum';
import CardTitle from './CardTitle';
import FormOptions from './Form/FormOptions';
import FormFields from './Form/FormFields';
import UICardFormButton from './UICard/UICardFormButton';

function FormContent({ formDatum }: { formDatum: FormDatum; }) {
    return (
        <div className="">
            <div className="pt-2 font-bold border-b border-gray-500">{formDatum.formIndex === 0 ? "Login form" : "Password change form"}</div>
            <FormOptions formDatum={formDatum} />
            <div className="font-bold border-t border-gray-500"></div>
            <FormFields formDatum={formDatum} />
        </div>
    );
}

function CardBodyTopButtons({ cardDatum }: { cardDatum: CardDatum; }) {
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [foldAll] = useAtom(foldAllCardsAtom);

    React.useEffect(() => {
        if (foldAll >= 0) {
            const collapse = foldAll % 2 === 0;
            setOpen1(collapse);
            setOpen2(collapse);
        }
    }, [foldAll]);

    function Toogle() {
        setOpen1((v) => !v);
        setOpen2((v) => !v);
    }
    return (
        <div className="p-2 bg-gray-200 text-gray-800">
            <div className="flex items-center space-x-2 text-sm">
                {/* {cardDatum.hasLogin && <UICardFormButton formDatum={{ cardDatum, formIndex: 0 }} opened={open1} onClick={Toogle} />}
                {cardDatum.hasCpass && <UICardFormButton formDatum={{ cardDatum, formIndex: 1 }} opened={open2} onClick={Toogle} />} */}
                {cardDatum.hasLogin && <UICardFormButton formDatum={{ cardDatum, formIndex: 0 }} opened={open1} onClick={Toogle} />}
                {cardDatum.hasCpass && <UICardFormButton formDatum={{ cardDatum, formIndex: 1 }} opened={open2} onClick={Toogle} />}
            </div>
            {open1 && (<FormContent formDatum={{ cardDatum, formIndex: 0 }} />)}
            {open2 && (<FormContent formDatum={{ cardDatum, formIndex: 1 }} />)}
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
