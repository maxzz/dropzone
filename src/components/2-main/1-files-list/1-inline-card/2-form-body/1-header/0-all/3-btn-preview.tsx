import { Dispatch, SetStateAction } from 'react';
import { useAtom } from 'jotai';
import { SelectRowAtomsType } from '@/store';
import { Meta } from '@/store/manifest';
import { SymbolCross, SymbolPreview } from '@ui/icons';
import { CardSvgPreview } from '../../../3-shared/2-card-svg-preview';

export function BtnPreview({ form, formIdx, selectRowAtoms, small, setSmall, }: {
    form: Meta.Form; formIdx: number; selectRowAtoms: SelectRowAtomsType; small: boolean; setSmall: Dispatch<SetStateAction<boolean>>;
}) {
    const [selectedRow, setSelectedRow] = useAtom(formIdx === 0 ? selectRowAtoms.loginAtom : selectRowAtoms.cpassAtom);
    const icon = small
        ? SymbolPreview({ className: "size-5 hover:bg-primary-200 rounded active:scale-[.97] opacity-75", title: "Open preview" })
        : SymbolCross({ className: "p-1.5 size-5 bg-orange-500/50 text-primary-100" });
    return (
        <div className="grid grid-cols-[minmax(0,1fr)_24px] mr-1 overflow-hidden">
            <div className="size-6 col-start-2 row-start-1 cursor-pointer flex items-center justify-center z-10" onClick={() => setSmall((v) => !v)}>
                {icon}
            </div>
            {!small &&
                <div className="col-start-1 row-start-1 col-span-2 row-span-2">
                    <CardSvgPreview
                        className={`${small ? 'w-24 max-h-24' : 'w-96 max-h-96'}`}
                        small={small}
                        form={form}
                        selected={selectedRow.field}
                        onSelected={(selected: number) => setSelectedRow({ field: selected, form: form.type })} />
                </div>}
        </div>
    );
}
