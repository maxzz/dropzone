import React, { InputHTMLAttributes } from 'react';
import { Atomize } from '@/hooks/atomsX';
import { FileUsAtomType, FormIdx } from '@/store';
import { Meta } from '@/store/manifest';
import { classNames } from '@/utils';
import { atom, PrimitiveAtom, useAtom, useAtomValue } from 'jotai';

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

type FormAtoms = {
    uiPart1General: Atomize<UiPart1General>;
    uiPart4QL: Atomize<UiPart4QL>;
    uiPart2ScreenDetection: Atomize<UiPart2ScreenDetection>;
    uiPart3Authentication: Atomize<UiPart3Authentication>;
    uiPart5PasswordManagerIcon: Atomize<UiPart5PasswordManagerIcon>;

    fileUsAtom: FileUsAtomType;
    formIdx: FormIdx;
};

function createAtoms(v: string, callback: () => void, fileUsAtom: FileUsAtomType, formIdx: FormIdx): FormAtoms {
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

function Section({ label }: { label: string; }) {
    return (
        <div className="mt-2 mb-1 col-span-2 text-[#32ffdaa0] font-normal border-[#32ffda40] border-b">{label}</div>
    );
}

function RowInput({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={classNames(
                "px-2 py-1 h-6",
                "bg-primary-800 text-primary-300 focus:ring-offset-primary-800 ring-primary-600 focus:ring-primary-500",
                "focus:ring-1 focus:ring-offset-1",
                "outline-none rounded-sm",
                className,
            )}
            {...rest}
        />
    );
}

function RowBoolean({ useItAtom, className, ...rest }: { useItAtom: PrimitiveAtom<boolean>; } & InputHTMLAttributes<HTMLInputElement>) {
    const [useIt, setUseIt] = useAtom(useItAtom);
    return (
        <input
            className={classNames("place-self-center w-4 h-4 dark-checkbox", className,)}
            type="checkbox"
            checked={useIt}
            onChange={() => setUseIt(v => !v)}
            {...rest}
        />
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
        <RowInput value={name} onChange={(e) => setName(e.target.value)} />

        <div className="">Description</div>
        <RowInput value={desc} onChange={(e) => setDesc(e.target.value)} />

        <div className="">User hint</div>
        <RowInput value={hint} onChange={(e) => setHint(e.target.value)} />

        <div className="">Show balloon</div>
        <RowInput value={balloon} onChange={(e) => setBalloon(+e.target.value)} /> {/* TODO: add validation */}
    </>);
}

function Part2ScreenDetection({ atoms }: { atoms: FormAtoms; }) {
    const [url, setUrl] = useAtom(atoms.uiPart2ScreenDetection.urlAtom);
    const [caption, setCaption] = useAtom(atoms.uiPart2ScreenDetection.captionAtom); //TODO: show only if web app
    const [monitor, setMonitor] = useAtom(atoms.uiPart2ScreenDetection.monitorAtom);

    const fileUs = useAtomValue(atoms.fileUsAtom);
    const isWeb = fileUs.stats.isWeb;
    return (
        isWeb ?
            <>
                <div className="">URL</div>
                <RowInput value={url} onChange={(e) => setUrl(e.target.value)} />
            </>
            : <>
                <div className="">Windows Caption</div>
                <RowInput value={caption} onChange={(e) => setCaption(e.target.value)} />

                <div className="">Monitor screen changes</div>
                <RowInput value={monitor ? '1' : '0'} onChange={(e) => setMonitor(e.target.value === '1')} />

            </>);
}

function Part3Authentication({ atoms }: { atoms: FormAtoms; }) {
    return (<>
        <div className="mb-1" title="Start authentication immediately">Authenticate immediately</div>
        <RowBoolean className="mb-1 justify-self-start" useItAtom={atoms.uiPart3Authentication.aimAtom} />

        <div className="">Lock out login fields</div>
        <RowBoolean className="justify-self-start" useItAtom={atoms.uiPart3Authentication.lockAtom} />
    </>);
}

function Part4QL({ atoms }: { atoms: FormAtoms; }) {
    const [dashboard, setDashboard] = useAtom(atoms.uiPart4QL.dashboardAtom);
    const [name, setName] = useAtom(atoms.uiPart4QL.nameAtom);
    const [url, setUrl] = useAtom(atoms.uiPart4QL.urlAtom);
    return (<>
        <div className="">Quick Link URL</div>
        <RowInput value={url} onChange={(e) => setUrl(e.target.value)} />

        <div className="my-1">Display on mini-dashboard</div>
        <RowBoolean className="my-1 justify-self-start" useItAtom={atoms.uiPart4QL.dashboardAtom} />

        {dashboard && <>
            <div className="">Quick Link Name</div>
            <RowInput value={name} onChange={(e) => setName(e.target.value)} />
        </>}
    </>);
}

function Part5PasswordManagerIcon({ atoms }: { atoms: FormAtoms; }) {
    const [id, setId] = useAtom(atoms.uiPart5PasswordManagerIcon.idAtom);
    const [loc, setLoc] = useAtom(atoms.uiPart5PasswordManagerIcon.locAtom);
    return (<>
        <div className="">Location ID</div>
        <RowInput value={id} onChange={(e) => setId(e.target.value)} />

        <div className="">Location</div>
        <RowInput value={loc} onChange={(e) => setLoc(e.target.value)} />
    </>);
}

export function Section4_FormOptions({ fileUsAtom, formIdx }: { fileUsAtom: FileUsAtomType; formIdx: FormIdx; }) {
    // const fileUs = useAtomValue(fileUsAtom);
    // const metaForm = fileUs.meta?.[formIdx];

    const atoms = createAtoms('', () => {
        console.log('changed');
    }, fileUsAtom, formIdx);

    const fileUs = useAtomValue(atoms.fileUsAtom);
    const isWeb = fileUs.stats.isWeb; // TODO: why this is not per form?

    return (
        <div className="mr-1 grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-0.5 items-center font-light text-primary-400">
            <Section label="General" />
            <Part1General atoms={atoms} />

            <Section label="Screen detection" />
            <Part2ScreenDetection atoms={atoms} />

            <Section label="Authentication" />
            <Part3Authentication atoms={atoms} />

            <Section label="Quick link" />
            <Part4QL atoms={atoms} />

            {!isWeb && <>
                <Section label="Password Manager Icon" />
                <Part5PasswordManagerIcon atoms={atoms} />
            </>}
        </div>
    );
}

//TODO: Do we need to show fields: window caption and classname if they don't have sense for web, but created w/ IE?
