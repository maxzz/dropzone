export * from "./tab-selector";

/*
function TabSelectorOld({ tabs, active, setActive }: { tabs: string[], active: number, setActive: (v: number) => void; }) {
    return (
        <div className="flex justify-items-start space-x-1">
            {tabs.map((pageTitle, idx) => (
                <button
                    className={classNames(
                        'px-4 py-2.5 leading-5 text-sm font-medium text-gray-700 rounded focus:outline-none transition-colors',
                        active === idx ? 'bg-white shadow' : 'text-gray-700/80 hover:bg-white/[0.4] hover:text-white'
                    )}
                    style={{ filter: 'drop-shadow(#0000003f 0px 0px 0.15rem)' }}
                    key={pageTitle}
                    onClick={() => setActive(idx)}
                >
                    {pageTitle}
                </button>
            ))}
        </div>
    );
}
*/
