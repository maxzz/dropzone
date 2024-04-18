import { FileUsStats } from "@/store";
import { SymbolAppWebChrome, SymbolAppWebIESolid, SymbolAppWindows, SymbolCatalog } from "@ui/icons";
import { classNames } from "@/utils";

const appIcons = {
    web: { icn: SymbolAppWebIESolid, title: "Webiste trained with IE" },
    chr: { icn: SymbolAppWebChrome, title: "Webiste trained with Chrome" },
    cat: { icn: SymbolCatalog, title: "Field catalog", cls: "fill-primary-300 stroke-primary-900" },
    app: { icn: SymbolAppWindows, title: "Windows application", cls: "fill-primary-300 stroke-transparent" },
};

type AppIcons<T = typeof appIcons> = {
    [K in keyof T]: T[K]
    & {
        cls?: string;
    };
};

export function CardTitleIcon({ stats: { isWeb, isChrome, isFCat, isCustomization } }: { stats: FileUsStats; }) {
    const iconKey = isWeb
        ? 'web'
        : isChrome
            ? 'chr'
            : isFCat
                ? 'cat'
                : 'app';

    const { icn, title, cls = "text-primary-300" } = (appIcons as AppIcons)[iconKey];

    return icn({ title, className: classNames("size-5", cls) });
}
