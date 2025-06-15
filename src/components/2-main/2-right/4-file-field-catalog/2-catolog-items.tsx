import { type JSX, Fragment } from 'react';
import { CatalogFile } from 'pm-manifest';
import { fieldIcons } from '@/store/manifest/manifest-field-icons';

export function CatologItems({ names }: { names: CatalogFile.ItemInFile[]; }) {
    return (<>
        {names.map((item, idx) => (
            <Fragment key={idx}>
                <div className="col-start-2 text-right">
                    {idx + 1}
                </div>

                <div className="col-start-3 flex items-center gap-x-2 leading-[18px]">
                    {FieldIcon(item.password, "size-4 opacity-25")}

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

function FieldIcon(isPsw: boolean | undefined, className: string) {
    const type = isPsw ? 'psw' : 'edit';
    const icon = fieldIcons[type]?.({ className, title: `Field type: ${type}`, });
    const rv = icon || (
        <div className="text-red-500">
            nan
        </div>
    );
    return rv;
}
