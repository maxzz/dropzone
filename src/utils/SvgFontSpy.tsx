import React from 'react';

function SvgFontSpy({ fontID = 'svgfont' }: { fontID?: string; }) {
    const [ids, setIds] = React.useState<string[]>([]);
    React.useEffect(() => {
        const font = document.querySelector(`#${fontID} > defs`)?.children;
        const ids = (font ? [...font] : []).map(item => item.id);
        setIds(ids);
    }, []);
    return (<>
        {!!ids.length &&
            <div className="w-[80vw] mx-auto mt-4 grid grid-cols-[repeat(auto-fill,minmax(0,64px))] gap-4">
                {ids.map((id, idx) =>
                    <div className="w-16 h-16 border-4 border-gray-100 bg-gray-300 shadow-lg" key={idx}>
                        <svg fill="#c3b2d3" stroke="black" strokeWidth={.5} className={`w-full h-full`}>
                            <title>{`${id}`}</title>
                            <use xlinkHref={`#${id}`} />
                        </svg>
                    </div>
                )}
            </div >
        }
    </>);
}

export default SvgFontSpy;
