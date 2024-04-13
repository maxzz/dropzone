import { atom } from 'jotai';
import { Atomize } from "@/hooks";
import { FileUsAtomType, FormIdx } from '@/store';

type UiPart1General = {
    name: string;       // login name
    desc: string;       // login description
    hint: string;       // user hint
    balloon: number;    // show balloon # times
};

type UiPart2ScreenDetection = {
    url: string;        // URL
    caption: string;    // Windows Caption
    monitor: boolean;   // Monitor screen changes
};

type UiPart3Authentication = {
    aim: boolean;       // Start authentication immediately
    lock: boolean;      // Lock out login fields
};

type UiPart4QL = {
    dashboard: boolean; // Display on mini-dashboard
    name: string;       // Quick Link Name
    url: string;        // Quick Link URL
};

type UiPart5PasswordManagerIcon = {
    id: string;         // Location ID
    loc: string;        // Location
};

export type FormOptionsAtoms = {
    uiPart1General: Atomize<UiPart1General>;
    uiPart4QL: Atomize<UiPart4QL>;
    uiPart2ScreenDetection: Atomize<UiPart2ScreenDetection>;
    uiPart3Authentication: Atomize<UiPart3Authentication>;
    uiPart5PasswordManagerIcon: Atomize<UiPart5PasswordManagerIcon>;

    fileUsAtom: FileUsAtomType;
    formIdx: FormIdx;
};

export function createAtoms(v: string, callback: () => void, fileUsAtom: FileUsAtomType, formIdx: FormIdx): FormOptionsAtoms {
    return {
        uiPart1General: {
            nameAtom: atom(''),
            descAtom: atom(''),
            hintAtom: atom(''),
            balloonAtom: atom(3),
        },
        uiPart2ScreenDetection: {
            captionAtom: atom(''),
            monitorAtom: atom<boolean>(false),
            urlAtom: atom(''),
        },
        uiPart3Authentication: {
            aimAtom: atom<boolean>(false),
            lockAtom: atom<boolean>(false),
        },
        uiPart4QL: {
            dashboardAtom: atom<boolean>(true),
            nameAtom: atom(''),
            urlAtom: atom(''),
        },
        uiPart5PasswordManagerIcon: {
            idAtom: atom(''),
            locAtom: atom(''),
        },

        fileUsAtom,
        formIdx,
    };
}
