import React, { forwardRef, HTMLAttributes, memo, useEffect, useState } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { FileUsAtomType, foldAllCardsAtom, SelectRowAtomsType, } from '@/store';
import { CardTitle } from './Part1_CardTitle/CardTitle';
import { FormOptions } from './Part2_CardBody/FormOptions/FormOptions';
import { FormFields } from './Part2_CardBody/FormRows/FormFields';
import { UICardFormButton } from './Part4_CardUI/UICardFormButton';

function FormContent({ fileUsAtom, formType, selectRowAtoms }: { fileUsAtom: FileUsAtomType; formType: number; selectRowAtoms: SelectRowAtomsType; }) {
    return (<>
        <div className="pt-2 font-bold border-b border-gray-400">{formType === 0 ? "Login form" : "Password change form"}</div>
        <FormOptions fileUsAtom={fileUsAtom} formType={formType} selectRowAtoms={selectRowAtoms} />
        <FormFields fileUsAtom={fileUsAtom} formType={formType} selectRowAtoms={selectRowAtoms} />
    </>);
}

function CardTopButtons({ fileUsAtom }: { fileUsAtom: FileUsAtomType; }) {
    const [open, setOpen] = useState(false);
    const openAll = useAtomValue(foldAllCardsAtom);
    const [selectRowAtoms] = useState<SelectRowAtomsType>({
        loginAtom: atom({ field: -1, form: -1 }),
        cpassAtom: atom({ field: -1, form: -1 }),
    });
    const Toogle = () => setOpen((v) => !v);

    useEffect(() => {
        if (openAll >= 0) {
            const collapse = openAll % 2 === 0;
            setOpen(collapse);
        }
    }, [openAll]);

    const fileUs = useAtomValue(fileUsAtom);
    const nForms = fileUs.mani?.forms.length || 0;
    const hasLogin = nForms > 0;
    const hasCpass = nForms > 1;
    const disp = (type: number) => fileUs?.meta?.[type].disp;

    return (
        <>{(hasLogin || hasCpass) &&
            <div className="p-2 bg-gray-200 text-gray-800">
                <div className="flex items-center space-x-2 text-sm">
                    {hasLogin && <UICardFormButton disp={disp(0)} opened={open} onClick={Toogle} label="Login form" />}
                    {hasCpass && <UICardFormButton disp={disp(1)} opened={open} onClick={Toogle} label="Password change form" />}
                </div>
                {hasLogin && open && (<FormContent fileUsAtom={fileUsAtom} formType={0} selectRowAtoms={selectRowAtoms} />)}
                {hasCpass && open && (<FormContent fileUsAtom={fileUsAtom} formType={1} selectRowAtoms={selectRowAtoms} />)}
            </div>
        }</>
    );
}

type CardProps = {
    fileUsAtom: FileUsAtomType;
} & HTMLAttributes<HTMLDivElement>;

function Card_({ fileUsAtom, ...props }: CardProps) {
    const { className, ...rest } = props;
    return (
        <div className={`grid grid-rows-[min-content,minmax(auto,1fr)] overflow-hidden rounded shadow-md select-none ${className}`} {...rest}>
            <CardTitle fileUsAtom={fileUsAtom} />
            <CardTopButtons fileUsAtom={fileUsAtom} />
        </div>
    );
}

export const Card = memo(Card_);

export const CardWRef = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const { fileUsAtom, className, ...rest } = props;
    return (
        <div ref={ref} className={`grid grid-rows-[min-content,minmax(auto,1fr)] overflow-hidden rounded shadow-md select-none ${className}`} {...rest}>
            <CardTitle fileUsAtom={fileUsAtom} />
            <CardTopButtons fileUsAtom={fileUsAtom} />
        </div>
    );
});

//TODO: add card index of total - done
//TODO: compact view - tbd
//TODO: some IE forms have no detection section: but we can check IE_Server and presences of locations
