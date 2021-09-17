import { useAtom } from 'jotai';
import React from 'react';
import { filteredAtom } from '../store/store';
import ManifestCard from './Card/Card';

function FilesList() {
    const [files] = useAtom(filteredAtom);
    return (
        // <div className="ml-[2rem]">
            <div className="h-full overflow-y-auto w-[490px]">
                <div className="" style={{width: 'calc(100% - 1rem)'}} >
                    <div className="h-full mx-auto max-w-[585px]"
                    // <div className="h-full overflow-y-auto mx-auto max-w-[585px] ml-[2rem]"
            
                    // style={{width: 'calc(100% - 2rem)'}}
                    >
                        <div className="grid grid-flow-row gap-4 text-sm"
                        // style={{gridTemplateColumns: 'repeat(auto-fit, minmax(0,1fr))'}}
                        >
                            {/* smallscroll smallscroll-light */}
                            {files.map((atom) =>
                                <ManifestCard atom={atom} key={`${atom}`} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        // </div>
    );
}
export default FilesList;
