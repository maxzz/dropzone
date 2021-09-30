import React from 'react';
import { useAtom } from 'jotai';
import { FileUsAtom } from '../../store/store';
import buildCardDatum, { CardDatum, FormDatum } from './CardDatum';
import CardTitle from './CardTitle';
import FormOptions from './Form/FormOptions';
import FormFields from './Form/FormFields';
import UICardFormButton from './UICardFormButton';

function FormContent({ formDatum }: { formDatum: FormDatum; }) {
    return (
        <div className="">
            <div className="pt-2 font-bold border-b border-gray-500">{formDatum.formIndex === 0 ? "Login form" : "Password change form"}</div>
            <FormOptions formDatum={formDatum} />
            <FormFields formDatum={formDatum} />
        </div>
    );
}

function CardBodyTopButtons({ cardDatum }: { cardDatum: CardDatum; }) {
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    return (
        <div className="p-2 bg-gray-200 text-gray-800">
            <div className="flex items-center space-x-2 text-sm">
                {cardDatum.hasLogin && <UICardFormButton formDatum={{cardDatum, formIndex: 0}} opened={open1} onClick={() => setOpen1((v) => !v)} />}
                {cardDatum.hasCpass && <UICardFormButton formDatum={{cardDatum, formIndex: 1}} opened={open2} onClick={() => setOpen2((v) => !v)} />}
            </div>
            {open1 && (<FormContent formDatum={{cardDatum, formIndex: 0}} />)}
            {open2 && (<FormContent formDatum={{cardDatum, formIndex: 1}} />)}
        </div>
    );
}

function Card({ atom, ...props }: React.HTMLAttributes<HTMLDivElement> & { atom: FileUsAtom; }) {
    const { className, ...rest } = props;
    const [fileUs] = useAtom(atom);
    const cardData: CardDatum | undefined = fileUs.mani && buildCardDatum(fileUs);
    return (<> {cardData &&
        <div className={`grid grid-rows-[min-content,minmax(auto,1fr)] ring-4 ring-inset ring-gray-200 overflow-hidden rounded shadow-md ${className}`} {...rest}>
            <CardTitle cardData={cardData} atom={atom} />
            <CardBodyTopButtons cardDatum={cardData} />
        </div>
    }</>);
}

export default Card;

//TODO: add card index of total
//TODO: compact view
//TODO: some IE forms have no detection section: but we can check IE_Server and presences of locations
