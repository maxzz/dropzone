import { PrimitiveAtom, useAtomValue } from 'jotai';
import { classNames } from '@/utils';

type RealPagesProps = {
    pageComponents: JSX.Element[];
    selectedTabAtom: PrimitiveAtom<number>;
};

export function RealPages({ pageComponents, selectedTabAtom }: RealPagesProps) {
    const selectedTab = useAtomValue(selectedTabAtom);
    return (<>
        {pageComponents.map((pageContent, idx) => (
            <div className={classNames(selectedTab !== idx && 'hidden')} key={idx}>
                {pageContent}
            </div>
        ))}
    </>);
}
