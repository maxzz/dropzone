import { ReactNode } from 'react';
import { useAtomValue } from 'jotai';
import { FileUsAtomType } from '@/store';
import { CardCaption, CardUsername } from '../3-text';
import { CardTitleIcon } from '../2-icon';
import { CardTitleFilename } from '../4-filename';
import { CardTitleAttention } from '../1-attention';

export function CardTitleTextNormal({ fileUsAtom, actions }: { fileUsAtom: FileUsAtomType; actions?: ReactNode; }) {
    const fileUs = useAtomValue(fileUsAtom);
    const stats = fileUs?.stats;
    return (<>
        {stats && (
            <>
                {/* Icon, website/app name and optional menu */}
                <div className="grid grid-cols-[min-content_minmax(0,min-content)_1fr] items-center gap-x-0.5">
                    <CardTitleIcon stats={stats} />
                    <CardCaption stats={stats} />
                    <div className="justify-self-end">{actions}</div>
                </div>

                <CardUsername fileUs={fileUs} />

                <div className="flex items-center justify-between">
                    <CardTitleFilename fileUs={fileUs} />
                    <CardTitleAttention fileUs={fileUs} />
                </div>
            </>
        )}
    </>);
}
