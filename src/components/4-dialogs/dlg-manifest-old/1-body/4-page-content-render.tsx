import { PrimitiveAtom, useAtomValue } from 'jotai';
import { classNames } from '@/utils';

type PageComponentsProps = {
    pageComponents: JSX.Element[];
    selectedTabAtom: PrimitiveAtom<number>;
};

export function PageContentRender({ pageComponents, selectedTabAtom }: PageComponentsProps) {
    const selectedTab = useAtomValue(selectedTabAtom);
    return (<>
        {pageComponents.map(
            (pageContent, idx) => (
                <div className={classNames(selectedTab !== idx && 'hidden')} key={idx}>
                    {pageContent}
                </div>
            ))
        }
    </>);
}
