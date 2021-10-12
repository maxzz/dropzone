import React from 'react';
import { IconInOut, IconInputFieldChk, IconInputFieldChkEmpty, IconPreview } from '../../../UI/UiIcons';
import FieldRowPreview from './FieldRowPreview';
import FormRowTypeIcon from './FieldRowTypeIcon';
import UIToggleWithPortal from '../../UICard/UIToggleWithPortal';
import { useAtom } from 'jotai';
import { FileUs, SelectRowAtoms } from '../../../../store/store';
import { useUpdateAtom } from 'jotai/utils';
import FieldRowPath from './FieldRowPath';

type FieldRowProps = {
    fileUs: FileUs;
    form: Meta.Form;
    field: Meta.Field;
    selectRowAtoms: SelectRowAtoms;
};

function FieldRow({ fileUs, form, field, selectRowAtoms }: FieldRowProps): JSX.Element {
    const { displayname = '', type = 'NOTYPE', dbname, path_ext, policy, value, choosevalue, rfield, rfieldindex, rfieldform, password, useit, } = field.mani;

    const selectThisFormAtom = form.type === 0 ? selectRowAtoms.loginAtom : selectRowAtoms.cpassAtom;
    const selectThemFormAtom = form.type === 0 ? selectRowAtoms.cpassAtom : selectRowAtoms.loginAtom;
    const [thisSelectedRow, setThisSelectedRow] = useAtom(selectThisFormAtom);
    const setThemSelectedRow = useUpdateAtom(selectThemFormAtom);

    const hasPreview = !!field.path.loc;
    const isSelected = form.view?.rects.length && field.ridx === thisSelectedRow.field;
    //console.log(`isSelected: ${isSelected} field.ridx: ${field.ridx} thisSelectedRow.field: ${thisSelectedRow.field}`);

    const columnDispText = type === 'text'
        ?
        <div className="flex">
            <div
                className={`px-1 h-4 text-[.65rem] leading-[.7rem] border border-gray-600 rounded-sm ${useit ? 'bg-gray-300 text-gray-800' : 'opacity-25'} cursor-default`}
                title={`Matching pattern: ${displayname}`}
            >
                patern
            </div>
        </div>
        :
        //displayname
        <div className="" title={`Dispaly name: ${displayname}`}>
            {`${displayname.substr(0, 15)}${displayname.length > 15 ? '...' : ''}`}
        </div>
        ;
    const columnRefTitle = `Ref.index: ${rfield ? `[${rfield}]:` : ''}${rfieldindex} Ref.form: ${rfieldform}`;

    function selectThisRow() {
        if (form.type === 1 /*Mani.FORMNAME.pchange*/ && form.other) {
            setThemSelectedRow({ field: rfieldindex && form.other[rfieldindex] || -1, form: 0 });
        }
        setThisSelectedRow({ field: isSelected ? -1 : field.ridx, form: form.type });
    }

    return (
        <div className={`flex items-center text-xs h-6 space-x-1 overflow-hidden ${useit ? 'bg-[#bbffdf42]' : ''} ${isSelected ? '!bg-blue-200' : ''}`}
            onClick={selectThisRow}
        >
            <div className="" title={`To use or not to use. Field index: ${field.pidx}`}>
                {useit
                    ? <IconInputFieldChk className="w-5 h-5" fill="#38a00040" />
                    : <IconInputFieldChkEmpty className="w-5 h-5" />
                }
            </div>

            {/* bg-blue-200 */}
            <FormRowTypeIcon className="w-5 h-5 flex-none" field={field.mani} />

            <div className="w-11 text-xs" title={`Field type: ${password ? 'psw' : type}`}>{`${password ? 'psw' : type}`}</div>

            <UIToggleWithPortal title={`${hasPreview ? 'preview' : 'no preview'}`}
                toggle={
                    <IconPreview className={`w-[16px] h-[16px] ${hasPreview ? '' : 'opacity-25'}`} />
                }
            >
                {hasPreview &&
                    <div className="w-[calc(1920px/4)] bg-gray-200 p-0.5 border border-gray-700">
                        <FieldRowPreview
                            form={form} small={false}
                            selected={field.ridx} onSelected={(selected: number) => { setThisSelectedRow({ field: selected, form: form.type }); }}
                            className="w-[calc(calc(1920px/4)-6px)] h-[calc(1200px/4)]"
                        />
                        <div className="mt-0.5 p-1 text-xs text-blue-200 bg-blue-500">X1 x Y1, X2 x Y2:<br /> {field.path.loc?.replace(/\|/g, ' | ')}</div>
                    </div>
                }
            </UIToggleWithPortal>

            <div className="flex-1 cursor-default">
                {columnDispText}
            </div>

            {/* <div className="w-[20%] pr-2 cursor-default overflow-hidden">
                <div className="whitespace-nowrap overflow-ellipsis">{disp}</div>
            </div> */}

            <div
                className={`px-1 h-4 text-[.65rem] leading-[.75rem] border border-gray-400 rounded text-gray-900 cursor-default ${policy ? '' : 'opacity-25'}`}
                title={`Field policy: ${policy}`}
            >
                policy
            </div>
            <div
                className={`px-1 h-4 text-[.65rem] leading-[.75rem] border border-gray-400 rounded text-gray-900 cursor-default ${value ? '' : 'opacity-25'}`}
                title={`Field value: ${value}${choosevalue ? ` | Choices: ${choosevalue}` : ''}`}
            >
                value
            </div>
            <div
                className={`px-1 h-4 text-[.65rem] leading-[.75rem] border border-gray-400 rounded text-gray-900 cursor-default ${rfield || rfieldform ? '' : 'opacity-25'}`}
                title={columnRefTitle}
            >
                <div className=""><IconInOut className="w-3 h-4" /></div>
            </div>
            <div
                className={`px-1 h-4 text-[.65rem] leading-[.75rem] border border-gray-400 rounded text-gray-900 cursor-default`}
                title={dbname}
            >
                id
            </div>

            <UIToggleWithPortal title={`${hasPreview ? 'preview' : 'no preview'}`}
                toggle={
                    <div className={`px-1 h-4 text-[.65rem] leading-[.75rem] border border-gray-400 rounded text-gray-900 cursor-default`} title={path_ext}>
                        path
                    </div>
                }
            >
                <div className="ml-4 bg-gray-100 p-0.5 border border-gray-700">
                    <FieldRowPath className="" fileUs={fileUs} form={form} field={field} />
                </div>
            </UIToggleWithPortal>
        </div>
    );
}

export default FieldRow;

//TODO: policy field
//TODO: rfield (in out), rfieldrindex
//TODO: refs @email

//TODO: script
//TODO: 'path_ext' and ignore 'path' but complain about 'path'
