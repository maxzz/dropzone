import { useState } from "react";
import { useAtom } from "jotai";
import { ManiEditorData } from "@/store";
import { UIIconUpDown } from "@ui/icons";
import { DummyPlaceholder } from "../3-options";

function TabFieldsScript({ editorData }: { editorData: ManiEditorData; }) {
    return (
        <div className="p-4">
            Windows form script fields editor is comming soon...
        </div>
    );
}

export function Tab4_Fields({ editorData }: { editorData: ManiEditorData; }) {
    const [fileUs, setFileUs] = useAtom(editorData.fileUsAtom);
    const isScript = fileUs.parsedSrc.meta?.[editorData.formIdx]?.disp.isScript;

    const [isOpen1, setIsOpen1] = useState(false);

    return (<>
        {isScript
            ? (
                <TabFieldsScript editorData={editorData} />
            )
            : (
                <div className="p-4">
                    Web form fields editor is comming soon...

                    <div className="mt-4 w-28 font-bold text-gray-600 flex items-center space-x-1" onClick={() => setIsOpen1(!isOpen1)}>
                        <div className="">
                            Policy
                        </div>
                        <UIIconUpDown double={true} isOpen={isOpen1} className="size-5 border rounded" />
                    </div>

                    {isOpen1 && (<>
                        <DummyPlaceholder />
                        <DummyPlaceholder />
                        <DummyPlaceholder />
                        <DummyPlaceholder />
                        <DummyPlaceholder />
                        <DummyPlaceholder />
                    </>)}

                </div>
            )

        }
    </>);
}
