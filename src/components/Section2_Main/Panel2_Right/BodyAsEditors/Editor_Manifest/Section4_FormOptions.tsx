import React, { InputHTMLAttributes } from 'react';
import { Atomize } from '@/hooks/atomsX';
import { FileUsAtomType, FormIdx } from '@/store';
import { Meta } from '@/store/manifest';
import { classNames } from '@/utils/classnames';
import { atom, useAtom } from 'jotai';

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

type FormAtoms = {
    uiPart1General: Atomize<UiPart1General>;
    uiPart2QL: Atomize<UiPart2QL>;
    uiPart3ScreenDetection: Atomize<UiPart3ScreenDetection>;
    uiPart4Authentication: Atomize<UiPart4Authentication>;
    uiPart5PasswordManagerIcon: Atomize<UiPart5PasswordManagerIcon>;
};

function createAtoms(v: string, callback: () => void): FormAtoms {
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
    };
}

function Section({ label }: { label: string; }) {
    return (
        <div className="text-[#32ffdaa0] col-span-2">{label}</div>
    );
}

function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input className={classNames("p-2 h-9 text-primary-300 bg-primary-700 rounded", className)} {...rest} />
    );
}

//TODO: add RowString, RowBoolean, RowNumber, SectionBody: ml-0

function Part1General({ atoms }: { atoms: FormAtoms; }) {
    const [name, setName] = useAtom(atoms.uiPart1General.nameAtom);
    const [desc, setDesc] = useAtom(atoms.uiPart1General.descAtom);
    const [hint, setHint] = useAtom(atoms.uiPart1General.hintAtom);
    const [balloon, setBalloon] = useAtom(atoms.uiPart1General.balloonAtom);
    return (<>
        <div className="">Managed login name</div>
        <Input value={name} onChange={(e) => setName(e.target.value)} />

        <div className="">Description</div>
        <Input value={desc} onChange={(e) => setDesc(e.target.value)} />

        <div className="">User hint</div>
        <Input value={hint} onChange={(e) => setHint(e.target.value)} />

        <div className="">Show balloon</div>
        <Input value={balloon} onChange={(e) => setBalloon(+e.target.value)} /> {/* TODO: add validation */}
    </>);
}

function Part2QL({ atoms }: { atoms: FormAtoms; }) {
    const [dashboard, setDashboard] = useAtom(atoms.uiPart2QL.dashboardAtom);
    const [name, setName] = useAtom(atoms.uiPart2QL.nameAtom);
    const [url, setUrl] = useAtom(atoms.uiPart2QL.urlAtom);
    return (<>
        <div className="">Display on mini-dashboard</div>
        <Input value={dashboard ? '1' : '0'} onChange={(e) => setDashboard(e.target.value === '1')} />

        <div className="">Quick Link Name</div>
        <Input value={name} onChange={(e) => setName(e.target.value)} />

        <div className="">Quick Link URL</div>
        <Input value={url} onChange={(e) => setUrl(e.target.value)} />
    </>);
}

function Part3ScreenDetection({ atoms }: { atoms: FormAtoms; }) {
    const [caption, setCaption] = useAtom(atoms.uiPart3ScreenDetection.captionAtom);
    const [monitor, setMonitor] = useAtom(atoms.uiPart3ScreenDetection.monitorAtom);
    const [url, setUrl] = useAtom(atoms.uiPart3ScreenDetection.urlAtom);
    return (<>
        <div className="">Windows Caption</div>
        <Input value={caption} onChange={(e) => setCaption(e.target.value)} />

        <div className="">Monitor screen changes</div>
        <Input value={monitor ? '1' : '0'} onChange={(e) => setMonitor(e.target.value === '1')} />

        <div className="">URL</div>
        <Input value={url} onChange={(e) => setUrl(e.target.value)} />
    </>);
}

function Part4Authentication({ atoms }: { atoms: FormAtoms; }) {
    const [aim, setAim] = useAtom(atoms.uiPart4Authentication.aimAtom);
    const [lock, setLock] = useAtom(atoms.uiPart4Authentication.lockAtom);
    return (<>
        <div className="">Start authentication immediately</div>
        <Input value={aim ? '1' : '0'} onChange={(e) => setAim(e.target.value === '1')} />

        <div className="">Lock out login fields</div>
        <Input value={lock ? '1' : '0'} onChange={(e) => setLock(e.target.value === '1')} />
    </>);
}

function Part5PasswordManagerIcon({ atoms }: { atoms: FormAtoms; }) {
    const [id, setId] = useAtom(atoms.uiPart5PasswordManagerIcon.idAtom);
    const [loc, setLoc] = useAtom(atoms.uiPart5PasswordManagerIcon.locAtom);
    return (<>
        <div className="">Location ID</div>
        <Input value={id} onChange={(e) => setId(e.target.value)} />

        <div className="">Location</div>
        <Input value={loc} onChange={(e) => setLoc(e.target.value)} />
    </>);
}

export function Section4_FormOptions({ fileUsAtom, formType }: { fileUsAtom: FileUsAtomType; formType: FormIdx; }) {
    const atoms = createAtoms('', () => {
        console.log('changed');
    });
    return (
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-1">
            <Section label="General" />
            <Part1General atoms={atoms} />

            <Section label="Quick link" />
            <Part2QL atoms={atoms} />

            <Section label="Screen detection" />
            <Part3ScreenDetection atoms={atoms} />

            <Section label="Authentication" />
            <Part4Authentication atoms={atoms} />

            <Section label="Password Manager Icon" />
            <Part5PasswordManagerIcon atoms={atoms} />
        </div>
    );
}
