import { PrimitiveAtom, useAtomValue } from 'jotai';
import { FileUsAtomType } from '@/store';
import { CardCaption, CardUsername } from '../3-text';
import { CardTitleIcon } from '../2-icon';
import { CardTitleFilename } from '../4-filename';
import { CardTitleAttention } from '../1-attention';
import { getButtonsDisp } from '../../4-ui/UICardFormButtonTypes';
import { CardMediumButtons } from '../../3-shared/1-card-buttons';

export function CardTitleTextCompact({ fileUsAtom, openAtom }: { fileUsAtom: FileUsAtomType; openAtom: PrimitiveAtom<boolean>; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const stats = fileUs?.stats;
    const buttons = getButtonsDisp(fileUs);
    return (<>
        {stats && <div className="grid grid-cols-[minmax(0,1fr)_auto]">
            <div>
                <div className="grid grid-cols-[min-content_minmax(0,min-content)_1fr] items-center gap-x-0.5">
                    <CardTitleIcon stats={stats} />
                    <CardCaption stats={stats} />
                </div>

                <CardUsername fileUs={fileUs} />
                <CardTitleFilename fileUs={fileUs} />
            </div>

            <div className="grid">
                <CardMediumButtons buttonsDisp={buttons} openAtom={openAtom} />

                <div className="place-self-end">
                    <CardTitleAttention fileUs={fileUs} />
                </div>
            </div>
        </div>}
    </>);
}
