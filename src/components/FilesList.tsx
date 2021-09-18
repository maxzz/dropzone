import { useAtom } from 'jotai';
import React from 'react';
import { filteredAtom } from '../store/store';
import ManifestCard from './Card/Card';

function FilesList() {
    const [files] = useAtom(filteredAtom);
    return (
        <div className="ml-[1rem] h-full w-full">
            <div className="h-full overflow-y-auto w-[510px]" style={{width: 'calc(100% - 2rem)'}}> {/* width w/ or /o scrollbar width is 493px but $0.clientWidth w/ scrollbar it gets 16px less */}
                {/* <div className=""> */}
                {/* <div className="" style={{width: 'calc(100% - 1rem)'}} > */}
                {/* <div className="" style={{width: 'calc(490px - 1rem)'}} > */}
                    {/* <div className="" */}
                    {/* <div className="h-full mx-auto" >*/}
                    {/* <div className="h-full mx-auto" style={{width: 'calc(100% - 1rem)'}}> */}
                    {/* <div className="h-full mx-auto w-[490px]"> */}
                    {/* <div className="h-full mx-auto max-w-[585px]"> */}
                    {/* <div className="h-full overflow-y-auto mx-auto max-w-[585px] ml-[2rem]"> */}
            
                    {/* style={{width: 'calc(100% - 2rem)'}} */}
                    
                        <div className="grid grid-flow-row gap-4 text-sm"
                        // style={{gridTemplateColumns: 'repeat(auto-fit, minmax(0,1fr))'}}
                        >
                            {/* smallscroll smallscroll-light */}
                            {files.map((atom) =>
                                <ManifestCard atom={atom} key={`${atom}`} />
                            )}
                        </div>
                    {/* </div> */}
                {/* </div> */}
            </div>
        </div>
    );
}
export default FilesList;
