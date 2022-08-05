import React from "react";
import { FileUsStats } from "@/store";
import { IconAppWebChrome, IconAppWebIESolid, IconAppWindows, IconCatalog } from "@ui/UIIconSymbols";
import { classNames } from "@/utils/classnames";

const icons = {
    'web': { i: IconAppWebIESolid, title: "Webiste trained with IE" },
    'chr': { i: IconAppWebChrome, title: "Webiste trained with Chrome", c: undefined },
    'cat': { i: IconCatalog, title: "Field catalog", c: "fill-primary-300 stroke-primary-900" },
    'app': { i: IconAppWindows, title: "Windows application", c: "fill-primary-300 stroke-transparent" },
};

type iconsType<T> = {
    [K in keyof T]: T[K] & { c?: string; };
};

export function CardTitleIcon({ stats: { isWeb, isChrome, isFCat, isCustomization } }: { stats: FileUsStats; }) {
    const type = isWeb ? 'web' : isChrome ? 'chr' : isFCat ? 'cat' : 'app';
    const { i, title, c = "text-red-300" } = (icons as iconsType<typeof icons>)[type];
    return i({ title, className: classNames("w-5 h-5", c) });
}

// export function CardTitleIcon({ stats: { isWeb, isChrome, isFCat, isCustomization } }: { stats: FileUsStats; }) {
//     const type = isWeb ? 'web' : isChrome ? 'chr' : isFCat ? 'cat' : 'app';
//     const { i, title, c = "text-red-300" } = icons[type] as iconsType;
//     return i({ title, className: classNames("w-5 h-5", c) });
// }



// type iconsType<K extends keyof typeof icons> = {
//     K: typeof icons[K] & { c?: string }
// };

// type iconsType = {
//     [K in keyof typeof icons]: typeof icons[K] & { c?: string; };
// };

// type iconsType = {
//     [K in keyof typeof icons]: typeof icons[K] & { c?: string; };
// };
// export function CardTitleIcon({ stats: { isWeb, isChrome, isFCat, isCustomization } }: { stats: FileUsStats; }) {
//     const type = 'web';
//     const { i, title, c = "text-red-300" } = icons[type] as unknown as iconsType;
//     return i({ title, className: classNames("w-5 h-5", c) });
// }


// type iconsType<T> = {
//     [K in keyof typeof icons]: typeof icons[K] & { c?: string; };
// };
// export function CardTitleIcon({ stats: { isWeb, isChrome, isFCat, isCustomization } }: { stats: FileUsStats; }) {
//     const type = 'web';
//     const k = icons[type] as unknown as iconsType<typeof icons>; 
//     const { i, title, c = "text-red-300" } = icons[type] as unknown as iconsType<typeof icons>;
//     return i({ title, className: classNames("w-5 h-5", c) });
// }


// type iconsType<T> = {
//     [K in keyof T]: T[K] & { c?: string; };
// };
// export function CardTitleIcon({ stats: { isWeb, isChrome, isFCat, isCustomization } }: { stats: FileUsStats; }) {
//     const type = 'web';
//     const k = icons[type] as unknown as iconsType<typeof icons>; 
//     const { i, title, c = "text-red-300" } = icons[type] as unknown as iconsType<typeof icons>;
//     return i({ title, className: classNames("w-5 h-5", c) });
// }
//type iconsType<T> = Record<K in keyof T, T[K] & { c?: string; }>
//type iconsType = Record<keyof typeof icons, keyof typeof icons & { c?: string; }>


// OK
// type iconsType<T> = {
//     [K in keyof T]: T[K] & { c?: string; };
// };
// export function CardTitleIcon({ stats: { isWeb, isChrome, isFCat, isCustomization } }: { stats: FileUsStats; }) {
//     const type = isWeb ? 'web' : isChrome ? 'chr' : isFCat ? 'cat' : 'app';
//     const { i, title, c = "text-red-300" } = (icons as iconsType<typeof icons>)[type];
//     return i({ title, className: classNames("w-5 h-5", c) });
// }


// OK
// type iconsType<T> = {
//     [K in keyof T]: T[K] & { c?: string; };
// };
//type iconsType<T> = Record<keyof T, T[keyof T] & { c?: string; }>
