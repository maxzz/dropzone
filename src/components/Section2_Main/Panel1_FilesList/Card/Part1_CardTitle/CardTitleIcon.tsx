import React from "react";
import { FileUsStats } from "@/store";
import { IconAppWebChrome, IconAppWebIE, IconAppWebIESolid, IconAppWindows, IconCatalog } from "@ui/UIIconSymbols";

export function CardTitleIcon({ stats: { isWeb, isChrome, isFCat, isCustomization } }: { stats: FileUsStats; }) {
    if (isFCat) {
        return (
            <div className="w-6 h-6 flex items-center justify-center">
                <IconCatalog className="w-5 h-5 fill-primary-300 stroke-primary-900" title="Field catalog" />
                {/* <IconCatalog className="w-5 h-5 text-primary-300" title="Field catalog" /> */}
            </div>
        );
    }

    const title = isChrome ? 'Webiste trained with Chrome' : isWeb ? 'Webiste trained with IE' : 'Windows application';

    const icon = isChrome
        ? <IconAppWebChrome className="w-5 h-5 text-primary-300" title={`${title}`} />
        : isWeb
            ? <IconAppWebIESolid className="w-5 h-5 text-primary-300" title={`${title}`} /> // good to make outline: fill-transparent stroke-slate-200
            : <IconAppWindows className="w-5 h-5 fill-primary-300 stroke-transparent" title={`${title}`} />;
    // : <IconAppWindows className="w-5 h-5 text-primary-300" title={`${title}`} />;

    return (<>
        {icon}
    </>);
}

