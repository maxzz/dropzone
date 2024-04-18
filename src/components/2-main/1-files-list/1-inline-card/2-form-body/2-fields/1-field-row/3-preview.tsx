import { SetStateAction } from 'jotai';
import { SelectRowType } from '@/store';
import { Meta } from '@/store/manifest';
import { CardSvgPreview } from '../../../3-shared/2-card-svg-preview';
import { UIToggleWithPortal } from '../../../4-ui/UIToggleWithPortal';
import { SymbolPreview } from '@ui/icons';
import { classNames } from '@/utils';

export function part3_Preview(hasPreview: boolean, form: Meta.Form, field: Meta.Field, setSelectedRowThis: (update: SetStateAction<SelectRowType>) => void) {
    return (
        <UIToggleWithPortal
            title={`${hasPreview ? 'preview' : 'no preview'}`}
            toggle={
                <SymbolPreview className={classNames("size-4", !hasPreview && 'opacity-25')} />
            }
        >
            {/* Popup content */}
            {hasPreview &&
                <div className="w-[calc(1920px/4)] bg-primary-200 p-0.5 border border-primary-700">
                    <CardSvgPreview
                        form={form}
                        small={false}
                        selectedIdx={field.ridx} onSelectedIdx={(selected: number) => { setSelectedRowThis({ field: selected, form: form.type }); }}
                        className="w-[calc(calc(1920px/4)-6px)] h-[calc(1200px/4)]"
                    />

                    <div className="mt-0.5 p-1 text-xs text-blue-200 bg-blue-500">
                        X1 x Y1, X2 x Y2:
                        <br />
                        {field.path.loc?.replace(/\|/g, ' | ')}
                    </div>
                </div>
            }
        </UIToggleWithPortal>
    );
}
