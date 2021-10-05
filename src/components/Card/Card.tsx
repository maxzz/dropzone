import React from 'react';
import { atom, PrimitiveAtom, useAtom } from 'jotai';
import { FileUsAtom, foldAllCardsAtom } from '../../store/store';
import buildCardDatum, { CardDatum, FormDatum } from './CardDatum';
import CardTitle from './CardTitle';
import FormOptions from './Form/FormOptions';
import FormFields from './Form/FormFields';
import UICardFormButton from './UICard/UICardFormButton';

function FormContent({ formDatum, selectedLoginRowAtom, selectedCPassRowAtom }: { formDatum: FormDatum; selectedLoginRowAtom: PrimitiveAtom<number>; selectedCPassRowAtom: PrimitiveAtom<number>; }) {
    const previewAtom = formDatum.formIndex === 0 ? selectedLoginRowAtom : selectedCPassRowAtom;
    return (
        <div className="">
            <div className="pt-2 font-bold border-b border-gray-400">{formDatum.formIndex === 0 ? "Login form" : "Password change form"}</div>
            <FormOptions formDatum={formDatum} selectedRowAtom={previewAtom} />
            {/* <div className="font-bold border-t border-gray-400" style={{boxShadow: '0 0 2px 0 #0008'}}></div> */}
            <FormFields formDatum={formDatum} selectedLoginRowAtom={selectedLoginRowAtom} selectedCPassRowAtom={selectedCPassRowAtom} />
        </div>
    );
}

function CardBodyTopButtons({ cardDatum }: { cardDatum: CardDatum; }) {
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [foldAll] = useAtom(foldAllCardsAtom);

    const [selectedRowLoginAtom] = React.useState(atom(-1));
    const [selectedRowCpassAtom] = React.useState(atom(-1));

    React.useEffect(() => {
        if (foldAll >= 0) {
            const collapse = foldAll % 2 === 0;
            setOpen1(collapse);
            setOpen2(collapse);
        }
    }, [foldAll]);

    function Toogle() {
        cardDatum.hasLogin && setOpen1((v) => !v);
        cardDatum.hasCpass && setOpen2((v) => !v);
    }
    return (
        <div className="p-2 bg-gray-200 text-gray-800">
            <div className="flex items-center space-x-2 text-sm">
                {/* {cardDatum.hasLogin && <UICardFormButton formDatum={{ cardDatum, formIndex: 0 }} opened={open1} onClick={Toogle} />}
                {cardDatum.hasCpass && <UICardFormButton formDatum={{ cardDatum, formIndex: 1 }} opened={open2} onClick={Toogle} />} */}
                {cardDatum.hasLogin && <UICardFormButton formDatum={{ cardDatum, formIndex: 0 }} opened={open1} onClick={Toogle} />}
                {cardDatum.hasCpass && <UICardFormButton formDatum={{ cardDatum, formIndex: 1 }} opened={open2} onClick={Toogle} />}
            </div>
            {open1 && (<FormContent formDatum={{ cardDatum, formIndex: 0 }} selectedLoginRowAtom={selectedRowLoginAtom} selectedCPassRowAtom={selectedRowCpassAtom} />)}
            {open2 && (<FormContent formDatum={{ cardDatum, formIndex: 1 }} selectedLoginRowAtom={selectedRowLoginAtom} selectedCPassRowAtom={selectedRowCpassAtom} />)}
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
