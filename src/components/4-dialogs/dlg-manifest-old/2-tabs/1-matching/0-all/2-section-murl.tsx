import { useState } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { IconCaseRegex, IconCaseSame, IconCaseSameDoc, IconMicroscope, IconNotInUse, IconStopCircle, IconStopHand, UIIconUpDown } from "@ui/icons";
import { UrlsEditorDataAtom } from "./9-types";
import { MatchHow } from "../2-murl-group";
import { AnimatedDropdown } from "./6-animated-dropdown";
import { ThesameAsOriginalUrl } from "./5-the-same-as-original";
import { SectionName } from "./4-section-name";

export function Section_Murl({ urlsEditorDataAtom }: { urlsEditorDataAtom: UrlsEditorDataAtom; }) {
    const urlsEditorData = useAtomValue(urlsEditorDataAtom);
    const o = useAtomValue(urlsEditorData.oAtom);
    const m = useAtomValue(urlsEditorData.mAtom);
    const isTheSame = o === m;

    const [isOpen, setIsOpen] = useState(!isTheSame);

    return (<>
        <div className="mt-4 cursor-pointer flex items-center gap-x-1 select-none" onClick={() => setIsOpen(!isOpen)}>
            <SectionName>Matching url</SectionName>
            <UIIconUpDown className={classNames("size-5 fill-black", !isOpen && "mb-0.5")} double={false} horizontal={true} isOpen={isOpen} />

            <IconCaseSame className="ml-20 p-0.5 size-4 text-slate-500 border rounded" />
            <IconCaseRegex className="p-0.5 pt-1 size-4 text-slate-500 border rounded" />
            <IconCaseSameDoc className="p-0.5 size-4 border rounded" />

            <TestStopIcons />
            {/* <TestMicroscopeIcons /> */}

            <IconNotInUse className="p-0.5 size-4 border rounded" />
            <IconMicroscope className="p-0.5 size-4 border rounded" />

            <ThesameAsOriginalUrl className="flex-auto text-end ml-4 text-xs" isTheSame={isTheSame} isOpen={isOpen} />
        </div>

        <AnimatedDropdown isOpen={isOpen}>
            <MatchHow urlsEditorDataAtom={urlsEditorDataAtom} />
        </AnimatedDropdown>
    </>);
}

function TestMicroscopeIcons() {
    return (<>
        {/* https://icones.js.org/collection/all?s=microscope&icon=icon-park:microscope */}
        <svg className="p-0.5 size-4 stroke-current fill-none stroke-[4]" viewBox="0 0 48 48">
            <g strokeLinecap="round" strokeLinejoin="round">
                <path d="M26 44c4.35-3 6.66-6.05 6.95-9.12.29-3.08-.64-5.37-2.78-6.88" />
                <path d="M27.66 28.22a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
                <path d="m24.29 27-5.51 5.58-9.2-9.2L27.99 5l9.18 9.2-6.18 6.18" />
                <path d="m6.56 28.14 7.86 7.67" />
                <path d="M6 44h36" />
            </g>
        </svg>

        {/* https://icones.js.org/collection/all?s=microscope&icon=fluent:microscope-20-regular */}
        <svg className="p-0.5 size-4 fill-current" viewBox="0 0 20 20">
            <path d="M7 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V3h.5a.5.5 0 0 1 .5.5v1.53a.5.5 0 0 1 .11 0A6.5 6.5 0 0 1 13.97 17h2.53a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1h7A5.5 5.5 0 0 0 11 6.02v5.48a.5.5 0 0 1-.5.5H10v.5a1.5 1.5 0 0 1-3 0V12h-.5a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5H7zM8 12v.5a.5.5 0 0 0 1 0V12zm-1-1h3V4H7zm-1.5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1z" />
        </svg>

        {/* https://icones.js.org/collection/all?s=microscope&icon=carbon:microscope */}
        <svg className="p-0.5 size-4 fill-current" viewBox="0 0 32 32">
            <path d="M25.4 24a7.88 7.88 0 0 0-1.68-8.57 3.92 3.92 0 0 0-1.08-4.41l2.77-2.78a2 2 0 0 0 0-2.83L22.6 2.6a2 2 0 0 0-2.83 0L6.59 15.76a2 2 0 0 0 0 2.83L9.4 21.4a2 2 0 0 0 2.83 0l4.78-4.77a3.93 3.93 0 0 0 5.51.43 5.94 5.94 0 0 1 .65 6.93H16v4H4v2h24v-6Zm-14.57-4L8 17.17l1.88-1.88 2.83 2.83ZM16 14a4 4 0 0 0 .08.75l-1.96 1.96-2.83-2.83L21.17 4 24 6.83l-3.25 3.25A3.98 3.98 0 0 0 16 14m4 2a2 2 0 1 1 2-2 2 2 0 0 1-2 2m6 12h-8v-2h8Z" />
        </svg>

        {/* https://icones.js.org/collection/all?s=microscope&icon=healthicons:microscope-outline */}
        <svg className="p-0.5 size-4 fill-current" viewBox="0 0 48 48">
            <path fill-rule="evenodd" clip-rule="evenodd" d="m19.77 8.3 1.5-.85.97 1.7a3.02 3.02 0 0 1 3.55 1.35l4.53 7.78a2.98 2.98 0 0 1-1.1 4.09l-.85.48.68 1.31-2.68 1.36-.6-1.17-.67.38a3.02 3.02 0 0 1-4.11-1.1l-2.92-5.03c-2.57 1.48-4.33 3.12-5.28 5a8.46 8.46 0 0 0-.62 5.64A9.96 9.96 0 0 1 17 28a9.98 9.98 0 0 1 8 4l12.08-6.82 1 1.74-12.05 6.79A10.05 10.05 0 0 1 26.8 40H40a1 1 0 1 1 0 2H7.83A10 10 0 0 1 7 38a9.98 9.98 0 0 1 3.4-7.52c-.76-2.92-.54-5.5.6-7.77 1.19-2.36 3.3-4.25 6.06-5.84l-.6-1.02a2.98 2.98 0 0 1 .26-3.37l-1.06-1.84 1.5-.85-1.24-2.23 2.63-1.45zm8.81 10.97-4.52-7.77a1.01 1.01 0 0 0-1.37-.37l-4.13 2.36a.99.99 0 0 0-.36 1.37l4.52 7.77a1 1 0 0 0 1.37.37l4.13-2.36a.99.99 0 0 0 .36-1.36M24.75 40a8 8 0 0 0 .25-2c0-1.18-.26-2.3-.71-3.3l-4.8 2.7-1-1.74L23.24 33A8 8 0 0 0 9.25 40z" />
        </svg>

        {/* https://icones.js.org/collection/all?s=microscope&icon=ri:microscope-line */}
        <svg className="p-0.5 size-4 fill-current scale-x-[-1]" viewBox="0 0 24 24">
            <path d="m13.2 2.27 3.25 5.63a1 1 0 0 1-.37 1.36l-1.3.75 1 1.74-1.73 1-1-1.74-1.3.75a1 1 0 0 1-1.37-.36L8.55 8.2a5 5 0 0 0-3.23 6.56A4.97 4.97 0 0 1 8 14a5 5 0 0 1 4.08 2.1l7.69-4.43 1 1.73-7.88 4.55A5 5 0 0 1 12.9 20H21v2H4a4.98 4.98 0 0 1-1-3c0-1 .3-1.95.81-2.73a7 7 0 0 1 3.72-9.82l-.4-.68a2 2 0 0 1 .74-2.73l2.6-1.5a2 2 0 0 1 2.73.73M8 16a3 3 0 0 0-2.83 4h5.66A3 3 0 0 0 8 16m3.46-12.73-2.6 1.5 2.76 4.76 2.6-1.5z" />
        </svg>

        {/* https://icones.js.org/collection/all?s=microscope&icon=iconoir:microscope */}
        <svg className="p-0.5 size-4 stroke-[1.5] stroke-current fill-none scale-x-[-1]" viewBox="0 0 24 24">
            <g strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 22H7m-2 0h2m0 0v-3m12-3h-9m6-14h-4m0 5c-3 0-5 1-5 4v2m9-8.4v6.8a.6.6 0 0 1-.6.6h-2.8a.6.6 0 0 1-.6-.6V4.6a.6.6 0 0 1 .6-.6h2.8a.6.6 0 0 1 .6.6" />
                <path d="M7 19a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
            </g>
        </svg>
    </>);
}

function TestStopIcons() {
    return (<>
        {/* https://icon-sets.iconify.design/?query=stop&search-page=7 icon-[streamline-ultimate-color--road-sign-stop] */}
        <svg className="size-10 fill-none stroke-red-500 stroke-[1.5]" viewBox="0 0 24 24">
            <g fill="none">
                <path fill="#fff" d="M16.16 1H7.84c-.26 0-.5.1-.68.28L1.28 7.16a.96.96 0 0 0-.28.68v8.32c0 .25.1.5.28.68l5.88 5.88c.18.18.43.28.68.28h8.32c.25 0 .5-.1.68-.28l5.88-5.88a.96.96 0 0 0 .28-.68V7.84c0-.25-.1-.5-.28-.68l-5.88-5.88a.96.96 0 0 0-.68-.28" />
                <path fill="#ff808c" d="M15.17 3.4H8.83c-.25 0-.5.1-.68.27L3.67 8.15a.96.96 0 0 0-.28.68v6.34c0 .25.1.5.28.68l4.48 4.48c.18.18.43.28.68.28h6.34c.25 0 .5-.1.68-.28l4.48-4.48a.96.96 0 0 0 .28-.68V8.83c0-.25-.1-.5-.28-.68l-4.48-4.48a.96.96 0 0 0-.68-.28" />
                <path fill="#ffbfc5" d="M12 3.4H8.75a.75.75 0 0 0-.53.21l-4.6 4.6a.75.75 0 0 0-.23.54v6.5a.75.75 0 0 0 .22.53l4.6 4.6a.75.75 0 0 0 .54.23H12z" />
                <path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M10.56 14.39V9.61m-.95 0h1.91m5.74 4.78V9.61m0 0h.48a1.44 1.44 0 0 1 0 2.87h-.48M14.39 9.6a.96.96 0 0 0-.96.95v2.87a.96.96 0 1 0 1.92 0v-2.87a.96.96 0 0 0-.96-.95m-6.7 0h-.95a.96.96 0 0 0-.96.95C5.78 12 7.7 12 7.7 13.43a.96.96 0 0 1-.96.96h-.96" />
                <path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M16.16 1H7.84c-.26 0-.5.1-.68.28L1.28 7.16a.96.96 0 0 0-.28.68v8.32c0 .25.1.5.28.68l5.88 5.88c.18.18.43.28.68.28h8.32c.25 0 .5-.1.68-.28l5.88-5.88a.96.96 0 0 0 .28-.68V7.84c0-.25-.1-.5-.28-.68l-5.88-5.88a.96.96 0 0 0-.68-.28" />
            </g>
        </svg>
        <svg className="size-10 fill-none stroke-red-500 stroke-[1]" viewBox="0 0 24 24">
            <g fill="none">
                <path fill="#ff808c" d="M16.16 1H7.84c-.26 0-.5.1-.68.28L1.28 7.16a.96.96 0 0 0-.28.68v8.32c0 .25.1.5.28.68l5.88 5.88c.18.18.43.28.68.28h8.32c.25 0 .5-.1.68-.28l5.88-5.88a.96.96 0 0 0 .28-.68V7.84c0-.25-.1-.5-.28-.68l-5.88-5.88a.96.96 0 0 0-.68-.28" />
                {/* <path fill="#ff808c" d="M15.17 3.4H8.83c-.25 0-.5.1-.68.27L3.67 8.15a.96.96 0 0 0-.28.68v6.34c0 .25.1.5.28.68l4.48 4.48c.18.18.43.28.68.28h6.34c.25 0 .5-.1.68-.28l4.48-4.48a.96.96 0 0 0 .28-.68V8.83c0-.25-.1-.5-.28-.68l-4.48-4.48a.96.96 0 0 0-.68-.28" /> */}
                {/* <path fill="#ffbfc5" d="M12 3.4H8.75a.75.75 0 0 0-.53.21l-4.6 4.6a.75.75 0 0 0-.23.54v6.5a.75.75 0 0 0 .22.53l4.6 4.6a.75.75 0 0 0 .54.23H12z" /> */}
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M10.56 14.39V9.61m-.95 0h1.91m5.74 4.78V9.61m0 0h.48a1.44 1.44 0 0 1 0 2.87h-.48M14.39 9.6a.96.96 0 0 0-.96.95v2.87a.96.96 0 1 0 1.92 0v-2.87a.96.96 0 0 0-.96-.95m-6.7 0h-.95a.96.96 0 0 0-.96.95C5.78 12 7.7 12 7.7 13.43a.96.96 0 0 1-.96.96h-.96" />
                <path stroke="#ff808c" stroke-linecap="round" stroke-linejoin="round" d="M16.16 1H7.84c-.26 0-.5.1-.68.28L1.28 7.16a.96.96 0 0 0-.28.68v8.32c0 .25.1.5.28.68l5.88 5.88c.18.18.43.28.68.28h8.32c.25 0 .5-.1.68-.28l5.88-5.88a.96.96 0 0 0 .28-.68V7.84c0-.25-.1-.5-.28-.68l-5.88-5.88a.96.96 0 0 0-.68-.28" />
            </g>
        </svg>

        <IconStopHand className="size-6" />
        {/* https://icones.js.org/collection/all?s=stop&icon=tabler:hand-stop */}
        <svg className="size-6 stroke-[1.5] stroke-red-500 fill-none scale-x-[-1]" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-6.5v-2a1.5 1.5 0 1 1 3 0V12m0-6.5a1.5 1.5 0 0 1 3 0V12" />
            <path d="M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2 .2a6 6 0 0 1-5-2.7L7 19q-.47-.72-3.29-5.73a1.5 1.5 0 0 1 .54-2.02 1.87 1.87 0 0 1 2.28.28L8 13" />
        </svg>

        <IconStopCircle className="size-6" />
        {/* https://heroicons.com/ no-symbol */}
        <svg className="size-6 stroke-[1.5] fill-none stroke-red-500" viewBox="0 0 24 24">
            <path d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>

    </>);
}
