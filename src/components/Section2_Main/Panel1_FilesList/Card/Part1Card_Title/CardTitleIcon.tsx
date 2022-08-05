import React from "react";
import { FileUsStats } from "@/store";
import { IconAppWebChrome, IconAppWebIESolid, IconAppWindows, IconCatalog } from "@ui/UIIconSymbols";
import { classNames } from "@/utils/classnames";

export function CardTitleIcon({ stats: { isWeb, isChrome, isFCat, isCustomization } }: { stats: FileUsStats; }) {
    const { icon, title, className = "text-primary-300" } =
        isWeb ? { icon: IconAppWebIESolid, title: "Webiste trained with IE" }
            : isChrome ? { icon: IconAppWebChrome, title: "Webiste trained with Chrome" }
                : isFCat ? { icon: IconCatalog, title: "Field catalog", className: "fill-primary-300 stroke-primary-900" }
                    : { icon: IconAppWindows, title: "Windows application", className: "fill-primary-300 stroke-transparent" };
    return icon({ title, className: classNames("w-5 h-5", className) });
}
