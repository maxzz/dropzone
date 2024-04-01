import { Meta } from '@/store/manifest';
import { FieldWithPolicy } from './2-field-with-policy';

export function PoliciesGrid({ policies }: { policies: Meta.Field[]; }) {
    return (<>
        {policies.map(
            (field, idx) => (
                <FieldWithPolicy field={field} key={idx} />
            ))}
    </>);
}
