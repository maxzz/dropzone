import { Fragment } from 'react';
import { CatalogFile } from 'pm-manifest';
import { fieldIcons } from '@/store/manifest/manifest-field-icons';

function FieldIcon(isPsw: boolean | undefined, className: string) {
    const type = isPsw ? 'psw' : 'edit';
    const Icon = fieldIcons[type]?.({ className, title: `Field type: ${type}`, }) || <div className="text-red-500">nan</div>;
    return Icon;
}
export function CatologItems({ names }: { names: CatalogFile.ItemInFile[]; }) {
    return (<>
        {names.map((item, idx) => (
            <Fragment key={idx}>
                <div className="col-start-2 text-right">
                    {idx + 1}
                </div>

                <div className="col-start-3 flex items-center gap-x-2 leading-[18px]">
                    {FieldIcon(item.password, "w-4 h-4 opacity-25")}

                    <div>
                        {item.dispname}
                    </div>
                </div>

                <div className="col-start-4 font-mono text-[.6rem]">
                    {item.dbname}
                </div>
            </Fragment>
        ))}
    </>);
}
