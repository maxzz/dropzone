import React from "react";
import { FileUsStats } from "@/store";
import { IconAppWebChrome, IconAppWebIE, IconAppWebIESolid, IconAppWindows, IconCatalog } from "@ui/UIIconSymbols";

export function CardTitleIcon({ stats: { isWeb, isChrome, isFCat, isCustomization } }: { stats: FileUsStats; }) {
    const title =
        isWeb ? 'Webiste trained with IE'
            : isChrome ? 'Webiste trained with Chrome'
                : isFCat ? "Field catalog"
                    : 'Windows application';

    const Icon =
        isWeb ? <IconAppWebIESolid className="w-5 h-5 text-primary-300" title={`${title}`} />
            : isChrome ? <IconAppWebChrome className="w-5 h-5 text-primary-300" title={`${title}`} />
                : isFCat ? <IconCatalog className="w-5 h-5 fill-primary-300 stroke-primary-900" title="Field catalog" />
                    : <IconAppWindows className="w-5 h-5 fill-primary-300 stroke-transparent" title={`${title}`} />;

    return Icon;
}

// export function CardTitleIcon({ stats: { isWeb, isChrome, isFCat, isCustomization } }: { stats: FileUsStats; }) {
//     if (isFCat) {
//         return (
//             <div className="w-6 h-6 flex items-center justify-center">
//                 <IconCatalog className="w-5 h-5 fill-primary-300 stroke-primary-900" title="Field catalog" />
//                 {/* <IconCatalog className="w-5 h-5 text-primary-300" title="Field catalog" /> */}
//             </div>
//         );
//     }

//     const title = isChrome ? 'Webiste trained with Chrome' : isWeb ? 'Webiste trained with IE' : 'Windows application';

//     const Icon = isChrome
//         ? <IconAppWebChrome className="w-5 h-5 text-primary-300" title={`${title}`} />
//         : isWeb
//             ? <IconAppWebIESolid className="w-5 h-5 text-primary-300" title={`${title}`} />
//             : <IconAppWindows className="w-5 h-5 fill-primary-300 stroke-transparent" title={`${title}`} />;

//     return Icon;
// }

//TODO: move (<IconAppWebIESolid, and ...) to functions instead of components
