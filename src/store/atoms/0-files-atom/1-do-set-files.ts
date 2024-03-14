import { atom } from 'jotai';
import { FileUs, FileUsAtomType, FileUsStats } from "@/store/store-types";
import { filesAtom } from './0-files-atom';
import { doUpdateCacheAtom } from './4-do-update-cache';
import { _foldAllCardsAtom } from '../9-ui-state';
import { rightPanelData } from '../2-right-panel';
import { uuid } from '@/utils';

export const doSetFilesAtom = atom(
    null,
    (get, set, accepterFiles: File[]) => {
        const droppedIn: FileUsAtomType[] = accepterFiles
            .filter((file) => file.size)
            .map(
                (file, idx) => {
                    const path = ((file as any).path as string || '').replace(/^\//, '').split(/[\\\/]/);
                    path.pop(); // remove file name as the last item
                    
                    const newItem: FileUs = {
                        id: uuid(),
                        idx,
                        fname: file.name,
                        fpath: path.join('/'),
                        fmodi: (file as any).lastModified || 0,
                        modified: file.lastModified,
                        size: file.size,
                        file: file,
                        state: {
                            isGroupAtom: atom<boolean>(false),
                            isCurrentAtom: atom<boolean>(false),
                        },
                        stats: {} as FileUsStats, // the real one will be assigned after caching content
                    };
                    return atom<FileUs>(newItem);
                }
            );

        set(_foldAllCardsAtom, -1);
        set(filesAtom, droppedIn);
        set(doUpdateCacheAtom);
        set(rightPanelData.panelAtom, undefined);
    }
);
