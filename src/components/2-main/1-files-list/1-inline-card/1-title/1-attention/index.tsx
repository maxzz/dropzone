import { FileUs, isAnyWhy } from "@/store";
import { UiTip } from "@ui/ui-tooltip";
import { CardTitleFileIndex } from "./1-card-title-file-index";
import { TooltipBody } from "./2-tooltip-body";

export function CardTitleAttention({ fileUs }: { fileUs: FileUs; }) {
    const fileIndex = fileUs.idx + 1;
    
    const hasBailOut = isAnyWhy(fileUs.meta);
    if (!hasBailOut) {
        return <CardTitleFileIndex idx={fileIndex} />;
    }

    return (
        <UiTip
            trigger={
                <CardTitleFileIndex idx={fileIndex} errors={true} />
            }
            popperOptions={{ delayShow: 300 }} // , visible: true
            className="!p-0 !bg-primary-100 !border-primary-100"
        >
            <TooltipBody fileUs={fileUs} fileIndex={fileIndex} />
        </UiTip>
    );
}
