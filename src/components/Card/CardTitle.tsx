import { useUpdateAtom } from 'jotai/utils';
import React from 'react';
import { FileUsAtom, rightPanelAtom } from '../../store/store';
import { CardDatum } from './CardDatum';
import { IconAppWebIE, IconAppWindows, IconInfo, IconMenuHamburger } from '../UI/UiIcons';
import CardTitleMenu from './CardTitleMenu';

function CardRawInfo({ cardData }: { cardData: CardDatum; }) {
    return (
        <div className="my-2 overflow-auto smallscroll text-xs bg-gray-800 opacity-50 border-4 border-gray-800 shadow-md">
            <pre>{cardData.fileUs.raw}</pre>
        </div>
    );
}

function TitleFirstRow({ cardData }: { cardData: CardDatum; }) {
    const icon = cardData.login.meta?.disp.domain
        ? <IconAppWebIE className="w-6 h-6" />
        : <IconAppWindows className="w-6 h-6" />;
    const text = cardData.login.meta?.disp.domain
        ? <span className="ml-1 uppercase">{cardData.login.meta.disp.domain}</span>
        : <span className="ml-1 uppercase">Windows application</span>;
    return (
        <div className="text-lg flex items-center overflow-hidden whitespace-nowrap overflow-ellipsis">
            {icon}
            <div className="self-start text-xs text-gray-400">{cardData.fileUs.idx + 1}</div>
            {text}
        </div>
    );
}

function CardTitle({ cardData, atom }: { cardData: CardDatum; atom: FileUsAtom; }) {
    const [open, setOpen] = React.useState(false);
    const setRightPanel = useUpdateAtom(rightPanelAtom);
    return (
        <div className="relative p-2 bg-gray-900 text-gray-100 overflow-hidden whitespace-nowrap overflow-ellipsis">
            <div className="">
                <div className="absolute top-3 right-2 z-10">
                    <button className="w-6 h-6 opacity-60 hover:opacity-100 select-none active:scale-[.97] block" onClick={
                        () => {
                            let newState = !open;
                            setRightPanel(newState ? atom : undefined);
                            setOpen(newState);
                        }}
                    >
                        <IconInfo />
                    </button>
                    <CardTitleMenu icon={
                        <div className="w-6 h-6 opacity-60 hover:opacity-100 select-none active:scale-[.97]">
                            <IconMenuHamburger />
                        </div>}
                    />
                </div>
                <div className="mr-8">
                    <TitleFirstRow cardData={cardData} />
                    <div className="font-light text-sm opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis" title="Filename">
                        {cardData.fname}
                    </div>
                    <div className="font-light text-sm opacity-75 overflow-hidden whitespace-nowrap overflow-ellipsis" title="Login name">
                        {cardData.title || 'No title'}
                    </div>
                </div>
            </div>

            {open && <div className="">
                <CardRawInfo cardData={cardData} />
            </div>}
        </div>
    );
}

export default CardTitle;
