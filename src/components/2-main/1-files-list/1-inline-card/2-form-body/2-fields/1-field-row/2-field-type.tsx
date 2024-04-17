import { FieldTyp, Mani, Meta } from '@/store/manifest';
import { FieldTypeIconComponent } from '@/store/manifest/manifest-field-icons';

export function part2_FieldType(type: Mani.FieldTypeStr | 'NOTYPE', field: Meta.Field) {
    const password = field.ftyp === FieldTyp.psw ? 'psw' : type;
    
    return (<>
        <FieldTypeIconComponent className="size-5 flex-none" field={field.mani} />

        <div className="w-11 text-xs flex-shrink-0" title={`Field type: ${password}`}>
            {`${password}`}
        </div>
    </>);
}
