import { FileUsAtomType, FormIdx } from '@/store';
import { Meta } from '@/store/manifest';
import React from 'react';

function Section({ label }: { label: string; }) {
    return (
        <div className="text-[#32ffdaa0]">{label}</div>
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
