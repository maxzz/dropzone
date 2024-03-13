import { atom } from 'jotai';
import { FileUsAtomType } from '../../store-types';

// Files

export const filesAtom = atom<FileUsAtomType[]>([]);
