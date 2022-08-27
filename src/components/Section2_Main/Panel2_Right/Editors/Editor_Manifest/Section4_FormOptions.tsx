import React from 'react';

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

export function Section4_FormOptions({ }: {}) {
    return (<>
        <div className="">General</div>
        <div className="">Quick link</div>
        <div className="">Screen detection</div>
        <div className="">Authentication</div>
    </>);
}
