import React from 'react';
import { IconInOut, IconInputFieldChk, IconInputFieldChkEmpty, IconPreview } from '../../../UI/UiIcons';
import FieldRowPreview from './FieldRowPreview';
import FormRowTypeIcon from './FieldRowTypeIcon';
import { FieldFirstCol, FieldSecondCol } from '../../UICard/UITableFromObject';
import UIToggleWithPortal from '../../UICard/UIToggleWithPortal';

export function FieldRowOld({ metaForm, field }: { metaForm: Meta.Form; field: Meta.Field; }): JSX.Element {
    const { displayname, type, dbname, path_ext, rdir, rfieldindex, password, useit, } = field.mani;
    const toShow = {
        ...(displayname && { displayname }),
        ...(type && { type }),
        ...(dbname && { id: dbname }),
        ...(path_ext && { path: path_ext }),
        ...(rdir && { rdir }),
        ...(rfieldindex && { rfieldindex }),
        ...(password && { password }),
        ...(useit && { useit }),
    };
    const values = Object.entries(toShow);
    return (
        <div className="grid grid-cols-[minmax(7rem,auto),1fr] items-center text-xs">
            {values.map(([key, val], idx) => {
                if (key === 'displayname' || key === 'password' || key === 'useit') {
                    return;
                }
                if (key === 'type') {
                    return (
                        <React.Fragment key={`${key || idx}`}>
                            <FieldFirstCol className="bg-gray-300 relative">
                                <div className="flex items-center justify-between pr-1">
                                    <FormRowTypeIcon field={toShow} />
                                    <div className="flex-1">{`${password ? 'psw' : val}`}</div>

                                    {/* <ButtonWithChildrenPortal name="preview" toggle={<IconPreview className="w-[14px] h-[14px]" />}>
                                        <FieldPreview form={metaForm} field={field} />
                                    </ButtonWithChildrenPortal> */}

                                    {/* <ToggleWithPortal toggle={<div className="w-[14px] h-[14px]">text</div>}> */}
                                    <UIToggleWithPortal toggle={<IconPreview className="w-[14px] h-[14px]" />}>
                                        <FieldRowPreview form={metaForm} field={field} />
                                    </UIToggleWithPortal>

                                    {/* <div className="flex items-center">
                                        <ButtonWithChildren name="preview" toggle={ <IconPreview className="w-[14px] h-[14px]" /> }>
                                            <FieldPreview form={metaForm} field={field} />
                                        </ButtonWithChildren>
                                    </div> */}

                                    {useit
                                        ? <IconInputFieldChk className="w-4 h-4" fill="#38a00040" />
                                        : <IconInputFieldChkEmpty className="w-4 h-4" />
                                    }
                                </div>
                            </FieldFirstCol>
                            <FieldSecondCol className="bg-gray-300">
                                {toShow.displayname}
                            </FieldSecondCol>
                        </React.Fragment>);
                }
                return (
                    <React.Fragment key={`${key || idx}`}>
                        <FieldFirstCol>{key}</FieldFirstCol>
                        <FieldSecondCol>
                            <div className="flex items-center">{`${val}`}</div>
                        </FieldSecondCol>
                    </React.Fragment>);
            })}
        </div>
    );
}

function FieldRow({ metaForm, field }: { metaForm: Meta.Form; field: Meta.Field; }): JSX.Element {
    const { displayname, type = 'NOTYPE', dbname, path_ext, policy, value, rdir, rfieldindex, password, useit, } = field.mani;
    const disp = type !== 'text' ? displayname :
        <div className="flex">
            <div className={`px-1 h-4 text-[.65rem] leading-[.75rem] border border-gray-600 rounded ${useit ? 'bg-gray-600 text-gray-300' : 'opacity-25'} cursor-default`}
                title={displayname}>
                patern
            </div>
        </div>;
    //const policy
    return (
        <div className="flex items-center text-sm h-6 space-x-1">
            {/* bg-blue-200 */}
            <FormRowTypeIcon className="w-5 h-5 flex-none" field={field.mani} />

            <div className="w-12 text-xs">{`${password ? 'psw' : type}`}</div>

            <UIToggleWithPortal toggle={<IconPreview className="w-[17px] h-[17px]" />}>
                <FieldRowPreview form={metaForm} field={field} />
            </UIToggleWithPortal>

            <div className="flex-1">
                {disp}
            </div>

            <div className={`px-1 h-4 text-[.65rem] leading-[.75rem] border border-gray-400 rounded text-gray-900 cursor-default ${policy ? '':'opacity-25'}`} title={`Field policy: ${policy}`}>
                policy
            </div>
            <div className={`px-1 h-4 text-[.65rem] leading-[.75rem] border border-gray-400 rounded text-gray-900 cursor-default ${value ? '':'opacity-25'}`} title={`Field value: ${value}`}>
                value
            </div>
            <div className={`px-1 h-4 text-[.65rem] leading-[.75rem] border border-gray-400 rounded text-gray-900 cursor-default ${rdir ? '':'opacity-25'}`} title={`Direction: ${rdir}`}>
            <div className=""><IconInOut className="w-3 h-4" /></div>
            </div>
            <div className={`px-1 h-4 text-[.65rem] leading-[.75rem] border border-gray-400 rounded text-gray-900 cursor-default`} title={dbname}>
                id
            </div>
            <div className={`px-1 h-4 text-[.65rem] leading-[.75rem] border border-gray-400 rounded text-gray-900 cursor-default`} title={path_ext}>
                path
            </div>

            {useit
                ? <IconInputFieldChk className="ml-4 w-5 h-5" fill="#38a00040" />
                : <IconInputFieldChkEmpty className="ml-4 w-5 h-5" />
            }
        </div>
    );
}

export default FieldRow;

//TODO: policy field
//TODO: rfield (in out), rfieldrindex
//TODO: refs @email

//TODO: script
//TODO: 'path_ext' and ignore 'path' but complain about 'path'
