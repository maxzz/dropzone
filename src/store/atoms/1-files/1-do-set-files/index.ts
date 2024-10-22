import { atom } from 'jotai';
import { type FileUs, type FileUsAtomType, type ParsedSrc } from "@/store/store-types";
import { filesAtom } from '../0-files-atom';
import { doUpdateCacheAtom } from '../5-do-update-cache';
import { _foldAllCardsAtom } from '../../9-ui-state';
import { rightPanelAtoms } from '../../2-right-panel';
import { uuid } from '@/utils';

function pathWoFilename(fileHandle: File): string {
    const rv = ((fileHandle as any).path as string || '')
        .replace(/^\//, '')
        .split(/[\\\/]/);
    rv.pop(); // remove filename as the last item
    return rv.join('/');
}

export const doSetFilesAtom = atom(
    null,
    (get, set, accepterFiles: File[]) => {
        const droppedIn: FileUsAtomType[] =
            accepterFiles
                .filter((file) => file.size)
                .map(
                    (fileHandle, idx) => {
                        const newFileUs: FileUs = {
                            unid: uuid(),
                            idx,
                            fname: fileHandle.name,
                            fpath: pathWoFilename(fileHandle),
                            fmodi: fileHandle.lastModified || 0,
                            size: fileHandle.size,
                            file: fileHandle,
                            parsedSrc: {} as ParsedSrc,
                            uiState: {
                                isGroupAtom: atom<boolean>(false),
                                isCurrentAtom: atom<boolean>(false),
                            },
                        };
                        return atom<FileUs>(newFileUs);
                    }
                );

        set(_foldAllCardsAtom, -1);
        set(filesAtom, droppedIn);
        set(doUpdateCacheAtom);
        set(rightPanelAtoms.panelAtom, undefined);
    }
);
