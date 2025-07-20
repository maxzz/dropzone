import { type ReactNode } from "react";
import { type PrimitiveAtom } from "jotai";
import { useDrag } from "@use-gesture/react";
import { a, useSpring } from "@react-spring/web";
import { type ManiEditorData } from "@/store";
import { type MatchWebState } from "../2-tabs/1-matching";
import { TabsTopHolder } from "./3-tabs-top-holder";
import { ManiInfoTooltip } from "./8-mani-info-tooltip";
import { BottomButtons } from "./5-bottom-buttons";

type DialogFrameAndTabsProps = {
    editorUrlsAtom: PrimitiveAtom<MatchWebState>;
    editorData: ManiEditorData;
    setShow?: (v: boolean) => void;
};

export function DialogFrameAndTabs({ editorUrlsAtom, editorData, setShow }: DialogFrameAndTabsProps) {

    // Dialog caption dragging
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
    const captionDragBind = useDrag(
        ({ down, offset: [mx, my] }) => {
            api.start({ x: mx, y: my, immediate: down });
        }
    );

    return (
        <a.div style={{ x, y }} className="w-[460px] h-[640px] grid grid-rows-[minmax(0,1fr)_auto] bg-gray-200 rounded overflow-hidden">
            <TabsTopHolder
                editorUrlsAtom={editorUrlsAtom}
                editorData={editorData}
                captionDragBind={captionDragBind}
            />
            <div className="px-4 py-4 bg-white flex items-center justify-between">
                <ManiInfoTooltip editorData={editorData} />
                <BottomButtons setShow={setShow} />
            </div>
        </a.div>
    );
}

//TODO: add dialog x, y to atom
