import { PrimitiveAtom, useAtomValue } from 'jotai';
import { classNames } from '@/utils';

export function RealPages({ pageComponents, selectedTabAtom }: { pageComponents: JSX.Element[]; selectedTabAtom: PrimitiveAtom<number>; }) {
    const selectedTab = useAtomValue(selectedTabAtom);
    return (<>
        {pageComponents.map((pageContent, idx) => (
            <div className={classNames(selectedTab !== idx && 'hidden')} key={idx}>
                {pageContent}
            </div>
        ))}
    </>);
}
