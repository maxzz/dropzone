import { PrimitiveAtom, useAtomValue } from 'jotai';
import { FileUsAtomType, uiSizeAtom, UISize } from '@/store';
import { CardTitleTextMinimal } from './1-minimal';
import { CardTitleTextCompact } from './2-compact';
import { CardTitleTextNormal } from './3-normal';
import { CardTitleSelector } from './4-selector';

export * from "./1-minimal";
export * from "./2-compact";
export * from "./3-normal";

export function Card1_Title({ fileUsAtom, openAtom }: { fileUsAtom: FileUsAtomType; openAtom: PrimitiveAtom<boolean>; }) {
    const uiSize = useAtomValue(uiSizeAtom);
    return (
        <CardTitleSelector fileUsAtom={fileUsAtom}>
            {uiSize === UISize.minimal
                ? <CardTitleTextMinimal fileUsAtom={fileUsAtom} openAtom={openAtom} />
                : uiSize === UISize.compact
                    ? <CardTitleTextCompact fileUsAtom={fileUsAtom} openAtom={openAtom} />
                    : <CardTitleTextNormal fileUsAtom={fileUsAtom} />
            }
        </CardTitleSelector>
    );
}

//TODO: copy to clipboard filename
