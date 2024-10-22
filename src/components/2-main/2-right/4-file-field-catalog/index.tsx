import { useAtom } from 'jotai';
import { FileUsAtomType } from '@/store';
import { Scroller } from '../../../ui/scroller';
import { CatologHeader } from './1-catolog-header';
import { CatologItems } from './2-catolog-items';

export function Body_FieldCatalog({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const [fileUs] = useAtom(fileUsAtom);
    const names = fileUs.parsedSrc.fcat?.names || [];
    return (
        <div className="grid grid-rows-[auto_minmax(0,1fr)] overflow-hidden">

            <div className="px-4 py-3 text-xs text-primary-400 bg-primary-800 border-primary-700 border-b">
                {/* filters */}
                {names.length} item{names.length === 1 ? '' : 's'}
            </div>

            <Scroller className="pt-2 text-xs text-primary-100">
                <div className="grid grid-cols-[1fr_auto_auto_auto_1fr] gap-x-4 text-primary-400">

                    <CatologHeader />
                    <CatologItems names={names} />

                </div>
            </Scroller>
        </div>
    );
}

//TODO: # of items
//TODO: sort controls
//TODO: separate edit/psw and buttons
