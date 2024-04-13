import { Getter, Setter, atom } from 'jotai';
import { Atomize, OnValueChangeAny, atomWithCallback } from "@/hooks";
import { FileUsAtomType, FormIdx } from '@/store';
import { debounce } from '@/utils';

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

export function createAtoms(v: string, onChange: OnValueChangeAny, fileUsAtom: FileUsAtomType, formIdx: FormIdx): FormOptionsAtoms {
    return {
        uiPart1General: {
            nameAtom: atomWithCallback('', onChange),
            descAtom: atomWithCallback('', onChange),
            hintAtom: atomWithCallback('', onChange),
            balloonAtom: atomWithCallback(3, onChange),
        },
        uiPart2ScreenDetection: {
            captionAtom: atomWithCallback('', onChange),
            monitorAtom: atomWithCallback(false, onChange),
            urlAtom: atomWithCallback('', onChange),
        },
        uiPart3Authentication: {
            aimAtom: atomWithCallback(false, onChange),
            lockAtom: atomWithCallback(false, onChange),
        },
        uiPart4QL: {
            dashboardAtom: atomWithCallback(true, onChange),
            nameAtom: atomWithCallback('', onChange),
            urlAtom: atomWithCallback('', onChange),
        },
        uiPart5PasswordManagerIcon: {
            idAtom: atomWithCallback('', onChange),
            locAtom: atomWithCallback('', onChange),
        },

        fileUsAtom,
        formIdx,
    };
}

export function combineOptionsFromAtoms(atoms: FormOptionsAtoms, get: Getter, set: Setter) {
    const result = {
        uiPart1General: {
            'name': get(atoms.uiPart1General.nameAtom),
            'desc': get(atoms.uiPart1General.descAtom),
            'hint': get(atoms.uiPart1General.hintAtom),
            'balloon': get(atoms.uiPart1General.balloonAtom),
        },
        uiPart2ScreenDetection: {
            'caption': get(atoms.uiPart2ScreenDetection.captionAtom),
            'monitor': get(atoms.uiPart2ScreenDetection.monitorAtom),
            'url': get(atoms.uiPart2ScreenDetection.urlAtom),
        },
        uiPart3Authentication: {
            'aim': get(atoms.uiPart3Authentication.aimAtom),
            'lock': get(atoms.uiPart3Authentication.lockAtom),
        },
        uiPart4QL: {
            'dashboard': get(atoms.uiPart4QL.dashboardAtom),
            'name': get(atoms.uiPart4QL.nameAtom),
            'url': get(atoms.uiPart4QL.urlAtom),
        },
        uiPart5PasswordManagerIcon: {
            'id': get(atoms.uiPart5PasswordManagerIcon.idAtom),
            'loc': get(atoms.uiPart5PasswordManagerIcon.locAtom),
        },
    };
    
    console.log('PolicyEditor atoms', JSON.stringify(result, null, 4));
}

export const debouncedCombinedResultFromAtoms = debounce(combineOptionsFromAtoms);
