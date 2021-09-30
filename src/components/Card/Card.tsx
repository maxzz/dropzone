import React from 'react';
import { useAtom } from 'jotai';
import { FileUsAtom } from '../../store/store';
import buildCardDatum, { CardDatum } from './CardDatum';
import CardTitle from './CardTitle';
import FormOptions from './Form/FormOptions';
import FormFields from './Form/FormFields';
import UICardFormButton from './UICardFormButton';

function FormContent({ cardData, formIndex }: { cardData: CardDatum; formIndex: number; }) {
    return (
        <div className="">
            <div className="pt-2 font-bold border-b border-gray-500">{formIndex === 0 ? "Login form" : "Password change form"}</div>
            <FormOptions cardData={cardData} formIndex={formIndex} />
            <FormFields cardData={cardData} formIndex={formIndex} />
        </div>
    );
}

function CardBodyTopButtons({ cardData }: { cardData: CardDatum; }) {
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    return (
        <div className="p-2 bg-gray-200 text-gray-800">
            <div className="flex items-center space-x-2 text-sm">
                {cardData.hasLogin && <UICardFormButton cardData={cardData} formIndex={Mani.FormLogin} opened={open1} onClick={() => setOpen1((v) => !v)} />}
                {cardData.hasCpass && <UICardFormButton cardData={cardData} formIndex={Mani.FormCpass} opened={open2} onClick={() => setOpen2((v) => !v)} />}
            </div>
            {open1 && (<FormContent cardData={cardData} formIndex={Mani.FormLogin} />)}
            {open2 && (<FormContent cardData={cardData} formIndex={Mani.FormCpass} />)}
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
            <CardBodyTopButtons cardData={cardData} />
        </div>
    }</>);
}

export default Card;

//TODO: add card index of total
//TODO: compact view
//TODO: some IE forms have no detection section: but we can check IE_Server and presences of locations
