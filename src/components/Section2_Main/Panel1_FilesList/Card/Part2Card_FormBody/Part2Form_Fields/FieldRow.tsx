import React from 'react';
import { SetStateAction, useAtom, useSetAtom } from 'jotai';
import { FileUs, SelectRowAtomsType, SelectRowType } from '@/store';
import { Mani, Meta } from '@/store/manifest';
import { CardSvgPreview } from '../../Part3Card_Shared/CardSvgPreview';
import { FormRowTypeIcon } from './FieldRowTypeIcon';
import { FieldRowPath } from './FieldRowPath';
import { UIToggleWithPortal } from '../../Part4Card_UI/UIToggleWithPortal';
import { IconInOut, IconPreview, IconUseIt0, IconUseIt1 } from '@ui/UIIconSymbols';
import { classNames } from '@/utils/classnames';

function part1_UseIt(useIt: boolean | undefined, fieldIdx: number) {
    const title = `Field index: ${fieldIdx}. Marker to use or not to use this field`;
    const icon = useIt ? IconUseIt1 : IconUseIt0;
    return icon({ title, className: classNames("ml-0.5 px-0.5 w-3 h-3 flex-none", useIt ? "stroke-[#216100] stroke-[3]" : "stroke-[#888]") });
}

function part2_FieldType(type: Mani.FieldTypeStr | 'NOTYPE', field: Meta.Field) {
    const { password } = field.mani;
    return (<>
        <FormRowTypeIcon className="w-5 h-5 flex-none" field={field.mani} />

        <div className="w-11 text-xs flex-shrink-0" title={`Field type: ${password ? 'psw' : type}`}>
            {`${password ? 'psw' : type}`}
        </div>
    </>);
}

function part3_Preview(hasPreview: boolean, form: Meta.Form, field: Meta.Field, setSelectedRowThis: (update: SetStateAction<SelectRowType>) => void) {
    return (
        <UIToggleWithPortal title={`${hasPreview ? 'preview' : 'no preview'}`}
            toggle={
                <IconPreview className={classNames("w-4 h-4", !hasPreview && 'opacity-25')} />
            }
        >
            {/* Popup content */}
            {hasPreview &&
                <div className="w-[calc(1920px/4)] bg-primary-200 p-0.5 border border-primary-700">
                    <CardSvgPreview
                        form={form}
                        small={false}
                        selected={field.ridx} onSelected={(selected: number) => { setSelectedRowThis({ field: selected, form: form.type }); }}
                        className="w-[calc(calc(1920px/4)-6px)] h-[calc(1200px/4)]"
                    />
                    <div className="mt-0.5 p-1 text-xs text-blue-200 bg-blue-500">
                        X1 x Y1, X2 x Y2:<br /> {field.path.loc?.replace(/\|/g, ' | ')}
                    </div>
                </div>
            }
        </UIToggleWithPortal>
    );
}

function part4_DispText(useIt: boolean | undefined, type: Mani.FieldTypeStr | 'NOTYPE', displayname: string) {
    return (
        <div className="flex-1 cursor-default whitespace-nowrap">
            {type === 'text'
                ?
                <div className="flex">
                    <div
                        className={classNames(
                            "px-1 h-4 text-[10px] leading-[12px] border-primary-600 border border-dotted rounded-sm cursor-default",
                            useIt ? "bg-primary-300 text-primary-800" : "opacity-50",
                        )}
                        title={`Matching pattern:\n${displayname}`}
                    >
                        patern
                    </div>
                </div>
                :
                //displayname
                <div title={`Dispaly name: ${displayname}`}>
                    {`${displayname.substring(0, 15)}${displayname.length > 15 ? '...' : ''}`}
                </div>}

            {/* TODO: */}
            {/* <div className="w-[20%] pr-2 cursor-default overflow-hidden">
                <div className="whitespace-nowrap overflow-ellipsis">{disp}</div>
            </div> */}

        </div>
    );
}

//TODO: why row w/ pattern selected w/ prev edit field?
//TODO: move color primary and top parent, i.e. single place

//TODO: className={classNames("row-field-framed", low && "opacity-25")}
// function borderDiv(low: boolean) {
//     return (
//         <div className=""></div>
//     );
// }

function part5_Policy(field: Meta.Field) {
    const { policy } = field.mani;
    const low = !policy;
    return (
        <div className={classNames("row-field-framed", low && "opacity-25")} title={`Field policy: ${policy}`}>
            policy
        </div>
    );
}

function part6_Value(field: Meta.Field) {
    const { value, choosevalue } = field.mani;
    const title = `Field value: ${value}${choosevalue ? ` | Choices: ${choosevalue}` : ''}`;
    const low = !value;
    return (
        <div className={classNames("row-field-framed", low && "opacity-25")} title={title}>
            value
        </div>
    );
}

function part7_FormCrossrefs(field: Meta.Field) {
    const { rfield, rfieldindex, rfieldform } = field.mani;
    const title = `Ref.index: ${rfield ? `[${rfield}]:` : ''}${rfieldindex} Ref.form: ${rfieldform}`;
    const low = !rfield && !rfieldform;
    return (
        <div className={classNames("row-field-framed", low && 'opacity-25')} title={title}>
            <IconInOut className="w-3 h-4" />
        </div>
    );
}

function part8_Id(field: Meta.Field) {
    const { dbname } = field.mani;
    return (
        <div className="row-field-framed" title={`Value ID: ${dbname}`}>
            id
        </div>
    );
}

function part9_Path(hasPath: boolean, fileUs: FileUs, form: Meta.Form, field: Meta.Field) {
    const { path_ext } = field.mani;
    return (
        <UIToggleWithPortal title={hasPath ? path_ext : 'no path'}
            toggle={<>path</>}
            className={classNames("row-field-framed", !hasPath && 'text-red-500 opacity-50')}
        >
            {/* Popup content */}
            {hasPath
                ?
                <FieldRowPath field={field} />
                :
                <div className="px-2 py-1 text-xs text-red-500 bg-primary-100 border-primary-400 border">
                    This field has no path and cannot be used.
                </div>
            }
        </UIToggleWithPortal>
    );
}

type FieldRowProps = {
    fileUs: FileUs;
    form: Meta.Form;
    field: Meta.Field;
    selectRowAtoms: SelectRowAtomsType;
};

export function FieldRow({ fileUs, form, field, selectRowAtoms }: FieldRowProps): JSX.Element {
    const { displayname = '', type = 'NOTYPE', rfieldindex, useit, } = field.mani;

    const selectThisFormAtom = form.type === 0 ? selectRowAtoms.loginAtom : selectRowAtoms.cpassAtom;
    const selectThemFormAtom = form.type === 0 ? selectRowAtoms.cpassAtom : selectRowAtoms.loginAtom;
    const [selectedRowThis, setSelectedRowThis] = useAtom(selectThisFormAtom);
    const setSelectedRowThem = useSetAtom(selectThemFormAtom);

    const hasPreview = !!field.path.loc;
    const hasPath = !!Object.keys(field.path).length;

    const isSelected = form.view?.rects.length && field.ridx === selectedRowThis.field;

    function selectRow() {
        if (form.type === 1 /*Mani.FORMNAME.pchange*/ && form.rother) {
            setSelectedRowThem({ field: rfieldindex && form.rother[rfieldindex] || -1, form: 0 });
        }
        setSelectedRowThis({ field: isSelected ? -1 : field.ridx, form: form.type });
    }

    return (
        <div
            className={classNames("flex items-center text-xs h-6 space-x-1 overflow-hidden", useit && 'bg-[#bbffdf42]', isSelected && '!bg-blue-200')}
            onClick={selectRow}
        >
            {/* 1. use it */}
            {part1_UseIt(useit, field.pidx)}

            {/* 2. icon and text for field type */}
            {part2_FieldType(type, field)}

            {/* 3. icon preview and preview */}
            {part3_Preview(hasPreview, form, field, setSelectedRowThis)}

            {/* 4. display text */}
            {part4_DispText(useit, type, displayname)}

            {/* 5. policy */}
            {part5_Policy(field)}

            {/* 6. value */}
            {part6_Value(field)}

            {/* 7. ref */}
            {part7_FormCrossrefs(field)}

            {/* 8. id */}
            {part8_Id(field)}

            {/* 9. path */}
            {part9_Path(hasPath, fileUs, form, field)}

            {/* 10.done */}
        </div>
    );
}

//TODO: policy field
//TODO: rfield (in out), rfieldrindex
//TODO: refs @email

//TODO: script
//TODO: 'path_ext' and ignore 'path' but complain about 'path'

//TODO: avoid extra div around SVGs; set size on icon
