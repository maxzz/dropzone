import { Meta } from '@/store/manifest';
import { SymbolInOut } from '@ui/icons';
import { classNames } from '@/utils';

export function part7_FormCrossrefs(field: Meta.Field) {
    const { rfield, rfieldindex, rfieldform } = field.mani;
    const title = `Ref.index: ${rfield ? `[${rfield}]:` : ''}${rfieldindex} Ref.form: ${rfieldform}`;
    const low = !rfield && !rfieldform;
    return (
        <div className={classNames("row-field-framed", low && 'opacity-25')} title={title}>
            <SymbolInOut className="w-3 h-4" />
        </div>
    );
}
