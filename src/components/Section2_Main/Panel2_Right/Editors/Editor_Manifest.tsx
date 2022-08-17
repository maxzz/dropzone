import React from 'react';
import { useAtom } from 'jotai';
import { FileUsAtomType } from '@/store';
import SelectDemo from './UISelect';

function Values({ isPsw }: { isPsw: boolean; }) {
    return (<>
        <div className="">Ask - Resuse</div>
        <div className="">Ask - Confirm</div>
        <div className="">Ask always</div>
        {isPsw
            ? <>
                <div className="">Windows Password</div>
            </>
            : <>
                <div className="">Windows User Name</div>
                <div className="">Windows User Principal Name</div>
                <div className="">Windows Domain\User Name</div>
                <div className="">Windows Domain</div>
                <div className="">Windows E-mail Address</div>
            </>
        }
    </>);
}

function SubmitOptions({ }: {}) {
    return (<>
        <div className="">Do Not Submit</div>
        <div className="">Automatically submit login data</div>
    </>);
}

function QL({ }: {}) {
    return (<>
        <div className="">Display on mini-dashboard</div>
        <div className="">Quick Link Name</div>
        <div className="">Quick Link URL</div>
    </>);
}

function ScreenDetection({ }: {}) {
    return (<>
        <div className="">Windows Caption</div>
        <div className="">Monitor screen changes</div>
        <div className="">URL</div>
    </>);
}

function Authentication({ }: {}) {
    return (<>
        <div className="">Start authentication immediately</div>
        <div className="">Lock out login fields</div>
    </>);
}

function PasswordManagerIcon({ }: {}) {
    return (<>
        <div className="">Location ID</div>
        <div className="">Location</div>
    </>);
}

function Form_Login() {
    return (<>
        <div className="text-lg border-red-500 border-b">Login</div>
        <div className="pl-4">
            <div className="">Fields</div>

            <div className="">Submit options</div>

            <div className="">Form options</div>
            <div className="pl-4">
                <div className="">General</div>
                <div className="">Quick link</div>
                <div className="">Screen detection</div>
                <div className="">Authentication</div>
            </div>
        </div>
    </>);
}

function Form_PChange() {
    return (<>
        <div className="text-lg border-red-500 border-b">Password change</div>

        <div className="">Fields</div>

        <div className="">Submit options</div>

        <div className="">Form options</div>
        <div className="">
            <div className="">General</div>
            <div className="">Quick link</div>
            <div className="">Screen detection</div>
            <div className="">Authentication</div>
        </div>
    </>);
}

export function Editor_Manifest({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const [fileUs] = useAtom(fileUsAtom);
    return (
        <div>
            <Form_Login />
            <Form_PChange />

            <SelectDemo />
        </div>
    );
}
