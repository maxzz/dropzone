import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { FileUsAtomType, SelectRowAtomsType } from '@/store';
import { BtnPopupDetection } from '../1-btn-popup-detection';
import { BtnPopupPool } from '../2-btn-popup-pool';
import { BtnEdit } from '../3-btn-edit';
import { Icon_LockFields } from './1-icon-lock-fields';
import { Icon_QuickLink } from './2-icon-quick-link';
import { BtnSvgPreview } from './3-btn-preview';

type CardFormBody1_HeaderProps = {
    fileUsAtom: FileUsAtomType;
    formIdx: number;
    selectRowAtoms: SelectRowAtomsType;
};

export function CardFormBody1_Header({ fileUsAtom, formIdx, selectRowAtoms }: CardFormBody1_HeaderProps): JSX.Element | null {
    const [small, setSmall] = useState(true);
    const fileUs = useAtomValue(fileUsAtom);
    
    const meta = fileUs.parsedSrc.meta?.[formIdx];
    if (!meta) {
        return null;
    }

    const form = meta.mani;
    const detection = form?.detection || {};
    const options = form?.options || {};
    const hasFormPreview = !!meta?.view?.rects.length;

    return (
        <div className="py-1 text-xs leading-5 flex items-center justify-between bg-primary-300 border-t border-b border-primary-400">

            <div className={`place-self-start flex ${small ? 'space-x-1 items-center' : 'flex-col items-stretch space-y-1 mr-1'}`}>
                <BtnPopupDetection fileUsAtom={fileUsAtom} formType={formIdx} />
                <BtnPopupPool names_ext={detection.names_ext} />
                <BtnEdit fileUsAtom={fileUsAtom} formIdx={formIdx} />

                <div className="flex items-center">
                    <Icon_LockFields lockfields={options.lockfields} />
                    <Icon_QuickLink ql={options.usequicklink} />
                </div>
            </div>

            {hasFormPreview && (
                <BtnSvgPreview
                    form={meta}
                    formIdx={formIdx}
                    selectRowAtoms={selectRowAtoms}
                    small={small}
                    setSmall={setSmall}
                />
            )}
        </div>
    );
}

//TODO: form preview: move left-top to min point, i.e. ignore window position: find min x,y and substract from all location. can be done in meta
//TODO: form preview: show one preview per form?
//TODO: form preview: checkbox (on form preview) to show individual preview per field or not
//TODO: form preview: use hover over preview icon instead of click - won't do

//TODO: preview for all fields and highlight on click - done
//TODO: save split pane position - done

//TODO: check if we have forms in FormDetectionEdit(). (i.e. we have web, win, fields, script, or exclude manifest)
