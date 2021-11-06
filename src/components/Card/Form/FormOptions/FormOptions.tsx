import { PrimitiveAtom, useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import React from 'react';
import { FileUsAtom, SelectRowAtoms } from '../../../../store/store';
import FieldRowPreview from '../FormRows/FieldRowPreview';
import FormOptionsDetection from './FormOptionsDetection';
import FormOptionsPool from './FormOptionsPool';

export const BtnShading: React.CSSProperties = {
    backgroundImage: 'linear-gradient(360deg, #ffffff3f 0%, #9d9d9d2f 30%, #9d9d9d2f 70%, #ffffff3f 100%)',
    boxShadow: '0px 1px #64646420',
};

function FormOptionLockFields({ lockfields }: { lockfields: string | undefined; }) {
    const useit = lockfields == '1';
    const title = `Lock fields: ${useit ? '1 (lock)' : `${lockfields} don\'t lock`}`;
    return (
        <div className={`px-2 h-6 leading-6 border border-gray-500 rounded ${useit ? '' : 'opacity-25'}`} title={title} style={BtnShading}>
            lock
        </div>
    );
}

function FormOptionQuickLink({ ql }: { ql: string | undefined; }) {
    const useit = ql == '1';
    const title = `Quick link: ${useit ? '1 (use)' : ql == '2' ? '2 (don\'t use)' : `'${ql}''`}`;
    return (
        <div className={`px-2 h-6 leading-6 border border-gray-500 rounded text-[.65rem] ${useit ? '' : 'opacity-25'}`} title={title} style={BtnShading}>
            QL
        </div>
    );
}

function OptionsFormPreview({ form, formType, selectRowAtoms, small, setSmall }: { form: Meta.Form; formType: number; selectRowAtoms: SelectRowAtoms; small: boolean; setSmall: React.Dispatch<React.SetStateAction<boolean>>; }) {
    const selectedRowAtom = formType === 0 ? selectRowAtoms.loginAtom : selectRowAtoms.cpassAtom;
    const [selectedRow, setSelectedRow] = useAtom(selectedRowAtom);
    return (
        <div className="" onClick={() => setSmall((v) => !v)}>
            <FieldRowPreview small={small} form={form} selected={selectedRow.field} className={`${small ? 'w-24 max-h-24' : 'w-96 max-h-96'}`}
                onSelected={(selected: number) => setSelectedRow({ field: selected, form: form.type })}
            />
        </div>
    );
}


function IonIosGearOutline(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 512 512" {...props}>
            <path d="M256.9 159.9c-25.701 0-49.801 10-67.9 28.1s-28.1 42.199-28.1 67.9c0 25.699 10 49.699 28.1 67.9 18.1 18.1 42.301 28.1 67.9 28.1 25.699 0 49.799-10 67.9-28.1 18.1-18.102 28.1-42.201 28.1-67.9 0-25.701-10-49.701-28.1-67.9-18.101-18.1-42.2-28.1-67.9-28.1zm0 176c-44.301 0-80-35.9-80-80 0-44.101 35.699-80 80-80 44.299 0 80 35.899 80 80 0 44.1-35.701 80-80 80z"
                fill="currentColor"></path>
            <path d="M201.787 82.828a65.378 65.378 0 0 0 16.775 17.069c11.012 7.715 23.957 11.793 37.438 11.793 13.481 0 26.428-4.078 37.439-11.793a65.398 65.398 0 0 0 16.773-17.068 179.969 179.969 0 0 1 29.927 12.411 65.403 65.403 0 0 0-.203 23.933c2.333 13.235 8.604 25.269 18.133 34.798 12.335 12.336 28.737 19.129 46.185 19.129 4.242 0 8.424-.399 12.52-1.195a179.858 179.858 0 0 1 12.405 29.947 65.388 65.388 0 0 0-17.054 16.776c-7.705 11.008-11.777 23.946-11.776 37.418 0 13.467 4.069 26.401 11.768 37.406a65.378 65.378 0 0 0 17.036 16.771 179.868 179.868 0 0 1-12.428 29.957 65.615 65.615 0 0 0-12.472-1.187c-17.448 0-33.85 6.795-46.183 19.131-9.515 9.514-15.781 21.527-18.123 34.74a65.397 65.397 0 0 0 .176 23.895 179.911 179.911 0 0 1-29.967 12.421 65.372 65.372 0 0 0-16.771-17.022c-11-7.689-23.928-11.754-37.386-11.754-13.457 0-26.385 4.064-37.385 11.755a65.399 65.399 0 0 0-16.771 17.021 179.932 179.932 0 0 1-29.966-12.42 65.397 65.397 0 0 0 .176-23.895c-2.342-13.214-8.608-25.228-18.123-34.741-12.335-12.336-28.737-19.13-46.185-19.13-4.226 0-8.39.396-12.471 1.187a180.012 180.012 0 0 1-12.428-29.958 65.378 65.378 0 0 0 17.036-16.771c7.699-11.004 11.769-23.939 11.769-37.408 0-13.471-4.072-26.41-11.777-37.418A65.403 65.403 0 0 0 82.82 201.85a179.882 179.882 0 0 1 12.405-29.946 65.54 65.54 0 0 0 12.521 1.196c17.446 0 33.849-6.794 46.185-19.13 9.529-9.53 15.799-21.563 18.133-34.799a65.376 65.376 0 0 0-.203-23.932 180.164 180.164 0 0 1 29.926-12.411M302.074 64C294.971 82.529 277.027 95.69 256 95.69c-21.025 0-38.969-13.161-46.073-31.69a196.255 196.255 0 0 0-57.128 23.688c8.068 18.122 4.682 40.104-10.182 54.97-9.631 9.631-22.25 14.443-34.87 14.443a49.429 49.429 0 0 1-20.083-4.255A196.3 196.3 0 0 0 64 209.984c18.51 7.112 31.652 25.049 31.652 46.062 0 21.008-13.133 38.936-31.631 46.054a196.32 196.32 0 0 0 23.693 57.128 49.42 49.42 0 0 1 20.031-4.232c12.621 0 25.238 4.812 34.871 14.443 14.841 14.841 18.238 36.781 10.215 54.889a196.251 196.251 0 0 0 57.131 23.673c7.127-18.479 25.046-31.596 46.037-31.596 20.992 0 38.91 13.115 46.037 31.596a196.234 196.234 0 0 0 57.132-23.675c-8.023-18.106-4.626-40.046 10.216-54.887 9.629-9.632 22.248-14.444 34.868-14.444 6.836 0 13.67 1.411 20.033 4.233a196.318 196.318 0 0 0 23.692-57.128c-18.498-7.118-31.63-25.048-31.63-46.054-.001-21.013 13.143-38.948 31.651-46.062a196.302 196.302 0 0 0-23.664-57.139 49.423 49.423 0 0 1-20.082 4.254c-12.621 0-25.238-4.811-34.871-14.442-14.863-14.863-18.248-36.846-10.18-54.97A196.24 196.24 0 0 0 302.074 64z"
                fill="currentColor"></path>
        </svg>
    );
}

function FormOptions({ fileUsAtom, formType, selectRowAtoms }: { fileUsAtom: FileUsAtom; formType: number; selectRowAtoms: SelectRowAtoms; }): JSX.Element | null {
    const [fileUs] = useAtom(fileUsAtom);
    const meta = fileUs.meta?.[formType];
    if (!meta) {
        return null;
    }
    const [small, setSmall] = React.useState(true);
    const form = meta.mani;
    const detection = form?.detection || {};
    const options = form?.options || {};
    const hasFormPreview = !!meta?.view?.rects.length;
    return (
        <div className="relative py-1 flex justify-between text-xs leading-5 bg-gray-300">
            <div className={`place-self-start flex ${small ? 'space-x-1' : 'flex-col items-stretch space-y-1 mr-1'}`}>
                <IonIosGearOutline />
                <FormOptionsDetection fileUsAtom={fileUsAtom} formType={formType} />
                <FormOptionsPool names_ext={detection.names_ext} />
                <FormOptionQuickLink ql={options.usequicklink} />
                <FormOptionLockFields lockfields={options.lockfields} />
            </div>
            {hasFormPreview && <OptionsFormPreview form={meta} formType={formType} selectRowAtoms={selectRowAtoms} small={small} setSmall={setSmall} />}
        </div>
    );
}

export default FormOptions;

//TODO: form preview: move left-top to min point, i.e. ignore window position: find min x,y and substract from all location. can be done in meta
//TODO: form preview: show one preview per form?
//TODO: form preview: checkbox (on form preview) to show individual preview per field or not
//TODO: form preview: use hover over preview icon instead of click

//TODO: preview for all fields and highlight on click
//TODO: save split pane position