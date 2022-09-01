import React, { InputHTMLAttributes } from 'react';
import { Atomize } from '@/hooks/atomsX';
import { FileUsAtomType, FormIdx } from '@/store';
import { Meta } from '@/store/manifest';
import { classNames } from '@/utils/classnames';
import { atom } from 'jotai';

type UiPart1General = {
    name: string;       // login name
    desc: string;       // login description
    hint: string;       // user hint
    balloon: number;    // show balloon # times
};

type UiPart2QL = {
    dashboard: boolean; // Display on mini-dashboard
    name: string;       // Quick Link Name
    url: string;        // Quick Link URL
};

type UiPart3ScreenDetection = {
    caption: string;    // Windows Caption
    monitor: boolean;   // Monitor screen changes
    url: string;        // URL
};

type UiPart4Authentication = {
    aim: boolean;       // Start authentication immediately
    lock: boolean;      // Lock out login fields
};

type UiPart5PasswordManagerIcon = {
    id: string;         // Location ID
    loc: string;        // Location
};

type FormUi = {
    uiPart1General: Atomize<UiPart1General>;
    uiPart2QL: Atomize<UiPart2QL>;
    uiPart3ScreenDetection: Atomize<UiPart3ScreenDetection>;
    uiPart4Authentication: Atomize<UiPart4Authentication>;
    uiPart5PasswordManagerIcon: Atomize<UiPart5PasswordManagerIcon>;
};

function createAtoms(v: string, callback: () => void): FormUi {
    return {
        uiPart1General: {
            nameAtom: atom(''),
            descAtom: atom(''),
            hintAtom: atom(''),
            balloonAtom: atom(3),
        },
        uiPart2QL: {
            dashboardAtom: atom<boolean>(false),
            nameAtom: atom(''),
            urlAtom: atom(''),
        },
        uiPart3ScreenDetection: {
            captionAtom: atom(''),
            monitorAtom: atom<boolean>(false),
            urlAtom: atom(''),
                },
        uiPart4Authentication: {
            aimAtom: atom<boolean>(false),
            lockAtom: atom<boolean>(false),
        },
        uiPart5PasswordManagerIcon: {
            idAtom: atom(''),
            locAtom: atom(''),
        },
    }
}

function Section({ label }: { label: string; }) {
    return (
        <div className="text-[#32ffdaa0]">{label}</div>
    );
}

function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input className={classNames("p-2 h-9 text-primary-300 bg-primary-700 rounded", className)} {...rest} />
    );
}

function Part1General({ }: {}) {
    return (
        <div className="ml-4">
            <div className="">Managed login name</div>
            <div className="">Description</div>
            <div className="">User hint</div>
            <div className="">Show balloon</div>
        </div>
    );
}

function Part2QL({ }: {}) {
    return (
        <div className="ml-4">
            <div className="">Display on mini-dashboard</div>
            <div className="">Quick Link Name</div>
            <div className="">Quick Link URL</div>
        </div>
    );
}

function Part3ScreenDetection({ }: {}) {
    return (
        <div className="ml-4">
            <div className="">Windows Caption</div>
            <div className="">Monitor screen changes</div>
            <div className="">URL</div>
        </div>
    );
}

function Part4Authentication({ }: {}) {
    return (
        <div className="ml-4">
            <div className="">Start authentication immediately</div>
            <div className="">Lock out login fields</div>
        </div>
    );
}

function Part5PasswordManagerIcon({ }: {}) {
    return (
        <div className="ml-4">
            <div className="">Location ID</div>
            <div className="">Location</div>
        </div>
    );
}

export function Section4_FormOptions({ fileUsAtom, formType }: { fileUsAtom: FileUsAtomType; formType: FormIdx; }) {
    const atoms = createAtoms('', () => {
        console.log('changed');
    })
    return (<>
        <Section label="General" />
        <Part1General />
        <Section label="Quick link" />
        <Part2QL />
        <Section label="Screen detection" />
        <Part3ScreenDetection />
        <Section label="Authentication" />
        <Part4Authentication />
        <Section label="Password Manager Icon" />
        <Part5PasswordManagerIcon />
    </>);
}
