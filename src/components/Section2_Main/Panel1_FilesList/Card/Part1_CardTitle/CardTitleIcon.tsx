import React from "react";
import { FileUsStats } from "@/store";
import { IconAppWebChrome, IconAppWebIE, IconAppWindows, IconCatalog } from "@ui/UIIconSymbols";

export function CardTitleIcon({ stats: { isWeb, isChrome, isFCat, isCustomization } }: { stats: FileUsStats; }) {
    if (isFCat) {
        return (
            <div className="w-6 h-6 flex items-center justify-center">
                <IconCatalog className="w-5 h-5 text-primary-300" title="Field catalog" />
            </div>
        );
    }

    const icon = isChrome
        ? <IconAppWebChrome className="w-5 h-5 text-primary-300" />
        : isWeb
            ? <IconAppWebIE className="w-5 h-5 text-primary-300" />
            : <IconAppWindows className="w-5 h-5 text-primary-300" />;

    const title = isChrome ? 'Webiste trained with Chrome' : isWeb ? 'Webiste trained with IE' : 'Windows application';
    
    return (
        <div title={`${title} `}> {/* TODO: avoid this div; set size on icon */}
            {icon}
        </div>
    );
}
