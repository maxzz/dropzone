import { classNames } from '@/utils';

const tableColumns = [
    ["Field", /*hint*/ "Field", /*classes*/ "",],
    ["Policy", /*hint*/ "Field policy", /*classes*/ "col-span-2",],
] as const;

export function TableHeader() {
    return (<>
        {tableColumns.map(([title, hint, classes], idx) => (
            <div
                className={classNames("mb-2 px-1 text-[.65rem] text-primary-400 border-primary-100 border-b select-none", classes)}
                title={hint} key={idx}
            >
                {title}
            </div>
        ))}
    </>);
}
