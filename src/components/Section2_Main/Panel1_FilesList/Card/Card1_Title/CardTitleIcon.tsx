import React from "react";
import { FileUsStats } from "@/store";
import { IconAppWebChrome, IconAppWebIESolid, IconAppWindows, IconCatalog } from "@ui/icons";
import { classNames } from "@/utils";

const icons = {
    web: { i: IconAppWebIESolid, title: "Webiste trained with IE" },
    chr: { i: IconAppWebChrome, title: "Webiste trained with Chrome" },
    cat: { i: IconCatalog, title: "Field catalog", c: "fill-primary-300 stroke-primary-900" },
    app: { i: IconAppWindows, title: "Windows application", c: "fill-primary-300 stroke-transparent" },
};

export function CardTitleIcon({ stats: { isWeb, isChrome, isFCat, isCustomization } }: { stats: FileUsStats; }) {
    const type = isWeb ? 'web' : isChrome ? 'chr' : isFCat ? 'cat' : 'app';
    type iconsType<T> = { [K in keyof T]: T[K] & { c?: string; }; };
    const { i, title, c = "text-primary-300" } = (icons as iconsType<typeof icons>)[type];
    return i({ title, className: classNames("w-5 h-5", c) });
}
